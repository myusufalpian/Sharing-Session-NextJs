// pages/products/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/utils/api';
import { Product } from '@/constants/type/product';
import ProductDetail from '@/components/layouts/Product/Detail';
import ErrorLayout from '@/components/layouts/Error/index';
import { ErrorHandler } from '@/constants/type/errorType';

const ProductDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorHandler, setErrorHandler] = useState<ErrorHandler | null>(null);

    useEffect(() => {
        if (id) {
            getProductDetail(id as string);
        }
    }, [id]);

    const getProductDetail = async (productId: string) => {
        setLoading(true);
        setIsError(false);
        setErrorHandler(null);
        try {
            const response = await fetchApi(`products/${productId}`, 'GET');
            if (response.status === 200) {
                const data = await response.json();
                setProduct(data);
            } else {
                setErrorHandler({
                    statusCode: response.status,
                    message: 'Product not found',
                });
                setIsError(true);
            }
        } catch (error) {
            setErrorHandler({
                statusCode: 500,
                message: 'Failed to fetch product details',
            });
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {isError ? (
                <ErrorLayout
                    statusCode={errorHandler?.statusCode || 500}
                    message={errorHandler?.message || 'An unexpected error occurred'}
                />
            ) : (
                <ProductDetail product={product} loading={loading} />
            )}
        </>
    );
};

export default ProductDetailPage;
