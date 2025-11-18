import axios, { AxiosError } from "axios";

// Cache simples em memória
interface CacheEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  timestamp: number;
  ttl: number;
}

const cache = new Map<string, CacheEntry>();

// Rate limiter - controla requisições por segundo
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1200; // 1.2 segundos entre requisições (máximo 50/min)
const requestQueue: Array<() => void> = [];
let isProcessingQueue = false;

// TTLs para diferentes tipos de dados (em milissegundos) - AUMENTADOS SIGNIFICATIVAMENTE
const CACHE_TTL = {
  coins: 300000, // 5 minutos (era 2)
  details: 300000, // 5 minutos (era 1)
  history: 300000, // 5 minutos (era 2)
  list: 1800000, // 30 minutos (era 10)
  basic: 1800000, // 30 minutos (era 10)
};

// Rate limiter - garante intervalo mínimo entre requisições
async function rateLimitedRequest<T>(requestFn: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const executeRequest = async () => {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;

      if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
        await new Promise(res => setTimeout(res, waitTime));
      }

      lastRequestTime = Date.now();

      try {
        const result = await requestFn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    requestQueue.push(executeRequest);
    processQueue();
  });
}

async function processQueue() {
  if (isProcessingQueue || requestQueue.length === 0) {
    return;
  }

  isProcessingQueue = true;

  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      await request();
      // Pequeno delay entre requisições da fila
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  isProcessingQueue = false;
}

function getCacheKey(url: string): string {
  return url;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFromCache(key: string, allowExpired = false): any | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const now = Date.now();
  const isExpired = now - entry.timestamp > entry.ttl;

  if (isExpired && !allowExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setCache(key: string, data: any, ttl: number): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
}

// Retry com backoff exponencial - NÃO retry em caso de 429
async function retryRequest<T>(
  fn: () => Promise<T>,
  maxRetries = 2,
  baseDelay = 3000
): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        // Se for 429, NÃO tenta novamente - apenas lança o erro
        if (axiosError.response?.status === 429) {
          throw error;
        }

        // Para outros erros, tenta novamente
        if (attempt < maxRetries - 1) {
          const delay = baseDelay * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }

      throw error;
    }
  }

  throw lastError;
}

const api = axios.create({
  baseURL: "/api/coingecko",
  timeout: 10000,
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      const delay = retryAfter ? parseInt(retryAfter) * 1000 : 60000; // 60 segundos padrão
      console.warn(`Rate limit atingido. Aguarde ${delay / 1000} segundos antes de tentar novamente.`);
      return Promise.reject(new Error(
        `Muitas requisições. Por favor, aguarde ${Math.ceil(delay / 1000)} segundos antes de tentar novamente.`
      ));
    }

    if (error.response?.status === 404) {
      console.error('Erro 404 - Verifique se o proxy está configurado e o servidor foi reiniciado');
      return Promise.reject(new Error(
        `Erro ao conectar com a API. Verifique se o servidor foi reiniciado.`
      ));
    }

    return Promise.reject(error);
  }
);

async function cachedRequest<T>(
  url: string,
  ttl: number,
  requestFn: () => Promise<T>
): Promise<T> {
  const cacheKey = getCacheKey(url);
  const cached = getFromCache(cacheKey);

  // Se tem cache válido, retorna imediatamente
  if (cached !== null) {
    return cached;
  }

  // Verifica se tem cache expirado antes de fazer requisição
  const expiredCache = getFromCache(cacheKey, true);

  try {
    // Usa rate limiter para controlar requisições
    const rateLimitedFn = () => rateLimitedRequest(requestFn);
    const data = await retryRequest(rateLimitedFn);
    setCache(cacheKey, data, ttl);
    return data;
  } catch (error) {
    // Se houver erro e tiver cache expirado, usa o cache
    if (expiredCache !== null) {
      console.warn('Erro na requisição, usando cache expirado como fallback');
      return expiredCache;
    }
    throw error;
  }
}

export async function fetchCoins() {
  const url = "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d";
  return cachedRequest(
    url,
    CACHE_TTL.coins,
    () => api.get(url).then(res => res.data)
  );
}

export async function fetchCoinDetails(id: string) {
  const url = `/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;
  return cachedRequest(
    url,
    CACHE_TTL.details,
    () => api.get(url).then(res => res.data)
  );
}

export async function fetchCoinHistory(id: string) {
  const url = `/coins/${id}/market_chart?vs_currency=usd&days=7`;
  return cachedRequest(
    url,
    CACHE_TTL.history,
    () => api.get(url).then(res => res.data.prices)
  );
}

export async function fetchAllCoinsList() {
  const url = "/coins/list";
  return cachedRequest(
    url,
    CACHE_TTL.list,
    () => api.get(url).then(res => res.data)
  );
}

export async function fetchCoinBasicInfo(id: string) {
  const url = `/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;
  return cachedRequest(
    url,
    CACHE_TTL.basic,
    async () => {
      const res = await api.get(url);
      return {
        image: res.data.image?.thumb || res.data.image?.small || "",
      };
    }
  );
}

export async function fetchTop500() {
  const url = "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=true&price_change_percentage=1h,24h,7d";
  return cachedRequest(
    url,
    CACHE_TTL.coins,
    () => api.get(url).then(res => res.data)
  );
}

