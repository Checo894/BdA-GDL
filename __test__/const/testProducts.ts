import { Timestamp } from 'firebase/firestore';

interface Product {
    created_at: Timestamp;
    description: string;
    image_url: string;
    is_active: boolean;
    name: string;
    price: number;
    stock_quantity: number;
    updated_at: Timestamp;
    is_featured?: boolean;
}

export const testProducts: Product[] = [
    {
        created_at: Timestamp.fromDate(new Date()),
        description: "Un saco de arroz, esencial para muchas familias.",
        image_url: "https://example.com/arroz.jpg",
        is_active: true,
        name: "Arroz",
        price: 25.70,
        stock_quantity: 100,
        updated_at: Timestamp.fromDate(new Date()),
    },
    {
        created_at: Timestamp.fromDate(new Date()),
        description: "Bolsa de frijoles, ricos en proteínas.",
        image_url: "https://example.com/frijoles.jpg",
        is_active: true,
        name: "Frijoles",
        price: 45.42,
        stock_quantity: 200,
        updated_at: Timestamp.fromDate(new Date()),
    },
    {
        created_at: Timestamp.fromDate(new Date()),
        description: "Paquete de pasta, fácil de preparar y nutritiva.",
        image_url: "https://example.com/pasta.jpg",
        is_active: true,
        name: "Pasta",
        price: 8.32,
        stock_quantity: 150,
        updated_at: Timestamp.fromDate(new Date()),
    },
    {
        created_at: Timestamp.fromDate(new Date()),
        description: "Botella de 1 litro de aceite vegetal, ideal para cocinar.",
        image_url: "https://example.com/aceite.jpg",
        is_active: true,
        name: "Aceite Vegetal",
        price: 37.67,
        stock_quantity: 80,
        updated_at: Timestamp.fromDate(new Date()),
    },
    {
        created_at: Timestamp.fromDate(new Date()),
        description: "Jitomates enlatados para cocinar.",
        image_url: "https://example.com/jitomate.jpg",
        is_active: true,
        name: "Jitomate",
        price: 28.19,
        stock_quantity: 50,
        updated_at: Timestamp.fromDate(new Date()),
    },
    {
        created_at: Timestamp.fromDate(new Date()),
        description: "Un saco de harina, ideal para hornear.",
        image_url: "https://example.com/harina.jpg",
        is_active: true,
        name: "Harina",
        price: 12.88,
        stock_quantity: 60,
        updated_at: Timestamp.fromDate(new Date()),
    },
    {
        created_at: Timestamp.fromDate(new Date()),
        description: "Un saco de sal, esencial para sazonar.",
        image_url: "https://example.com/sal.jpg",
        is_active: true,
        name: "Sal",
        price: 5.00,
        stock_quantity: 300,
        updated_at: Timestamp.fromDate(new Date()),
    },
    {
        created_at: Timestamp.fromDate(new Date()),
        description: "Bolsa de azúcar, perfecta para endulzar.",
        image_url: "https://example.com/azucar.jpg",
        is_active: true,
        name: "Azúcar",
        price: 36.49,
        stock_quantity: 120,
        updated_at: Timestamp.fromDate(new Date()),
    },
    {
        created_at: Timestamp.fromDate(new Date()),
        description: "Lata de atún, rica en proteínas.",
        image_url: "https://example.com/atun.jpg",
        is_active: true,
        name: "Atún",
        price: 18.26,
        stock_quantity: 70,
        updated_at: Timestamp.fromDate(new Date()),
    },
];
