import CardProduct from "@/components/layouts/Product";
import { SetStateAction, useEffect, useState } from "react";
import { fetchApi } from "@/utils/api";

interface Product {
    id: number;
    thumbnail: string;
    description: string;
    price: number;
    category: string;
    title: string;
    rating: number;
    stock: number; // Added stock property
}

const ProductsPage = () => {
    const [productList, setProductList] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortCriteria, setSortCriteria] = useState<string>('rating');
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);

    useEffect(() => {
        getProductList();
    }, []);

    useEffect(() => {
        filterAndSortProducts();
    }, [productList, selectedCategory, sortCriteria, inStockOnly]);

    const getProductList = async () => {
        const response = await fetchApi('products', 'GET');
        const data = await (await response).json();
        if (response.status === 200) {
            setProductList(data.products);
            setCategories([...new Set(data.products.map((p: Product) => p.category))]);
        } else {
            alert("Something went wrong");
        }
    }

    const filterAndSortProducts = () => {
        let products = [...productList];

        // Filter by category
        if (selectedCategory !== 'All') {
            products = products.filter(p => p.category === selectedCategory);
        }

        // Filter by stock
        if (inStockOnly) {
            products = products.filter(p => p.stock > 0);
        }

        // Sort by selected criteria
        products.sort((a, b) => {
            if (sortCriteria === 'rating') {
                return b.rating - a.rating;
            } else if (sortCriteria === 'price') {
                return a.price - b.price;
            }
            return 0;
        });

        setFilteredProducts(products);
    }

    const handlerAddToCart = () => {
        console.log("Add to Cart");
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="fixed mb-4 text-2xl font-semibold text-blue-900 underline">Product Page</h1>
            <div className="flex gap-4 mt-16">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="All">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <select
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="rating">Rating</option>
                    <option value="price">Price</option>
                </select>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 pt-5 sm:grid-cols-2 md:grid-cols-3">
                {filteredProducts.map((product) => (
                    <CardProduct key={product.id}>
                        <CardProduct.Header imgSource={product.thumbnail} />
                        <CardProduct.Body text={product.description} tittle={product.title} />
                        <CardProduct.Footer
                            price={product.price}
                            rating={product.rating}
                            variant="bg-green-800"
                            btnText={`Detail`}
                            onClickHandler={handlerAddToCart}
                        />
                    </CardProduct>
                ))}
            </div>
        </div>
    )
}

export default ProductsPage;
