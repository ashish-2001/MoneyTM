import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        minLength :6,
        maxLength: 50,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true,
        trim: true,
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    balance: {
        type: Number,
        required: true
    }

});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

export {
    User,
    Account
}