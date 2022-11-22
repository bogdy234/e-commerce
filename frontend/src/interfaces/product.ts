export interface Product {
    category: string;
    comments: any[];
    description: string;
    discount: number;
    imgUrl: string;
    pid: number;
    price: number;
    price_with_discount: number;
    quantity: number;
    title: string;
}

export interface FavoriteProduct {
    id: number;
    product: Product;
}
