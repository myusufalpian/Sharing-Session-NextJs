import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    variant?: string;
    text?: string;
    classname?: string;
    onClick?: (e: React.MouseEvent) => void;
}

const Button = ({ 
    children = "Submit", 
    variant = "bg-neutral-700", 
    text = "text-white", 
    classname = "",
    onClick = (e) => {},
}: Props): JSX.Element => {
    return (
        <button 
            className={`h-10 px-6 rounded-md ${variant} ${text} drop-shadow-md ${classname}`} 
            type='submit'
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
