import { ModelApiService } from "./modelApiService";
import io from "socket.io-client";

export default class NotificationService extends ModelApiService {
  constructor() {
    super("notification");
  }

  async initiateSocket() {
    const socket = new io(import.meta.env.VITE_SOCKET_URL, {
      reconnect: true,
    });

    return socket;
  }
}
