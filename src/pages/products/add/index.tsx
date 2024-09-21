import { useEffect, useState } from "react";
import { fetchApi } from "@/utils/api";

const AddProduct = () => {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        const data = await fetchApi('products/category-list', 'GET');
        if (data.status === 200) {
            setCategoryList(data);
        }
    }
    return (
        <>
            <h1 className="text-2xl font-bold text-center underline text-blue-950">Add Product</h1>
        </>
    )
}

export default AddProduct;