import { User } from "@interfaces/user";

export interface Comment {
    comment_id: number;
    description: string;
    product_id: number;
    rating: number;
    title: string;
    user: User;
}
