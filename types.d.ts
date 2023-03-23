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
