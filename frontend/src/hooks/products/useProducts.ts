import { getProducts } from "@api/products/products";
import { filterProductsByName } from "@helpers/helpers";
import useSearch from "@hooks/search/useSearch";
import { Product } from "@interfaces/product";
import { useQuery } from "@tanstack/react-query";

export interface UseProductsData {
    isLoading: boolean;
    data: Product[] | undefined;
    isFetching: boolean;
    error: any;
}

const useProducts = (): UseProductsData => {
    const { state } = useSearch();

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        select: (response) =>
            filterProductsByName(response, state?.searchData || ""),
    });

    return { isLoading, error, data, isFetching };
};

export default useProducts;
