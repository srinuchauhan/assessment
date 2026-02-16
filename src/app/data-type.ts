export interface signUp {
  name: string;
  password: string;
  emailid: string;
  id: number;
}
export interface product {
  name: string,
  price: number,
  color: string,
  category: string,
  description: string,
  image: string,
  discount:number,
  id: number,
  productId:number |undefined,
  quantity: undefined | number;
};
export interface login {
  name:string,
  password: string;
  emailid: string;
  id: number;
};

export interface user {
  name: string;
  password: string;
  emailid: string;
  id: number;
}

export interface Cart{
  name: string,
  price: number,
  color: string,
  category: string,
  description: string,
  discount:number,
  image: string,
  id: number | undefined,
  quantity: undefined | number;
  userId:number;
  productId:number;
}

export interface priceSummary{
  tax:number,
  price:number,
  discount:number,
  delivery:number,
  total:number;
}

export interface order{
  email:string,
  contact:string,
  totalPrice:number,
  userId:number,
  id:number |undefined;
}