import { User } from "../../backend/db";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";

function Dashboard(){

    return(
        <div>
            <Appbar/>
            <div>
                <Balance value={"10,000 rs."}/>
                <User/>
            </div>
        </div>
    )
}

export default Dashboard