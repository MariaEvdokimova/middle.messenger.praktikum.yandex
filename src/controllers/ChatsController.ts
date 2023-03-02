import { ChatAPI } from "../api/chat-api";
import Store from "../services/store/Store";
import store from '../services/store/Store';
import { Indexed } from "../utils/Interfeces";
import { userController } from "./UserController";

class ChatsController {
    private _api = new ChatAPI();

    public async getChats() {
        try {
            await this._api
                .chats()
                .then( ( res: any ) => {
                    const code = res.status;
                    if ( code === 200 ) {
                        store.set('chats', JSON.parse(res.response));
                    }
                });
        } catch (e: any) {
            console.error(e);
        }
    }

    public async createChat( data: Indexed ) {
        try {
            await this._api
                .createChat( data )
                .then( ( res: any ) => {
                    const code = res.status;
                    this.getChats();
                });
        } catch (e: any) {
            console.error(e.message);
        }
    }

    
    public async deleteChat( data: Indexed ) {
        try {
            await this._api
                .deleteChat( data )
                .then( ( res: any ) => {
                    const code = res.status;
                    this.getChats();
                });
        } catch (e: any) {
            console.error(e.message);
        }
    }

    public async addUserToChat( data: string ) {
        let users;
        try {
            users = await userController.search({ login: data});
          } catch (e: any) {
            console.error(e.message);
          }

        const user = users.find((el: any): any | undefined => {
            return el.login === data;
          });

          if ( user !== undefined ){

            try {
                await this._api
                    .addUserToChat(  {
                        "users": [
                          user.id
                        ],
                        "chatId": Store.getState().selectedChat.id
                      } )
                    .then( ( res: any ) => {
                        const code = res.status;
                        this.getChats();
                    });
            } catch (e: any) {
                console.error(e.message);
            }
        }
    }
   
    public async deleteUserFromChat( data: string ) {
        let users;
        try {
            users = await userController.search({ login: data});
          } catch (e: any) {
            console.error(e.message);
          }

        const user = users.find((el: any): any | undefined => {
            return el.login === data;
          });

          if ( user !== undefined ){

            try {
                await this._api
                    .deleteUserFromChat(  {
                        "users": [
                          user.id
                        ],
                        "chatId": Store.getState().selectedChat.id
                      } )
                    .then( ( res: any ) => {
                        const code = res.status;
                        this.getChats();
                    });
            } catch (e: any) {
                console.error(e.message);
            }
        }
    }

    public async getToken(chatId: number) {
        return this._api.getToken(chatId).then((res: any) => {
          return JSON.parse(res.response).token;
        });
      }
    
}

export const chatsController = new ChatsController();
