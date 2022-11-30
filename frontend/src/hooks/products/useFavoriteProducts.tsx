import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    addFavoriteProduct,
    deleteFavoriteProduct,
    getFavoriteProducts
} from "@api/products/favoriteProducts";
import { RESET_USER } from "@constants/user";
import useUser from "@hooks/user/useUser";
import { FavoriteProduct } from "@interfaces/product";
import { Button } from "@mui/material";
import {
    UseMutateFunction,
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

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

interface ErrorType {
    response: {
        data: {
            is_token_problem: boolean;
            message: string;
        };
    };
}

const useFavoriteProducts = (): UseFavoriteProductData => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { state, dispatch } = useUser();

    const {
        isLoading,
        error,
        data: favoriteProducts,
        isFetching,
    } = useQuery<FavoriteProduct[], ErrorType>({
        queryKey: ["favoriteProducts"],
        queryFn: () => getFavoriteProducts(state?.token || ""),
        enabled: !!state?.token,
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
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
            toast.success("Product was removed from your favorites.", {
                icon: "♡",
            });
        },
        onError: (error: ErrorType) => {
            toast.error(error?.response?.data?.message);
        },
    });

    const favoriteToast = useCallback(
        () => (
            <Button onClick={() => navigate("/favorites")}>
                Product was added to your favorites.
            </Button>
        ),
        []
    );

    const { mutate: mutateAdd, isLoading: isLoadingAdd } = useMutation({
        mutationKey: ["addFavoriteProduct"],
        mutationFn: (productId: number) =>
            addFavoriteProduct(state?.token as string, productId),
        onSuccess: () => {
            queryClient.invalidateQueries(["favoriteProducts"]);
            toast.success(favoriteToast, {
                icon: "❤️",
            });
        },
        onError: (error: ErrorType) => {
            toast.error(error?.response?.data?.message);
        },
    });

    return {
        mutateAdd,
        isLoadingAdd,
        isLoading,
        error,
        favoriteProducts: favoriteProducts || [],
        isFetching,
        favoriteProductsNumber: favoriteProducts?.length || 0,
        isLoadingDelete,
        mutateDelete,
    };
};

export default useFavoriteProducts;
