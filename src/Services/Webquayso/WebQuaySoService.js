import * as APISettings from 'Configuration/APISettings';
import { inject, transient } from 'aurelia-framework';
import { HttpService } from 'Services/HttpService';

@inject(HttpService)
@transient()
export class WebQuaySoService {

    constructor(httpService) {
        this.httpService = httpService;
    }

    //Table Gift
    GetKetQuaKhachhangtrunggiai(jsonToPost) {
        return this.httpService.GetData(APISettings.APIGetKetQuaKhachhangtrunggiai, 'post', jsonToPost);
    }

    GetKetQuaQuaySo(jsonToPost) {
        return this.httpService.GetData(APISettings.APIGetKetQuaQuaySo, 'post', jsonToPost);
    }

    //Table Gift
    GetListQuaySoKhachHang(jsonToPost) {
        return this.httpService.GetData(APISettings.APIGetListQuaySoKhachHang, 'post', jsonToPost);
    }


    GetKetQuaQuaySoTV(jsonToPost) {
        return this.httpService.GetData(APISettings.APIGetKetQuaQuaySoTV, 'post', jsonToPost);
    }

    //Table Gift
    GetKetQuaKhachHangTrungGiaiTV(jsonToPost) {
        return this.httpService.GetData(APISettings.APIGetKetQuaKhachHangTrungGiaiTV, 'post', jsonToPost);
    }

}