import Link from 'next/link';
import React from 'react';

interface ErrorLayoutProps {
    statusCode: number;
    message: string;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ statusCode, message }) => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-24 text-center bg-white rounded-lg shadow-md">
                <h1 className="text-6xl font-bold text-red-500">{statusCode}</h1>
                <h2 className="mt-2 text-2xl font-semibold text-gray-800">Error</h2>
                <p className="mt-4 text-lg text-gray-600">{message}</p>
                <div className="mt-6">
                    <Link href="/">
                        <p className="text-blue-500 hover:underline">
                            Go back to Home
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorLayout;
