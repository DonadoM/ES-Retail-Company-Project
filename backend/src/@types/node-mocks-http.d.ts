declare module "node-mocks-http" {
    import { IncomingHttpHeaders } from "http";
    import { Readable } from "stream";
  
    interface MockRequestOptions {
      method?: string;
      url?: string;
      headers?: IncomingHttpHeaders;
      body?: any;
      query?: any;
      params?: any;
      cookies?: any;
    }
  
    interface MockResponseOptions {
      eventEmitter?: any;
    }
  
    interface MockRequest extends Readable {
      method: string;
      url: string;
      headers: IncomingHttpHeaders;
      body: any;
      query: any;
      params: any;
      cookies: any;
    }
  
    interface MockResponse {
      statusCode: number;
      _getData(): any;
      _getStatusCode(): number;
      _isEndCalled(): boolean;
      _getHeaders(): IncomingHttpHeaders;
    }
  
    function createRequest(options?: MockRequestOptions): MockRequest;
    function createResponse(options?: MockResponseOptions): MockResponse;
  }