import {
    addCartProduct,
    deleteCartProduct,
    getCartProducts,
} from "@api/products/cart";
import { RESET_USER } from "@constants/user";
import useUser from "@hooks/user/useUser";
import { CartProduct } from "@interfaces/product";
import {
    UseMutateFunction,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface MutateAddParams {
    productId: number;
    quantity: number;
}

interface UseCartData {
    isLoading: boolean;
    cartProducts: CartProduct[];
    cartProductsNumber: number;
    error: unknown;
    isLoadingDelete: boolean;
    isLoadingAdd: boolean;
    mutateDelete: UseMutateFunction<unknown, any, number, unknown>;
    mutateAdd: UseMutateFunction<unknown, any, MutateAddParams, unknown>;
}

const useFavoriteProducts = (): UseCartData => {
    const queryClient = useQueryClient();
    const { state, dispatch } = useUser();

    const { isLoading, error, data } = useQuery({
        queryKey: ["cartProducts"],
        queryFn: () => getCartProducts(state?.token || ""),
        enabled: !!state?.token,
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        // TODO: add type to error
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
        onError: (data: any) => {
            toast.error(data?.response?.data?.message);
        },
    });

    const { mutate: mutateAdd, isLoading: isLoadingAdd } = useMutation({
        mutationKey: ["addCartProduct"],
        mutationFn: ({ productId, quantity }: MutateAddParams) =>
            addCartProduct(state?.token as string, productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries(["cartProducts"]);
            toast.success("Product was added to your cart.");
        },
        onError: (data: any) => {
            toast.error(data?.response?.data?.message);
        },
    });

    return {
        cartProductsNumber: data?.cart?.length || 0,
        cartProducts: data?.cart,
        isLoading,
        error,
        mutateDelete,
        mutateAdd,
        isLoadingDelete,
        isLoadingAdd,
    };
};

export default useFavoriteProducts;
