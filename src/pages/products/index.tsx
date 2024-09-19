import { useState } from "react";
import useProducts from "@/hooks/useProducts";
import CustomAlert from "@/components/fragments/CustomAlert";
import QuantityModal from "@/components/fragments/QuantityModal";
import { Product } from "@/constants/type/product";
import CardProduct from "@/components/layouts/Product";
import Link from "next/link";
import { fetchApi } from "@/utils/api";
import { useSelector } from "react-redux";

const ProductsPage = () => {
    const {
        filteredProducts,
        categories,
        selectedCategory,
        sortCriteria,
        setSelectedCategory,
        setSortCriteria,
        handleSearchProduct,
    } = useProducts();

    const user = useSelector((state: any) => state.auth.user);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<"info" | "success" | "error">("info");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleFetchError = (message: string) => {
        setAlertMessage(message);
        setAlertType("error");
    };

    const handleFetchSuccess = (message: string) => {
        setAlertMessage(message);
        setAlertType("success");
    };

    const handleCloseAlert = () => {
        setAlertMessage(null);
    };

    const handleOpenQuantityModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const addProductToCart = async (product: Product, quantity: number) => {
        let currentUser = user;
        if (!currentUser) {
            const storedUser = localStorage.getItem('User');
            currentUser = storedUser ? JSON.parse(storedUser) : null;
        }
        
        const body = {
            userId: currentUser?.id,
            products: [{ id: product.id, quantity }] // Send quantity along with product ID
        };
    
        const response = await fetchApi(`carts/add`, 'POST', body);
        if (!response.ok) {
            throw new Error("Failed to add product to cart.");
        }
    };
    
    const handleAddToCart = async (quantity: number) => {
        if (selectedProduct) {
            try {
                await addProductToCart(selectedProduct, quantity);
                handleFetchSuccess("Product added to cart successfully!");
            } catch (error) {
                handleFetchError("Failed to add product to cart.");
            } finally {
                setIsModalOpen(false);
                setSelectedProduct(null);
            }
        }
    };

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
                        <Link href={`/products/${product.id}`}>
                            <CardProduct.Header imgSource={product.thumbnail} />
                            <CardProduct.Body text={product.description} title={product.title} />
                        </Link>
                        <CardProduct.Footer
                            price={product.price}
                            rating={product.rating}
                            variant="bg-green-800"
                            btnText={`Add to Cart`}
                            onClickHandler={(e) => {
                                e.stopPropagation();
                                handleOpenQuantityModal(product);
                            }}
                        />
                    </CardProduct>
                ))}
            </div>

            {alertMessage && (
                <CustomAlert message={alertMessage} onClose={handleCloseAlert} type={alertType} />
            )}
            <QuantityModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={(quantity) => handleAddToCart(quantity)} // Pass the quantity to handleAddToCart
            />
        </div>
    );
};

export default ProductsPage;
