type TProduct = {
  id: string
  category: string
  name: string
  description: string
  price: string
  image: string
  vendorid: string
}

type TProductDetails = {
  id: string
  category: string
  name: string
  description: string
  price: string
  image: string
  vendorid: string
  vendor: {
    username: string
    email: string
    phone: string
  }
}

type DBuser = {
id: string;
username: string;
email: string;
phone: string;
socialmediaUser: boolean;
cart: {item: TProductDetails, count: number}[];
password?: string
role: "ADMIN" | "VENDOR" | "CUSTOMER";
}

type User = Omit<DBuser, "password">

type TLoginResponse = {
success: boolean
user: User
}

type Cart = {
  cart: {item: TProductDetails, count: number}[]
}

type TCart = {
  id: string
  cart: {item: TProductDetails, count: number}[]
}

type TNotify = {
type: "error" | "success",
message: string 
}