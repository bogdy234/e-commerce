import { getProducts } from "@api/products/products";
import { Product } from "@interfaces/product";
import { useQuery } from "@tanstack/react-query";

export interface UseProductsData {
    isLoading: boolean;
    data: Product[] | undefined;
    isFetching: boolean;
    error: any;
}

const useProducts = (): UseProductsData => {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    return { isLoading, error, data, isFetching };
};

export default useProducts;
