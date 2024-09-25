interface Option {
    value: string;
    label: string;
}

interface Props {
    type: string;
    placeholders?: string;
    name: string;
    id: string;
    value?: string;
    options?: Option[];
}

const Input = (props: Props): JSX.Element => {
    const { type = 'text', placeholders, name, id, value, options } = props;

    if (type === 'option' && options) {
        return (
            <select name={name} id={id} value={value} className='w-full px-3 py-2 text-sm border rounded text-neutral-800 bg-slate-200 focus:outline-none'>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <input
            type={type}
            name={name}
            id={id}
            value={value}
            className='w-full px-3 py-2 text-sm border rounded text-neutral-800 bg-slate-200 focus:outline-none'
            placeholder={placeholders}
        />
    );
};

export default Input;
