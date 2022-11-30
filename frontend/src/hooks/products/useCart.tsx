import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    addCartProduct,
    deleteCartProduct,
    editCartProduct,
    getCartProducts,
} from "@api/products/cart";
import { RESET_USER } from "@constants/user";
import useUser from "@hooks/user/useUser";
import { CartProduct } from "@interfaces/product";
import { Button } from "@mui/material";
import {
    UseMutateFunction,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

interface MutateAddParams {
    productId: number;
    quantity: number;
}

interface MutateEditParams {
    cartId: number;
    productQuantity: number;
}

interface UseCartData {
    isLoading: boolean;
    cartProducts: CartProduct[];
    cartProductsNumber: number;
    error: unknown;
    isLoadingDelete: boolean;
    isLoadingAdd: boolean;
    isLoadingEdit: boolean;
    mutateDelete: UseMutateFunction<unknown, any, number, unknown>;
    mutateEdit: UseMutateFunction<unknown, any, MutateEditParams, unknown>;
    mutateAdd: UseMutateFunction<unknown, any, MutateAddParams, unknown>;
    totalAmount: number;
    totalAmountDiscount: number;
}

interface ErrorType {
    response: {
        data: {
            is_token_problem: boolean;
            message: string;
        };
    };
}

export interface QueryCartData {
    cart: CartProduct[];
    total_amount: number;
    total_amount_with_discount: number;
}

const useFavoriteProducts = (): UseCartData => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { state, dispatch } = useUser();

    const { isLoading, error, data } = useQuery<QueryCartData, ErrorType>({
        queryKey: ["cartProducts"],
        queryFn: () => getCartProducts(state?.token || ""),
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
        mutationKey: ["deleteCartProduct"],
        mutationFn: (productId: number) =>
            deleteCartProduct(state?.token as string, productId),
        onSuccess: () => {
            queryClient.invalidateQueries(["cartProducts"]);
            toast.success("Product was removed from your cart.");
        },
        onError: (error: ErrorType) => {
            toast.error(error?.response?.data?.message);
        },
    });

    const addCartToast = useCallback(
        () => (
            <Button onClick={() => navigate("/cart")}>
                Product was added to your cart.
            </Button>
        ),
        []
    );

    const { mutate: mutateAdd, isLoading: isLoadingAdd } = useMutation({
        mutationKey: ["addCartProduct"],
        mutationFn: ({ productId, quantity }: MutateAddParams) =>
            addCartProduct(state?.token as string, productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries(["cartProducts"]);
            toast.success(addCartToast);
        },
        onError: (error: ErrorType) => {
            toast.error(error?.response?.data?.message);
        },
    });

    const editCartToast = useCallback(
        () => (
            <Button onClick={() => navigate("/cart")}>
                Quantity was edited into your cart.
            </Button>
        ),
        []
    );

    const { mutate: mutateEdit, isLoading: isLoadingEdit } = useMutation({
        mutationKey: ["editCartProduct"],
        mutationFn: ({ productQuantity, cartId }: MutateEditParams) =>
            editCartProduct(state?.token as string, cartId, productQuantity),
        onSuccess: () => {
            queryClient.invalidateQueries(["cartProducts"]);
            toast.success(editCartToast);
        },
        onError: (data: any) => {
            toast.error(data?.response?.data?.message);
        },
    });

    return {
        cartProductsNumber: data?.cart?.length || 0,
        cartProducts: data?.cart || [],
        totalAmount: data?.total_amount || 0,
        totalAmountDiscount: data?.total_amount_with_discount || 0,
        isLoading,
        error,
        mutateDelete,
        mutateAdd,
        isLoadingDelete,
        isLoadingAdd,
        mutateEdit,
        isLoadingEdit,
    };
};

export default useFavoriteProducts;
