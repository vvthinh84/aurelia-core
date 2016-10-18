import * as APISettings from 'Configuration/APISettings';
import { inject, transient } from 'aurelia-framework';
import { HttpServiceWebPublicApi } from 'Services/HttpService';
import { HttpService } from 'Services/HttpService';

@inject(HttpServiceWebPublicApi, HttpService)
@transient()
export class NotificationService {

    constructor(httpServiceWebPublicApi, httpService) {
        this.httpServiceWebPublicApi = httpServiceWebPublicApi;
        this.httpService = httpService;
    }

    //get list app devices
    GetListAppDevice() {
        var data = this.httpService.GetData(APISettings.APIGetListAppDevice, 'get', null);
        //console.log(JSON.stringify(data));
        return data;
    }

    InsertNotificationLog(jsonToPost) {
        //console.log(JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIInsertNotificationLog, 'post', jsonToPost);
    }

    SendNotification(deviceOs, jsonToPost) {

        if (deviceOs == "Android") {
            var pathToApi = APISettings.WebPublicApiUrlBase + APISettings.APISendMesageNotiAndroid;
            var response = this.httpServiceWebPublicApi.GetData(APISettings.APISendMesageNotiAndroid, 'post', jsonToPost);
            console.log("response from service", response);
            return response;
        }

        if (deviceOs == "iOS") {
            var pathToApi = APISettings.WebPublicApiUrlBase + APISettings.APISendMesageNotiIOS;
            var response = this.httpServiceWebPublicApi.GetData(APISettings.APISendMesageNotiIOS, 'post', jsonToPost);
            console.log("response from service", response);
            return response;
        }
    }

    SendNotification2(jsonToPost) {
        console.log(JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APISendNotificationv2, 'post', jsonToPost);
    }

    GetPushProgressInfo() {
        return this.httpService.GetData(APISettings.APIGetPushProgressInfo, 'get', null);
    }
}