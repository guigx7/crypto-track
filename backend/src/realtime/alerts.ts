import { io } from "../server";

export function priceAlert(coinId: string) {
  io.emit("price-alert", { coinId, timestamp: Date.now() });
}
