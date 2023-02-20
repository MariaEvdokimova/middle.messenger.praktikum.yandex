import { AuthAPI } from "../api/auth-api";
import { router } from "../services/Router";
import store from '../services/store/Store';
import { Indexed } from "../utils/Interfeces";

class AuthController {
    private _api = new AuthAPI();

    public async signup( data: Indexed ) {
        try {
            await this._api
                .signup( data )
                .then( ( res: any ) => {
                    const code = res.status;

                    if ( code === 200 ) {
                        this.user(); 
                        router.go('/messenger');
                    }
                });
        } catch (e: any) {
            console.error(e.message);
        }
    }

    public async signin( data: Indexed ) {
        try {
            await this._api
                .signin( data )
                .then( ( res: any ) => {
                const code = res.status;

                if ( code === 200 ) {
                this.user();    
                router.go('/messenger');
                }
            });
        } catch (e: any) {
            console.error(e.message);
        }
    }

    public async user() {
        try {
            await this._api
                .user()
                .then( (res: any) => {
                    store.set('user', JSON.parse(res.response));
                })
        } catch (e: any) {
            console.error(e.message);
        }
    }

    public async logout() {
        try {
            await this._api.logout();
            router.go('/');

        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export const authController = new AuthController();
