// import {OrderService} from '/src/services/ordersvc/orderservice';
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { AppState } from '../../services/appState';
@inject(HttpClient, AppState)
export class Dashboard {
	appState : AppState;
	constructor(private http: HttpClient, appState: AppState ) {
		//this.orderService = orderService;
		this.appState = appState;
		http.configure(config => {
			config
				.useStandardConfiguration()
				.withBaseUrl('https://api.github.com/');
		});
	}
	activate() {

		return Promise.all([
			this.http
		])

	}
	setLockr(){
		this.appState.setMyInFo();
	}
}