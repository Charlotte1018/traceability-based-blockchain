import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
	constructor(private http: Http) { }

	testApi() {
		return this.http.get('/api/user/testApi').map((response: Response) => response.json());
	}

}