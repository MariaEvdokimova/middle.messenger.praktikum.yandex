import { Indexed } from "../utils/Interfeces";
import { BaseAPI } from "./base-api";

export class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    changeProfile( data: Indexed ): Promise<unknown> {
        return this.httpTransport.put('/profile', { data });
    }

    changeAvatar( data: FormData ): Promise<unknown> {
        return this.httpTransport.put('/profile/avatar', { data });
    }
    
    changePassword( data: Indexed ): Promise<unknown> {
        return this.httpTransport.put('/password', { data });
    }

    getUser( id: number ): Promise<unknown> {
        return this.httpTransport.get( `/${id}` );
    }

    search( data: Indexed ): Promise<unknown> {
        return this.httpTransport.post( '/search', { data } );
    }
}
