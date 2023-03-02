import { Indexed } from "../utils/Interfeces";
import { queryStringify } from "../utils/QueryStringify";

enum Methods {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
}

type THTTPMethod = (
    url: string,
    options?: {
        data?: Indexed | FormData;
        headers?: Record<string, string>;
        timeout?: number
    }
 ) => Promise<unknown>;

 type TOptions = {
    method?: Methods;
    data?: Indexed | FormData;
    headers?: Record<string, string>;
    timeout?: number;
  };

class HTTPTransport {
  protected url: string;

  constructor ( url: string ) {
    this.url = url;
  }

  get: THTTPMethod = ( path: string, options = {} ) => {
    return this.request(this.url + path, {...options, method: Methods.Get}, options.timeout);
  };

  post: THTTPMethod = ( path: string, options = {} ) => {
    return this.request(this.url + path, {...options, method: Methods.Post}, options.timeout);
  };

  put: THTTPMethod = ( path: string, options = {} ) => {
    return this.request(this.url + path, {...options, method: Methods.Put}, options.timeout);
  };

  delete: THTTPMethod = ( path: string, options = {} ) => {
    return this.request(this.url + path, {...options, method: Methods.Delete}, options.timeout);
  };

  request = (url: string, options: TOptions = {}, timeout = 5000) => {
    const {headers = {}, method, data} = options;

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.Get;

      xhr.open(
          method,
          isGet && !!data ?
                  `${url}${queryStringify(data)}` :
                  url,
      );

      xhr.withCredentials = true;
      
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}

export {HTTPTransport};
