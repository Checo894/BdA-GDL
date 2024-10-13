import { Timestamp } from 'firebase/firestore';

export interface Product {
    id: string;
    created_at: Timestamp;
    description: string; // Include
    image_url: string; // Include
    is_active: boolean; // Include
    name: string; // Include
    price: number; // Include
    stock_quantity: number; // Include
    updated_at: Timestamp;
    is_featured: boolean; // Include
    points_awarded: number; // Include
}
