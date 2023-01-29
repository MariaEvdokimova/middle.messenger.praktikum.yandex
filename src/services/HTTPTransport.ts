enum Methods {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
}

function queryStringify<T>(data: Record<string, T>): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

type THTTPMethod = (
    url: string,
    options?: {
        data?: Record<string, string | number>;
        headers?: Record<string, string>;
        timeout?: number
    }
 ) => Promise<unknown>;

 type TOptions = {
    method?: Methods;
    data?: any;
    headers?: Record<string, string>;
    timeout?: number;
  };

class HTTPTransport {
  get: THTTPMethod = (url, options = {}) => {
    return this.request(url, {...options, method: Methods.Get}, options.timeout);
  };

  post: THTTPMethod = (url, options = {}) => {
    return this.request(url, {...options, method: Methods.Post}, options.timeout);
  };

  put: THTTPMethod = (url, options = {}) => {
    return this.request(url, {...options, method: Methods.Put}, options.timeout);
  };

  delete: THTTPMethod = (url, options = {}) => {
    return this.request(url, {...options, method: Methods.Delete}, options.timeout);
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

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

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
        xhr.send(data);
      }
    });
  };
}

export {HTTPTransport};
