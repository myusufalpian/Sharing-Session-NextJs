import { ReactNode } from "react";

interface Props {
    children: ReactNode,
    htmlfor: string
}

const Label = (props: Props) : JSX.Element => {
    const {children, htmlfor} = props;
    return <label htmlFor={htmlfor} className="block mb-2 text-sm font-bold text-neutral-800">{children}</label>
}

export default Label;