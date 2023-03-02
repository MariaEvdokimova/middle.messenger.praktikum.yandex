import { Indexed } from "../utils/Interfeces";
import { BaseAPI } from "./base-api";

export class ChatAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    chats(): Promise<unknown> {
        return this.httpTransport.get('/');
    }

    createChat( data: Indexed ): Promise<unknown> {
        return this.httpTransport.post('/', { data });
    }
    
    deleteChat(data: Indexed): Promise<unknown> {
        return this.httpTransport.delete('/', { data });
    }

    addUserToChat(data: Indexed): Promise<unknown> {
        return this.httpTransport.put('/users', { data });
    }

    deleteUserFromChat(data: Indexed): Promise<unknown> {
        return this.httpTransport.delete('/users', { data });
    }
    
    getToken(id: number): Promise<unknown> {
        return this.httpTransport.post(`/token/${id}`, {});
    }
}
