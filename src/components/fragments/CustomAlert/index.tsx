import React from "react";

interface CustomAlertProps {
    message: string;
    onClose: () => void;
    type: "info" | "success" | "error";
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onClose, type }) => {
    const getAlertStyles = () => {
        switch (type) {
            case "success":
                return "bg-green-200 border-green-500 text-green-700";
            case "error":
                return "bg-red-200 border-red-500 text-red-700";
            case "info":
            default:
                return "bg-blue-200 border-blue-500 text-blue-700";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <div className={`border-l-4 p-5 rounded shadow-lg ${getAlertStyles()}`}>
                <p>{message}</p>
                <button onClick={onClose} className="mt-4 py-2 px-8 bg-blue-500 text-white rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;
