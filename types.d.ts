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
      password: strin
    }
  }

type TVendor =   {
  id: string
  name: string
  email: string
  phone: string
}

type TLoginResponse =   {
  success: boolean
  jwt: string
  user: {
    id: string
    name: string
    email: string
    phone: string
  }
}

type TNotify = {
  type: "error" | "success",
  message: string 
}