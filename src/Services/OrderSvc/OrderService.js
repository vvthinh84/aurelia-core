import { inject, LogManager, transient } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { HttpService } from 'Services/HttpService';
import { AppState } from 'Helpers/AppStateHelper';

@inject(HttpService, AppState)
@transient()
export class OrderService {

    constructor(httpService, appState) {
        this.http = httpService.httpInstance;
        this.httpService = httpService;
        this.appState = appState;
    }

    CanChuyenVta(orderStatus) {

        if (orderStatus == 1 || //Đơn hàng mới
            orderStatus == 2 || //Sẵn sàng chuyển VTA
            orderStatus == 12 || //Online đang xử lý
            orderStatus == 14 || //Xác nhận trả góp lần 1
            orderStatus == 15)
            return true;
        return false;
    }

    GetListOrderPaymentDeferred() {
        var jsonToPost = {};
        jsonToPost.UserId = this.appState.UserInfo.UserId;

        return new Promise((resolve, reject) => {
            this.http.fetch(`Order-api/GetListOrderPaymentDeferred`, {
                    method: 'post',
                    body: json(jsonToPost)
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        });
    }

    GetOrderStatusPaymentDeferred() {
        return new Promise((resolve, reject) => {

            this.http.fetch(`Order-api/GetOrderStatusPaymentDeferred?loaiStatus=StatusOrderPaymentDeferred&company=${this.appState.UserInfo.CompanyId}`, {
                    method: 'get'
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        });
    }

    GetListSaleOnlines() {
            var jsonToPost = {};
            jsonToPost.CompanyId = this.appState.UserInfo.CompanyId;
            jsonToPost.UserId = this.appState.UserInfo.UserId;
            //console.log("JSON GetListSaleOnlines:" + JSON.stringify(jsonToPost));
            return new Promise((resolve, reject) => {
                this.http.fetch(`user-api/GetListUserbyCompanyId`, {
                        method: 'post',
                        body: json(jsonToPost)
                    })
                    .then(response => response.json())
                    .then(data => {
                        resolve(data.Data);
                    })
                    .catch(err => reject(this.httpService.HandlingServerError(err)));

            });
        }
        /**
         * [RejectOrder đấy đơn hàng cấp trên]
         * @param {[type]} obj [orderParameter.OrderId, orderParameter.UserId, orderParameter.Note]
         */
    RejectOrder(obj) {
        return new Promise((resolve, reject) => {
            this.http.fetch('Order-api/RejectOrder', {
                    method: 'post',
                    body: json(obj)
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        });
    }

    OrderToShiper(obj) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`Order-api/SetListOrderShippingId`, {
                    method: 'post',
                    body: json(obj)
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)))
        })
    }

    GetListOrders(jsonToPost) {
        //console.log("Get List Orders: " + JSON.stringify(jsonToPost));
        return new Promise((resolve, reject) => {
            this.http.fetch(`Order-api/GetListOrders`, {
                    method: 'post',
                    body: json(jsonToPost)
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        })
    }
    GetListOrdersEnterprise(jsonToPost) {
        //console.log("Get List Orders: " + JSON.stringify(jsonToPost));
        return new Promise((resolve, reject) => {
            this.http.fetch(`doanhnghiep-api/GetListOrders`, {
                    method: 'post',
                    body: json(jsonToPost)
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        })
    }

    GetOrderStatus() {
        return new Promise((resolve, reject) => {
            this.http.fetch(`Order-api/GetOrderStatus`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                    //console.log("data",da);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        })
    }

    SetListOrderShippingId(jsonToPost) {
            console.log("SetListOrderShippingId: " + JSON.stringify(jsonToPost));
            return new Promise((resolve, reject) => {
                this.http.fetch(`Order-api/SetListOrderShippingId`, {
                        method: 'post',
                        body: json(jsonToPost)
                    })
                    .then(response => response.json())
                    .then(data => {
                        resolve(data);
                    })
                    .catch(err => reject(this.httpService.HandlingServerError(err)));
            })
        }
        //thịnh làm
    PostCompany(jsonToPost) {
        return new Promise((resolve, reject) => {
            this.http.fetch('store-api/GetCompany', {
                    method: 'post',
                    body: json(jsonToPost)
                })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        })
    }

    GetOrderStatusNot() {
            return new Promise((resolve, reject) => {

                this.http.fetch(`Order-api/GetOrderStatusPaymentDeferred?loaiStatus=LydoHuy&company=${this.appState.UserInfo.CompanyId}`, {})
                    .then(response => response.json())
                    .then(data => {
                        resolve(data.Data);
                    })
                    .catch(err => reject(this.httpService.HandlingServerError(err)));
            })
        }
        //
    GetCompany() {
            return new Promise((resolve, reject) => {
                this.http.fetch("store-api/GetCompany", {})
                    .then(response => response.json())
                    .then(data => {
                        resolve(data.Data);
                    })
                    .catch(err => reject(this.httpService.HandlingServerError(err)));
            })
        }
        //post company

    GetLog(orderId) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`order-api/GetOrderHistoryPaymentDeferred?orderId=${orderId}&note=PaymentDeferred`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                }).catch(err => {
                    console.log('error');
                });

        })
    }

    UpdateOrderPaymentDeferred(jsonToPost) {
        return new Promise((resolve, reject) => {
            this.http.fetch("Order-api/UpdateOrderPaymentDeferred", {
                    method: 'post',
                    body: json(jsonToPost)
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        })
    }

    UpdateOrderInfo(jsonToPost) {
        //console.log("JSON UpdateOrderInfo:" + JSON.stringify(jsonToPost));
        return new Promise((resolve, reject) => {
            this.http.fetch("Order-api/UpdateOrderInfo", {
                    method: 'post',
                    body: json(jsonToPost)
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        })
    }

    //
    GetInstalmentDetail(orderId) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`order-api/GetOrderDetailsPaymentDeferred?orderId=${orderId}`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        })
    }

    //Deprecated: OLD VERSION
    GetListOrderDetailByOrderId(orderId) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`order-api/GetListOrderDetailByOrderId?orderid=${orderId}`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        })
    }

    GetListOrderDetail(orderId) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`order-api/GetListOrderDetail?orderid=${orderId}`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        })
    }

}