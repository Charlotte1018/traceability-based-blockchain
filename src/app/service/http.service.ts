import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {
    public myHeaders;
    public retCode;
    public init = {};

    http(msg: any): any {
        this.myHeaders = new Headers({
            "Content-Type": "application/json",
        });
        this.init = {
            method: msg.method||"GET",
            headers: this.myHeaders,
            body: JSON.stringify(msg.body),
            mode: 'cors',
            cache: 'default'
        };
        let retCode = this.retCode;

        return new Promise((resolve, reject) => {
            fetch(msg.url, this.init).then((response) => {
                retCode = response.status;
                if (retCode === 200 || retCode === 400) {
                    if (retCode === 200) {
                        //请求成功之后，将token存储在本地；
                        // let token = response.headers.get('authorization');
                        // token && localStorage.setItem('token', token);
                    }
                    return response.json();
                } else if (retCode === 503) {
                } else if (retCode === 500) {
                } else if (retCode === 401) {
                }
            }).then(data => {
                if (retCode === 200) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }
}