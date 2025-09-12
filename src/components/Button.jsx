function Button({label, onClick}){

    return(
        <div className="bg-black text-white w-full font-bold rounded-lg py-1 flex justify-center">
            <button onClick={onClick} type="button">{label}</button>
        </div>
    )
}

export default Button;