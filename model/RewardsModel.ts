import { Timestamp } from "firebase/firestore";

export interface Rewards {
    id: string;
    name: string;
    created_at: Timestamp;
    description: string;
    image_url: string;
    is_active: boolean;
    points_cost: number;
    is_featured: boolean;
}
