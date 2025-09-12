import axios from "axios";
import { useState } from "react"
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import Button from "../components/Button";
import BottomWarning from "../components/ButtonWarning";

function Signup(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    return(
        <div className="bg-blue-100 w-full h-screen">
            <div className="flex justify-center items-center h-screen rounded-xl ">
                <div className="flex flex-col justify-center items-center gap-4 bg-white py-6 px-8 rounded-xl ">
                    <div className="flex flex-col justify-center items-center">
                        <Heading label={"Sign Up"}/>
                        <SubHeading label1="Enter your information to" label2={"create an account"}/>
                    </div>
                    <InputBox onChange={ e => {
                        setFirstName(e.target.value)
                    }} label={"First Name"} placeholder={"Enter First Name"}/>

                    <InputBox onChange={(e) =>{
                        setLastName(e.target.value)
                    }} label={"Last Name"} placeholder={"Enter Last Name"}/>
                    
                    <InputBox onChange={(e) => {
                        setUsername(e.target.value)
                    }} label={"Email"} placeholder={"Enter Email"}/>

                    <InputBox onChange={(e) =>{
                        setPassword(e.target.value)
                    }} label={"Password"} placeholder={"Enter Password"}/>

                    <div className="w-full">
                        <Button onClick={ async () =>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username: username,
                                firstName: firstName,
                                lastName: lastName,
                                password: password
                            })
                            localStorage.setItem("token", response.data.token)
                            navigate("/dashboard")
                        }} label={"Signup"} className="w-full"/>
                    </div>
                    <BottomWarning label={"Already have an account"} buttonText={"Sign in"} to={"/Signin"}/>
                </div>
            </div>
        </div>
    )
}

export default Signup