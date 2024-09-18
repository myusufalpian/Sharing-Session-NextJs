/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Carts as CartType } from '@/constants/type/carts';
import Link from 'next/link';

interface CartProps {
    cart: CartType | null;
    loading: boolean;
}

const Cart: React.FC<CartProps> = ({ cart, loading }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }

	if (!cart) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-lg font-semibold">No cart data available</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center min-h-screen p-4">
			<h1 className="text-3xl font-bold text-blue-500 mb-4">Your Cart</h1>
			
			<div className="w-full max-w-4xl">
				{cart.products && cart.products.length > 0 ? (
				<>
					<ul className="space-y-4">
						{cart.products.map(product => (
							<Link href={`products/${product.id}`} key={product.id} passHref> 
								<li key={product.id} className="flex items-center p-4 border border-gray-300 rounded-lg">
									<img
										src={product.thumbnail}
										alt={product.title}
										className="w-24 h-24 object-cover rounded-md mr-4"
									/>
									<div className="flex-1">
										<h2 className="text-xl font-semibold">{product.title}</h2>
										<p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
										<p className="text-gray-600">Quantity: {product.quantity}</p>
										<p className="text-gray-600">Total: ${product.total.toFixed(2)}</p>
										<p className="text-gray-600">Discount: {product.discountPercentage.toFixed(2)}%</p>
										<p className="text-gray-600">Discounted Total: ${product.discountedTotal.toFixed(2)}</p>
									</div>
								</li>
							</Link>
						))}
					</ul>
					
					<div className="mt-6 border-t pt-4 border-gray-300">
						<p className="text-lg font-semibold">Total Products: {cart.totalProducts}</p>
						<p className="text-lg font-semibold">Total Quantity: {cart.totalQuantity}</p>
						<p className="text-lg font-semibold">Total: ${cart.total.toFixed(2)}</p>
						<p className="text-lg font-semibold">Discounted Total: ${cart.discountedTotal.toFixed(2)}</p>
					</div>
				</>
				) : (
					<p className="text-lg font-semibold">Your cart is empty.</p>
				)}
			</div>
		</div>
	);
}

export default Cart;