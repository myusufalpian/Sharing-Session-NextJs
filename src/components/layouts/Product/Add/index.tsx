import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchApi } from "@/utils/api";
import InputForm from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { addProduct } from '@/redux/store/postDataProductSlice';
import { RootState } from '@/redux/store/store';

const AddProductLayout = () : JSX.Element => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.postProduct);
    
    const [categoryList, setCategoryList] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        image: '',
        brand: '',
        price: '',
        stocks: '',
        warrantyNumber: '',
        warrantyType: 'days',
    });
    const [isConfirming, setIsConfirming] = useState(false);

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        const response = await fetchApi('products/category-list', 'GET');
        const data = await response.json();
        if (data.status === 200) {
            setCategoryList(data);
            console.log("data category: ",categoryList);
        }
    }

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsConfirming(true);
    };

    const handleCancel = () => {
        setIsConfirming(false);
    };

    const handleConfirm = () => {
        dispatch(addProduct({ productData: formData }))
            .unwrap()
            .then(() => {
                alert("Product added successfully");
            })
            .catch((error: Error) => {
                alert(`Failed to add product: ${error.message}`);
            })
            .finally(() => {
                setIsConfirming(false);
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center underline text-blue-950">Add Product</h1>
            <form onSubmit={handleSubmit}>
            <InputForm
                    htmlfor="title"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter product title"
                    value={formData.title}
                    onChange={handleInputChange}
                >
                    Title
                </InputForm>

                <InputForm
                    htmlfor="category"
                    type="option"
                    name="category"
                    id="category"
                    value={formData.category}
                    options={categoryList.map(cat => ({ value: cat, label: cat }))}
                >
                    Category
                </InputForm>

                <InputForm
                    htmlfor="description"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleInputChange}
                >
                    Description
                </InputForm>

                <InputForm
                    htmlfor="image"
                    type="text"
                    name="image"
                    id="image"
                    placeholder="Enter image URL"
                    value={formData.image}
                    onChange={handleInputChange}
                >
                    Image Link
                </InputForm>

                <InputForm
                    htmlfor="brand"
                    type="text"
                    name="brand"
                    id="brand"
                    placeholder="Enter brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                >
                    Brand
                </InputForm>

                <InputForm
                    htmlfor="price"
                    type="text"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleInputChange}
                >
                    Price
                </InputForm>

                <InputForm
                    htmlfor="stocks"
                    type="text"
                    name="stocks"
                    id="stocks"
                    placeholder="Enter stock quantity"
                    value={formData.stocks}
                    onChange={handleInputChange}
                >
                    Stocks
                </InputForm>

                <div className="mb-6">
                    <InputForm
                        htmlfor="warrantyNumber"
                        type="text"
                        name="warrantyNumber"
                        id="warrantyNumber"
                        placeholder="Enter warranty duration"
                        value={formData.warrantyNumber}
                        onChange={handleInputChange}
                    >
                        Warranty Number
                    </InputForm>
                    <InputForm
                        htmlfor="warrantyType"
                        type="option"
                        name="warrantyType"
                        id="warrantyType"
                        value={formData.warrantyType}
                        options={[
                            { value: 'days', label: 'Days' },
                            { value: 'months', label: 'Months' },
                            { value: 'years', label: 'Years' }
                        ]}
                    >
                        Warranty Type
                    </InputForm>
                </div>
                <Button variant="bg-green-500" text="text-white" classname="w-full">Add Product</Button>
            </form>

            {isConfirming && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 bg-white rounded shadow-md">
                        <h2 className="text-lg font-bold">Confirm Product Addition</h2>
                        <p>Are you sure you want to add this product?</p>
                        <div className="flex justify-end mt-4">
                            <Button 
                                variant="bg-red-500" 
                                onClick={handleCancel} 
                                classname="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="bg-green-500" 
                                onClick={handleConfirm}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddProductLayout;
