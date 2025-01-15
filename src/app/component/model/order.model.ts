export interface OrderDetail {
    productID: number;
    unitPrice: number;
    quantity: number;
  }
  
  export interface OrderRequest {
    userID: number;
    voucherID: number;
    orderStatus: number;
    paymentMethod: string;
    orderDetails: OrderDetail[];
    createdTime: Date;
    completeDate: Date;
  }
  