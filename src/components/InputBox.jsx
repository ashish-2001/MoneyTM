function InputBox({label, placeholder, onChange}){

    return(
        <div className="">
            <div>
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder} className="outline-none  border-1 border-slate-200 rounded-md p-1"/>
        </div>
    )
}

export default InputBox