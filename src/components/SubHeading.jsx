function SubHeading({label1, label2}){

    return(
        <div className="text-sm flex flex-col justify-center items-center -gap-1 text-slate-500">
            <div>
                {label1} 
            </div>
            <div>
                {label2}
            </div>
        </div>
    )
}

export default SubHeading