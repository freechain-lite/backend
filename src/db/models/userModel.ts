import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        address: {
            type: String,
            required: [true, "Please add an address"],
        },
        points: {
            type: Number,
            default: 0,
            required: [true, "Please add points"],
        },
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

export default User;