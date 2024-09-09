import Cart from "@/components/layouts/Cart";
import ErrorLayout from "@/components/layouts/Error";
import { Carts } from "@/constants/type/carts";
import { ErrorHandler } from "@/constants/type/errorType";
import { fetchApi } from "@/utils/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cartList, setCartList] = useState<Carts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorHandler, setErrorHandler] = useState<ErrorHandler | null>(null);

  const getCartData = async () => {
    setLoading(true);
    setIsError(false);
    setErrorHandler(null);

    let currentUser = user;
    if (!currentUser) {
      const storedUser = localStorage.getItem('User');
      currentUser = storedUser ? JSON.parse(storedUser) : null;
    }

    if (currentUser) {
      const response = await fetchApi(`carts/${currentUser.id}`, 'GET');
      if (response.status === 200) {
        const data = await response.json();
        setCartList(data);
      } else {
        setErrorHandler({
          statusCode: response.status,
          message: response.message,
        });
        setIsError(true);
      }
    } else {
      setIsError(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
      {isError ? (
        <ErrorLayout
          statusCode={errorHandler?.statusCode || 500}
          message={errorHandler?.message || 'An unexpected error occurred'}
        />
      ) : (
        <Cart cart={cartList} loading={loading} />
      )}
    </>
  );
}

export default CartPage;