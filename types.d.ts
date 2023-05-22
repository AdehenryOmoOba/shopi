type TProduct = {
    id: string
    category: string
    name: string
    description: string
    price: number
    image: string
    vendorId: string
  }

type TProductDetails = {
    id: string
    category: string
    name: string
    description: string
    price: number
    image: string
    vendorId: string
    vendor: {
      id: string
      name: string
      email: string
      phone: string
    }
  }

type DBuser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  socialmediaUser: boolean;
  cart: string[];
  password?: string
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
}

type User = Omit<DBuser, "password">

type TLoginResponse = {
  success: boolean
  user: User
}

type TNotify = {
  type: "error" | "success",
  message: string 
}