import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared';
import { HttpService, Web3Service } from './service';
import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Web3Service, HttpService]
})
export class AppComponent implements OnInit {
  url = 'https://github.com/preboot/angular2-webpack';
  title: string;
  public web3;
  coinbase;
  constructor(private api: ApiService,private web3Service: Web3Service,private httpService: HttpService
  ) {
    this.title = this.api.title;
  }
  ngOnInit() {
    this.connectGeth();
    this.getFetch();
    this.getAccounts();
  }
  connectGeth() {
    this.web3Service.connect('http://localhost:8545');
    this.web3 = this.web3Service.getWeb3();
  }
  getAccounts(): void {
    this.coinbase = this.web3.eth.accounts[0];
    console.log(this.coinbase);
}
  getFetch(): void {
    let msg = {
      url: "http://106.14.139.83:8080/event/findEventAll"
    };
    this.httpService.http(msg).then(data => {
      console.log(data);
    });
  }
}
