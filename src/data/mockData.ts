
import { Product, Order, AdminLocation } from "../types";

export const adminLocation: AdminLocation = {
  latitude: 40.5022,
  longitude: 49.8789,
  address: "Bakı, Azərbaycan"
};

export const categories = [
  { id: "dairy", name: "Süd məhsulları" },
  { id: "eggs", name: "Yumurta" },
  { id: "vegetables", name: "Tərəvəzlər" },
  { id: "fruits", name: "Meyvələr" },
  { id: "nuts", name: "Qoz-fındıq" },
  { id: "honey", name: "Bal" }
];

export const productTags = [
  { id: "fresh", name: "Təzə" },
  { id: "organic", name: "Ekoloji" },
  { id: "local", name: "Yerli" },
  { id: "seasonal", name: "Mövsümi" }
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Təzə kənd yumurtası",
    price: 10,
    currency: "AZN",
    category: "eggs",
    description: "Təbii üsulla yetişdirilmiş toyuqlardan əldə edilən təzə kənd yumurtaları.",
    image: "/placeholder.svg",
    inStock: true,
    tags: ["fresh", "organic", "local"]
  },
  {
    id: "2",
    name: "Keçi südü",
    price: 3,
    currency: "AZN",
    category: "dairy",
    description: "Təbii ekoloji keçi südü, hər gün sağılır.",
    image: "/placeholder.svg",
    inStock: true,
    tags: ["fresh", "organic", "local"]
  },
  {
    id: "3",
    name: "İstixana pomidoru",
    price: 2,
    currency: "AZN",
    category: "vegetables",
    description: "İstixanada yetişdirilmiş dadlı və sulu pomidorlar.",
    image: "/placeholder.svg",
    inStock: true,
    tags: ["fresh", "local"]
  },
  {
    id: "4",
    name: "Dağ balı",
    price: 25,
    currency: "AZN",
    category: "honey",
    description: "Dağ çiçəklərindən toplanmış təmiz təbii bal.",
    image: "/placeholder.svg",
    inStock: true,
    tags: ["organic", "local"]
  },
  {
    id: "5",
    name: "Qoz",
    price: 15,
    currency: "AZN",
    category: "nuts",
    description: "Yerli qoz ağaclarından toplanan təzə qozlar.",
    image: "/placeholder.svg",
    inStock: false,
    tags: ["local", "seasonal"]
  },
  {
    id: "6",
    name: "Kartof",
    price: 1.5,
    currency: "AZN",
    category: "vegetables",
    description: "Yerli fermadan toplanan ekoloji təmiz kartoflar.",
    image: "/placeholder.svg",
    inStock: true,
    tags: ["fresh", "organic", "local"]
  },
  {
    id: "7",
    name: "İnək südü",
    price: 2.5,
    currency: "AZN",
    category: "dairy",
    description: "Təzə sağılmış inək südü, günlük tədarük.",
    image: "/placeholder.svg",
    inStock: true,
    tags: ["fresh", "local"]
  },
  {
    id: "8",
    name: "Alma",
    price: 2,
    currency: "AZN",
    category: "fruits",
    description: "Yerli bağlardan toplanan təzə və şirin almalar.",
    image: "/placeholder.svg",
    inStock: true,
    tags: ["fresh", "local", "seasonal"]
  },
  {
    id: "9",
    name: "Xiyar",
    price: 1.8,
    currency: "AZN",
    category: "vegetables",
    description: "Açıq sahədə yetişdirilmiş təzə və dadlı xiyarlar.",
    image: "/placeholder.svg",
    inStock: true,
    tags: ["fresh", "organic", "local"]
  },
  {
    id: "10",
    name: "Fındıq",
    price: 20,
    currency: "AZN",
    category: "nuts",
    description: "Qabığından təmizlənmiş yerli fındıq.",
    image: "/placeholder.svg",
    inStock: false,
    tags: ["local"]
  }
];

export const mockOrders: Order[] = [
  {
    id: "order1",
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[2], quantity: 1 }
    ],
    customer: {
      name: "Əli Məmmədov",
      phone: "+994501234567",
      email: "ali@example.com"
    },
    deliveryLocation: {
      address: "Bakı, Yasamal r-nu, Nizami küç. 15",
      latitude: 40.3850,
      longitude: 49.8320
    },
    distance: 14.2,
    deliveryFee: 7.1,
    subtotal: 22,
    total: 29.1,
    status: "pending",
    timestamp: "2023-05-08T14:30:00Z"
  },
  {
    id: "order2",
    items: [
      { product: mockProducts[3], quantity: 1 },
      { product: mockProducts[6], quantity: 3 }
    ],
    customer: {
      name: "Leyla Əliyeva",
      phone: "+994559876543"
    },
    deliveryLocation: {
      address: "Bakı, Nəsimi r-nu, 28 May küç. 42",
      latitude: 40.3780,
      longitude: 49.8470
    },
    distance: 16.5,
    deliveryFee: 8.3,
    subtotal: 32.5,
    total: 40.8,
    status: "delivered",
    timestamp: "2023-05-07T10:15:00Z"
  }
];

export const adminCredentials = {
  username: "admin",
  password: "admin123"
};
