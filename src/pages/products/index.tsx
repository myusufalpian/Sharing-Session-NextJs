import CardProduct from "@/components/layouts/Product";
import { useEffect, useState } from "react";
import { fetchApi } from "@/utils/api";
import Link from "next/link";
import { Product } from "@/constants/type/product";
import { setProducts } from "@/redux/store/productSlice";
import { useDispatch } from "react-redux";

const ProductsPage = () => {
    const dispatch = useDispatch();
    const [productList, setProductList] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortCriteria, setSortCriteria] = useState<string>('rating');
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        getProductList();
        getCategoryList();
    }, []);

    useEffect(() => {
        filterAndSortProducts();
    }, [productList, selectedCategory, sortCriteria, inStockOnly]);

    const getProductList = async () => {
        const response = await fetchApi('products', 'GET');
        const data = await (await response).json();
        if (response.status === 200) {
            setProductList(data.products);
            dispatch(setProducts(data.products));
        } else {
            alert("Something went wrong");
        }
    }

    const getCategoryList = async () => {
        const response = await fetchApi('products/category-list', 'GET');
        const data = await (await response).json();
        if (response.status === 200) {
            setCategories(data);
        } else {
            alert("Something went wrong when getting category list");
        }
    }

    const handleSelectedCategory = async (category: string) => {
        if (category !== 'All') {
            const response = await fetchApi(`products/category/${category}`, 'GET');
            const data = await (await response).json();
            if (response.status === 200) {
                setProductList(data.products);
                dispatch(setProducts(data.products)); // Update Redux state
            } else {
                alert("Something went wrong when getting category list");
            }
        } else {
            await getProductList();
        }
    }

    const handleSearchProduct = (searchValue: string) => {
        if (searchTimeout) clearTimeout(searchTimeout);

        const timeout = setTimeout(async () => {
            const response = await fetchApi(`products/search?q=${searchValue}`, 'GET');
            const data = await (await response).json();
            if (response.status === 200) {
                setProductList(data.products);
                dispatch(setProducts(data.products));
            } else {
                alert("Something went wrong when searching for products");
            }
        }, 1000);

        setSearchTimeout(timeout);
    }

    const filterAndSortProducts = () => {
        let products = [...productList];

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
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="p-2 border rounded" 
                    onChange={(e) => handleSearchProduct(e.target.value)}
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => handleSelectedCategory(e.target.value)}
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
                    <Link href={`/products/${product.id}`} key={product.id}>
                        <CardProduct key={product.id}>
                            <CardProduct.Header imgSource={product.thumbnail} />
                            <CardProduct.Body text={product.description} title={product.title} />
                            <CardProduct.Footer
                                price={product.price}
                                rating={product.rating}
                                variant="bg-green-800"
                                btnText={`Detail`}
                                onClickHandler={handlerAddToCart}
                            />
                        </CardProduct>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;
