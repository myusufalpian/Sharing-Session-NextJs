import { ReactNode } from "react";
import Input from "./Input";
import Label from "./Label";

interface Props {
    children: ReactNode,
    htmlfor: string,
    type: string,
    placeholder: string,
    name: string,
    id: string
}

const InputForm = (props: Props) : JSX.Element => {
    const { type, placeholder, name, id, children } = props
    return(
        <div className="mb-6">
            <Label htmlfor={name}>{children}</Label>
            <Input type={type} placeholders={placeholder} name={name} id={id} />
        </div>
    )
}

export default InputForm;