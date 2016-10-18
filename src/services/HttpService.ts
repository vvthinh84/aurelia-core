import {  inject, LogManager, transient} from 'aurelia-framework';
import {  HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
@transient()
export class HttpService {
  logger:any;
  httpInstance : HttpClient;
  http: HttpClient;
  constructor(http) {   
    this.logger = LogManager.getLogger('HttpService');

    http.configure(config => {
      config
        .useStandardConfiguration()
        // .withBaseUrl(AppConfig.ApiUrlBase)
        .withDefaults({
          headers: {
            'SessionToken': (Lockr.get('UserInfo') == null || typeof Lockr.get('UserInfo') === "undefined") ? "" : (Lockr.get('UserInfo')as any).SessionToken
          }
        })
        // .withInterceptor({
        //   request(request) {

        //     console.log(`Requesting ${request.method} ${request.url}`);
        //     return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
        //   },
        //   response(response) {
        //     console.log(`Received ${response.status} ${response.url}`);
            
        //     return response; // you can return a modified Response
        //   }
        // });
    });
    this.httpInstance = http;

  }

}