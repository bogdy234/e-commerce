import {
    addFavoriteProduct,
    deleteFavoriteProduct,
    getFavoriteProducts,
} from "@api/products/favoriteProducts";
import { RESET_USER } from "@constants/user";
import useUser from "@hooks/user/useUser";
import { FavoriteProduct } from "@interfaces/product";
import {
    UseMutateFunction,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface UseFavoriteProductData {
    isLoading: boolean;
    favoriteProducts: FavoriteProduct[];
    isLoadingDelete: boolean;
    isLoadingAdd: boolean;
    isFetching: boolean;
    favoriteProductsNumber: number;
    mutateAdd: UseMutateFunction<any, any, number, unknown>;
    mutateDelete: UseMutateFunction<any, any, number, unknown>;
    error: any;
}

const useFavoriteProducts = (): UseFavoriteProductData => {
    const queryClient = useQueryClient();
    const [favoriteProductsNumber, setFavoriteProductsNumber] =
        useState<number>(0);
    const { state, dispatch } = useUser();

    const {
        isLoading,
        error,
        data: favoriteProducts,
        isFetching,
    } = useQuery({
        queryKey: ["favoriteProducts"],
        queryFn: () => getFavoriteProducts(state?.token || ""),
        enabled: !!state?.token,
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        setFavoriteProductsNumber(favoriteProducts?.length);
    }, [favoriteProducts]);

    useEffect(() => {
        // TODO: add type to error
        if (error?.response?.data?.is_token_problem) {
            dispatch({
                type: RESET_USER,
            });
        }
    }, [error]);

    const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
        mutationKey: ["deleteFavoriteProduct"],
        mutationFn: (productId: number) =>
            deleteFavoriteProduct(state?.token as string, productId),
        onSuccess: () => {
            queryClient.invalidateQueries(["favoriteProducts"]);
        },
        onError: (data: any) => {
            // TODO: make a handler
        },
    });

    const { mutate: mutateAdd, isLoading: isLoadingAdd } = useMutation({
        mutationKey: ["addFavoriteProduct"],
        mutationFn: (productId: number) =>
            addFavoriteProduct(state?.token as string, productId),
        onSuccess: () => {
            queryClient.invalidateQueries(["favoriteProducts"]);
        },
        onError: (data: any) => {
            // TODO: make a handler
        },
    });

    return {
        mutateAdd,
        isLoadingAdd,
        isLoading,
        error,
        favoriteProducts,
        isFetching,
        favoriteProductsNumber,
        isLoadingDelete,
        mutateDelete,
    };
};

export default useFavoriteProducts;
