import { Indexed } from "../utils/Interfeces";
import { BaseAPI } from "./base-api";

export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signup( data: Indexed ): Promise<unknown> {
        return this.httpTransport.post('/signup', { data } );
    }

    signin( data: Indexed ): Promise<unknown> {
        return this.httpTransport.post('/signin', { data });
    }
    
    user(): Promise<unknown> {
        return this.httpTransport.get('/user');
    }

    logout(): Promise<unknown> {
        return this.httpTransport.post('/logout');
    }
}
