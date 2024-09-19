/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-children-prop */
import { ReactNode } from "react"
import Button from "@/components/elements/Button"

interface Props {
    children?: ReactNode
    className?: string
    onClickHandler?: (e: React.MouseEvent) => void
    variant?: string
    text?: string
    title?: string
    imgSource?: string
    btnText?: string
    price?: number
    rating?: number
    alt?: string
}

const CardProduct = (props: Props) => {
    const { children } = props;
    return (
        <div className="flex flex-col justify-between w-full max-w-sm m-8 bg-gray-800 border border-gray-800 rounded-lg shadow ">
            {children}
        </div>
    )

}

const Header = (props: Props) => {
    const { imgSource, alt } = props;
    return <img src={imgSource} alt={alt} className="p-5 rounded-t-lg" />
}

const Body = ( props: Props) : JSX.Element => {
    const { title, text } = props;
    return (
        <div className="h-full px-5 pb-4">
            <h5 className="pb-4 text-xl font-semibold tracking-tight text-white">{title}</h5>
            <p className="font-normal text-white text-s">{text}</p>
        </div>
    )
}

const Footer = (props: Props) => {
    const { btnText, variant = '', onClickHandler, price, rating } = props;
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onClickHandler) {
            onClickHandler(e);
        }
    };
    return (
        <div className="flex items-center justify-between p-4"> 
            <div className="text-xl font-bold text-white">{`$ ${price?.toLocaleString('id-ID')}`}</div>
            <div className="text-xl font-bold text-white">{`* ${rating}`}</div>
            <Button 
                variant={variant} 
                text='text-white' 
                children={btnText} 
                classname='my-5 mr-5' 
                onClick={handleClick}
            />
        </div>
    );
}

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;
export default CardProduct;