// components/ProductLayout.tsx

import React from 'react';
import { Product } from '@/constants/type/product';

interface ProductLayoutProps {
    product: Product | null;
    loading: boolean;
}

const ProductDetail: React.FC<ProductLayoutProps> = ({ product, loading }) => {
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!product) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold">Product Not Found</h2>
                <p>The product you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl p-4 mx-auto">
            <div className="flex flex-col md:flex-row">
                <div className="fixed w-64 top-16 md:w-80 lg:w-96">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
                <div className="pl-20 mt-5 md:w-1/2 md:pl-8 ml-96">
                    <h1 className="mb-2 text-4xl font-bold text-gray-800">{product.title}</h1>
                    <p className="mb-4 text-lg text-gray-600">{product.description}</p>
                    <p className="mb-2 text-xl font-semibold text-gray-800">Price: ${product.price.toFixed(2)}</p>
                    <p className="mb-4 text-lg text-red-600">Discount: {product.discountPercentage}%</p>
                    <p className="mb-4 text-lg text-gray-600">Rating: {product.rating.toFixed(1)}</p>
                    <p className="mb-4 text-lg text-gray-600">Stock: {product.stock}</p>
                    <p className="mb-4 text-lg text-gray-600">Brand: {product.brand}</p>
                    <p className="mb-4 text-lg text-gray-600">SKU: {product.sku}</p>
                    <p className="mb-4 text-lg text-gray-600">Weight: {product.weight} kg</p>
                    <p className="mb-4 text-lg text-gray-600">Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
                    <p className="mb-4 text-lg text-gray-600">Warranty: {product.warrantyInformation}</p>
                    <p className="mb-4 text-lg text-gray-600">Shipping: {product.shippingInformation}</p>
                    <p className="mb-4 text-lg text-gray-600">Availability: {product.availabilityStatus}</p>
                    <p className="mb-4 text-lg text-gray-600">Return Policy: {product.returnPolicy}</p>
                    <p className="mb-4 text-lg text-gray-600">Minimum Order Quantity: {product.minimumOrderQuantity}</p>
                    <div className="mt-4">
                        <h2 className="mb-2 text-2xl font-semibold text-gray-800">Tags</h2>
                        <ul className="pl-5 text-gray-600 list-disc">
                            {product.tags.map(tag => (
                                <li key={tag}>{tag}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h2 className="mb-2 text-2xl font-semibold text-gray-800">Reviews</h2>
                        {product.reviews.length > 0 ? (
                            <ul className="space-y-4">
                                {product.reviews.map((review, index) => (
                                    <li key={index} className="p-4 border rounded-lg shadow-sm">
                                        <p className="text-lg font-semibold text-gray-800">{review.reviewerName}</p>
                                        <p className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</p>
                                        <p className="text-gray-600 text-md">Rating: {review.rating}</p>
                                        <p className="mt-2 text-gray-600 text-md">{review.comment}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No reviews available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
