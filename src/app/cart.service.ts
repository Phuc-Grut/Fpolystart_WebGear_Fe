import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CartDeatail {
  produceId : string,
  quantity : string,
  unitPrice : number,
}

@Injectable({
  providedIn: 'root'
})

export class CartService{
  private apiUrl = 'https://localhost:7249/api/Cart';

  constructor(private http: HttpClient) {}

  handleAddCart(data : CartDeatail){
    const temp = localStorage.getItem('user');
    let user;
    if (temp) {
      user = JSON.parse(temp as string);
    }


    return this.http.post(`${this.apiUrl}/add`, {
      userId :  user.userId,
      productID : data.produceId,
      quantity : data.quantity,
      unitPrice : data.unitPrice
    });
  }

  handleGetCartByUserId(){
    const data = localStorage.getItem('user');
    let user;
    if (data) {
      user = JSON.parse(data);
    }

    return  this.http.get(`${this.apiUrl}/user/${user.userId}`)
  }
}