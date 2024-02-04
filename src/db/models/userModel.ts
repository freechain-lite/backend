import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        address: {
            type: String,
            unique: true,
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
        collection: "freechain",
    },
);

const User = model("User", userSchema);

export default User;