import express from "express";
import { z } from "zod";
import { User, Account } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config";
import authMiddleware from "../middleware";

const router = express.Router();

//*************************************************************************************//
                                    // SignUp Section//
//***************************************************************************************//                                    

const signupValidator = z.object({
    username: z.string().username(),
    password: z.string().password(),
    firstName: z.string().firstName(),
    lastName: z.string().lastName()
});

router.post("/signup", async(req, res) =>{
    
    try{
            const { success } = signupValidator.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message: "Incorrect input"
            });
        }

        const { username, password, firstName, lastName } = req.body;

        const existingUser = await User.findOne({
            username
        })

        if(existingUser){
            return res.status(411).json({
                message: "User already exists!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        })

        const userId = user._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 1000
        });

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        return res.json({
            message: "User Created Successfully",
            token: token
        })
    }
    catch(e){
        console.log(e.message);
        res.status(500).json({
            message: "Interval Server Error!"
        })
    }

})

//*************************************************************************************//
                                    // SignIn Section//
//***************************************************************************************//                                    


const signinValidator = z.object({
    username: z.string().username(),
    password: z.string().password()
})

router.post("/signin", async(req, res)=>{

    try{
        const { success } = signinValidator.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message: "Incorrect input!"
            })
        }

        const { username, password } = req.body;

        const user = await User.findOne({
            username
        })

        if(!user){
            return res.status(400).json({
                message: "User doesn't exist signup first!"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                message: "Incorrect username or password"
            })
        }

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        return res.status(200).json({
            message: "Signed in successfully!",
            token: token
        })
    }
    catch(e){
        console.log(e.message);
        res.status(500).json({
            message: "Interval Server Error"
        })
    }
})

//*************************************************************************************//
                                    // Update Section //
//***************************************************************************************//                                    


const updateValidator = z.object({
    password: z.string().password(),
    firstName: z.string().firstName(),
    lastName: z.string().lastName()
})

router.put("/", authMiddleware, async(req, res) =>{
    try{
        
        const { success } = updateValidator.safeParse(req.body);

        if(!success){
            res.status(411).json({
                message: "Incorrect input!"
            })
        }

        await User.updateOne({
            id: req.userId
        })

        res.json({
            message: "Credentials Updated Successfully!"
        })

    }
    catch(e){

        console.log(e.message);
        res.status(500).json({
            message: "Interval Server Error"
        })

    }
})

//*************************************************************************************//
                                    // Fetching Section OR Searching Names //
//***************************************************************************************//  

router.get("/bulk", async (req, res)=>{

    const filter = req.body.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                $regex: filter
            }
        }, {
            lastName: {
                $regex: filter
            }
        }]
    })

    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})