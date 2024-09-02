interface Props {
    type: string,
    placeholders: string,
    name: string,
    id: string,
}

const Input = (props: Props) : JSX.Element => {
    const {type = 'text', placeholders, name, id} = props;
    return <input type={type} name={name} id={id} className='w-full px-3 py-2 text-sm border rounded  text-neutral-800 bg-slate-200 focus:outline-none placeholder:' placeholder={placeholders}/>
}

export default Input;