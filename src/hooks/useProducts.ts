import { useEffect, useState } from "react";
import { fetchApi } from "@/utils/api";
import { Product } from "@/constants/type/product";
import { setProducts } from "@/redux/store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert from '@/components/fragments/CustomAlert';

const useProducts = () => {
	const user = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch();
    const [productList, setProductList] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortCriteria, setSortCriteria] = useState<string>('All');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            await getProductList();
            await getCategoryList();
        };
        fetchInitialData();
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
    };

    const getCategoryList = async () => {
        const response = await fetchApi('products/category-list', 'GET');
        const data = await (await response).json();
        if (response.status === 200) {
            setCategories(data);
        } else {
            alert("Something went wrong when getting category list");
        }
    };

    const handleSelectedCategory = async (category: string) => {
        if (category !== 'All') {
            const response = await fetchApi(`products/category/${category}`, 'GET');
            const data = await (await response).json();
            if (response.status === 200) {
                setProductList(data.products);
                dispatch(setProducts(data.products));
            } else {
                alert("Something went wrong when getting category list");
            }
        } else {
            await getProductList();
        }
    };

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
    };

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
    };

	const handleAddToCart = async (product: Product, quantity: number): Promise<void> => {
		let currentUser = user;
		if (!currentUser) {
			const storedUser = localStorage.getItem('User');
			currentUser = storedUser ? JSON.parse(storedUser) : null;
		}
	
		const body = {
			userId: currentUser?.id,
			products: [
				{
					id: product.id,
					quantity: quantity,
				},
			],
		};
	
		const response = await fetchApi(`carts/add`, 'POST', body);
		if (response.status === 200) {
			alert('Product added to cart successfully');
		} else {
            alert('Failed to add product to cart');
		}
	};

    const handleSelectedSort = async (sortCriteria: string, sortOrder: string) => {
        if (sortCriteria === "All") return;
        const response = await fetchApi(`products?sortBy=${sortCriteria}&order=${sortOrder}`, 'GET');
        const data = await response.json();
        
        if (response.status === 200) {
            setProductList(data.products);
            dispatch(setProducts(data.products));
        } else {
            alert("Something went wrong when getting category list");
        }
    };

    return {
        filteredProducts,
        categories,
        selectedCategory,
        sortCriteria,
        setSelectedCategory,
        setSortCriteria,
        sortOrder,
        setSortOrder,
        handleSearchProduct,
        handleSelectedCategory,
		handleAddToCart,
        handleSelectedSort,
        setProductList,
        productList,
    };
};

export default useProducts;
