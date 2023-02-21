import { UserAPI } from "../api/user-api";
import { router } from "../services/Router";
import store from '../services/store/Store';
import { Indexed } from "../utils/Interfeces";

class UserController {
    private _api = new UserAPI();

    async changeProfile ( data: Indexed ) {
        try {
            await this._api
                .changeProfile( data )
                .then( ( res: any ) => {
                    const code = res.status;

                    if ( code === 200 ) {
                        store.set('user', JSON.parse(res.response));
                    }
                });
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async changePassword ( data: Indexed ) {
        try {
            await this._api
                .changePassword( data )
                .then( ( res: any ) => {
                    const code = res.status;
                    if ( code === 200 ) {
                        router.go('/settings');
                    }
                });
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async changeAvatar ( data: FormData ) {
        try {
            await this._api
                .changeAvatar( data )
                .then( ( res: any ) => {
                    const code = res.status;
                    if ( code === 200 ) {
                        store.set('user', JSON.parse(res.response));
                    } 
                });
        } catch (e: any) {
            console.error(e.message);
        }
    }
    
    async search ( data: Indexed ) {
        return this._api
            .search( data )
            .then( ( res: any ) => {
                const code = res.status;
                if ( code === 200 ) {
                    return JSON.parse(res.response);
                }
            });
    }
}

export const userController = new UserController();
