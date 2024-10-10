import { Timestamp } from 'firebase/firestore';

export interface Product {
    id: string;
    created_at: Timestamp;
    description: string;
    image_url: string;
    is_active: boolean;
    name: string;
    price: number;
    stock_quantity: number;
    updated_at: Timestamp;
    is_featured: boolean;
    points_awarded: number;
}
