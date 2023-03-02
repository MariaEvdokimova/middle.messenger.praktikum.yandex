import { HTTPTransport } from "../services/HTTPTransport";

export class BaseAPI {
    private baseURL: string = 'https://ya-praktikum.tech/api/v2';
    protected httpTransport: HTTPTransport;
    
    constructor ( endpoint: string ) {
        this.httpTransport = new HTTPTransport(`${this.baseURL}${endpoint}`);
    }
}
