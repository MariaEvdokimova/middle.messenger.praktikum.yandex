import { HTTPTransport } from "./HTTPTransport";

describe('Check HTTPTransport', () => {
    const httpTransport = new HTTPTransport('test');

    it('check GET request',  async () => {
       try {
        const http = new HTTPTransport('https://jsonplaceholder.typicode.com');
        await http.get('/posts/1',  {})
            .then((resp) => {
                expect((resp as any).status).toEqual(200);
            });
        } catch (e){
            expect(e).toBe(null);
            throw new Error();
        }
    });

    it('return GET', () => {
      httpTransport.get('GET').then((res: any) => {
        expect(res.response).toEqual('GET');
      });
    });

    it('return POST', () => {
        httpTransport.post('POST').then((res: any) => {
            expect(res.response).toEqual('POST');
        });
    });

    it('return PUT', () => {
        httpTransport.put('PUT').then((res: any) => {
            expect(res.response).toEqual('PUT');
        });
    }); 

   it('return DELETE', () => {
        httpTransport.delete('DELETE').then((res: any) => {
            expect(res.response).toEqual('DELETE');
        });
    });
});
