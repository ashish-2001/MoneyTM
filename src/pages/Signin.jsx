import Button from "../components/Button"
import BottomWarning from "../components/ButtonWarning"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"

function Signin(){

    return(
        <div className="bg-blue-100 w-full h-screen">
            <div className="flex justify-center items-center h-screen">
                <div className=" flex flex-col justify-center items-center gap-3 bg-white p-8 rounded-xl ">
                    <Heading label={"Sign In"}/>
                    <SubHeading label={"Sign In Page"}/>
                    <InputBox placeholder={"Enter Email"} label={"Email"}/>
                    <InputBox placeholder={"Enter Password"} label={"Password"}/>
                    <div className="w-full flex">
                        <Button label={"Sign In"}/>
                    </div>
                    <BottomWarning label={"Don't have an account"} buttonText={"Sign up"} to={"/Signup"}/>
                </div>
            </div>
        </div>
    )
}

export default Signin