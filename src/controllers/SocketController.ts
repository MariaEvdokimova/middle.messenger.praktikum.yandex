import Store from "../services/store/Store";
import { isArray } from "../utils/IsArray";
import { chatsController } from "./ChatsController";

export class SocketController {

    static _instance: SocketController;
    private baseUrl = 'wss://ya-praktikum.tech/ws/chats';
    private _socket: WebSocket | null | undefined; 
    private _interval: any;

    static get instance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new this();
        return this._instance;
    }
    

    async connect(){
        if (this._socket?.readyState === WebSocket.OPEN) {

            clearInterval(this._interval);
            this._socket.removeEventListener('message', this._messageFunc);
            this._socket.close();
            this._socket = null;
        }

        const userId = Store.getState().user.id;
        const chatId = Store.getState().selectedChat.id;
        let token;
       
        try {
            token = await chatsController.getToken(Number(chatId));
            const socketURL = this.baseUrl + `/${userId}/${chatId}/${token}`;
            this._socket = new WebSocket(socketURL);
          
            if (this._socket) {
                this._socket.addEventListener('message', this._messageFunc);

                this._socket.onopen = () => this._open();
                this._socket.onclose = () => this._close();
            }

        } catch (e: any) {
            console.error(e.message);
        }

        this._socket?.addEventListener('error', (e) => {
            if (e instanceof Error) {
                console.error(e);
            }
        });
    
        return this;
    };

    sendMessage(message: string) {
        this._socket?.send(JSON.stringify({content: message, type: 'message'}));
      }
    
    getMessages(content: string = '0') {
        this._socket?.send(JSON.stringify({content: content, type: 'get old'}));
      }
      
    private _open(){
        if (this._socket) {
     
            try {
              this.getMessages();
            } catch (e: any) {
                console.error(e);
            }
      
            this._interval = setInterval(() => {
                if (this._socket && this._socket.readyState === 1) {
                    this._socket.send(JSON.stringify({ type: 'ping' }));
                }
            }, 10000);
          }
    }

    private _close(){
        clearInterval(this._interval);
    }

    private async _messageFunc(e: MessageEvent): Promise<void> {
        try {

            const data = JSON.parse(e.data);
            if (data.type !== 'pong') {

                if (isArray(data)) {
                Store.set('messages', (data as []).reverse()); 
               } else {
                const currentMessages = Store.getState().messages || [];
                currentMessages.push(data);
                Store.set('messages', currentMessages);
               }

                chatsController.getChats();
            }
        } catch (e) {
            Store.set('messages', []);
            console.error(e);
        }
    }
}

export const socketController = new SocketController();
