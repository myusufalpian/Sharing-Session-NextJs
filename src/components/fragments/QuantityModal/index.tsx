import React, { useState } from "react";

interface QuantityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (quantity: number) => void;
}

const QuantityModal: React.FC<QuantityModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [quantity, setQuantity] = useState(1);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(quantity);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="mb-4">Select Quantity</h2>
                <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border p-2 rounded w-full"
                />
                <div className="flex justify-between mt-4">
                    <button onClick={onClose} className="p-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleConfirm} className="p-2 bg-blue-500 text-white rounded">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default QuantityModal;
