import { Timestamp } from "firebase/firestore";

export interface User {
    Firebase_uuid: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    last_login: Timestamp;
    points_balance: number;
    email: string | null;
}
