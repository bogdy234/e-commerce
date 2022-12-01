import { Product } from "@interfaces/product";

export const filterProductsByName = (products: Product[], title: string) =>
    title === ""
        ? products
        : products.filter((product) =>
              product.title.toLowerCase().includes(title.toLowerCase())
          );

export const filterProductsByCategory = (
    products: Product[],
    category: string
) =>
    category === ""
        ? products
        : products.filter(
              (product) =>
                  product.category.toLowerCase() === category.toLowerCase()
          );

export const filterProducts = (
    products: Product[],
    title: string,
    category: string
) => {
    const dataFilteredName = filterProductsByName(products, title);
    const dataFilteredCategory = filterProductsByCategory(
        dataFilteredName,
        category
    );

    return dataFilteredCategory;
};
