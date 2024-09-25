import { ReactNode } from "react";
import Input from "./Input";
import Label from "./Label";

interface Option {
    value: string;
    label: string;
}

interface Props {
    children: ReactNode;
    htmlfor: string;
    type: string;
    placeholder?: string;
    name: string;
    id: string;
    value?: string;
    options?: Option[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = (props: Props): JSX.Element => {
    const { type, placeholder, name, id, children, value, options } = props;

    return (
        <div className="mb-6">
            <Label htmlfor={name}>{children}</Label>
            <Input 
                type={type} 
                placeholders={placeholder} 
                name={name} 
                id={id} 
                value={value} 
                options={options}
            />
        </div>
    );
}

export default InputForm;
