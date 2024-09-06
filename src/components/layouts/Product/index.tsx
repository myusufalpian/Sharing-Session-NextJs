import { ReactNode } from "react"
import Button from "@/components/elements/Button"

interface Props {
    children?: ReactNode
    className?: string
    onClickHandler?: () => void
    variant?: string
    text?: string
    tittle?: string
    imgSource?: string
    btnText?: string
    price?: number
    rating?: number
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
    const { imgSource } = props;
    return (
        <a href="">
            <img src={imgSource} alt="Dad Shoes" className="p-5 rounded-t-lg" />
        </a>
    )
}

const Body = ( props: Props) : JSX.Element => {
    const { tittle, text } = props;
    return (
        <div className="h-full px-5 pb-4">
            <h5 className="pb-4 text-xl font-semibold tracking-tight text-white">{tittle}</h5>
            <p className="font-normal text-white text-s">{text}</p>
        </div>
    )
}

const Footer = (props: Props) => {
    const { btnText, variant = '', onClickHandler, price, rating } = props;
    return (
        <div className="flex items-center justify-between p-4"> 
            <div className="text-xl font-bold text-white">{`Rp. ${price?.toLocaleString('id-ID')},00`}</div>
            <div className="text-xl font-bold text-white">{`* ${rating}`}</div>
            {/* <Button variant = {variant} text='text-white' children={btnText} classname = 'my-5 mr-5' onClick={() => onClickHandler} /> */}
        </div>
    )
}

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;
export default CardProduct;