/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Carts, ProductCart } from '@/constants/type/carts';
import Link from 'next/link';

interface CartProps {
    cart: Carts | null;
    loading: boolean;
}

const Cart: React.FC<CartProps> = ({ cart, loading }) => {
    const [cartList, setCartList] = useState<Carts | null>(cart);

    useEffect(() => {
        setCartList(cart);
    }, [cart]);

    const handleQuantityChange = (productId: number, change: number) => {
        setCartList((prevCart: Carts | null) => {
            if (!prevCart) return null;

            const updatedProducts = prevCart.products.map((product: ProductCart) => {
                if (product.id === productId) {
                    const newQuantity = product.quantity + change;
                    const updatedProduct = {
                        ...product,
                        quantity: Math.max(1, newQuantity),
                        total: product.price * Math.max(1, newQuantity),
                        discountedTotal: (product.price * Math.max(1, newQuantity)) * (1 - product.discountPercentage / 100),
                    };
                    return updatedProduct;
                }
                return product;
            });

            const { totalQuantity, total, discountedTotal } = calculateTotals(updatedProducts);
            return { ...prevCart, products: updatedProducts, totalQuantity, total, discountedTotal };
        });
    };

    const calculateTotals = (products: ProductCart[]) => {
        const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
        const total = products.reduce((acc, product) => acc + product.total, 0);
        const discountedTotal = products.reduce((acc, product) => acc + product.discountedTotal, 0);
        return { totalQuantity, total, discountedTotal };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-bold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen p-4">
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Your Cart</h1>
            <div className="w-full max-w-4xl">
                {cartList && cartList.products.length > 0 ? (
                    <ul className="space-y-4">
                        {cartList.products.map(product => (
                            <li key={product.id} className="flex items-center p-4 border border-gray-300 rounded-lg">
                                <Link href={`products/${product.id}`} passHref>
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="w-24 h-24 object-cover rounded-md mr-4 cursor-pointer"
                                    />
                                </Link>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold">{product.title}</h2>
                                    <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                                    <div className="flex items-center">
                                        <button onClick={() => handleQuantityChange(product.id, -1)} disabled={product.quantity <= 1} className="px-2 py-1 border border-gray-300 rounded-l-md">−</button>
                                        <span className="border border-gray-300 rounded-md px-3 py-1 mx-2">{product.quantity}</span>
                                        <button onClick={() => handleQuantityChange(product.id, 1)} className="px-2 py-1 border border-gray-300 rounded-r-md">+</button>
                                    </div>
                                    <p className="text-gray-600">Total: <span className="line-through">${product.total.toFixed(2)}</span></p>
                                    <p className="text-gray-800 font-semibold">Discounted Total: ${product.discountedTotal.toFixed(2)}</p>
                                    <p className="text-red-600 font-bold">Discount: {product.discountPercentage.toFixed(2)}%</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-lg font-semibold text-gray-500">Your cart is empty. Add some products!</p>
                )}
                <div className="mt-6 border-t pt-4 border-gray-300">
                    <p className="text-lg font-semibold">Total Products: {cartList?.totalProducts || 0}</p>
                    <p className="text-lg font-semibold">Total Quantity: {cartList?.totalQuantity || 0}</p>
                    {cartList && cartList.total > 0 ? (
                        <p className="text-lg text-gray-500 font-semibold">
                            <span className="line-through">Total: ${cartList.total.toFixed(2)}</span> 
                            <span className="text-red-600 font-bold"> Discounted Total: ${cartList.discountedTotal.toFixed(2)}</span>
                        </p>
                    ) : (
                        <p className="text-lg font-semibold">Total: $0.00</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;
