import User from "../db/models/userModel";

export class UserService {
    static async createUser(address: string, points: number) {
        const newUser = new User({
            address,
            points
        });
        return await newUser.save();
    }

    static async checkIfUserExistsAndCreateIfUserDoesNotExist(address: string) {
        const user =  await User.findOne({
            address
        });
        if(!user) {
            return await this.createUser(address, 0);
        }
    }

    static async updateUser(address: string, points: number) {
        //get old points and add new points
        const oldPoints = (await User.findOne({ address }))?.points;

        const newPoints = oldPoints! + points;

        return await User.findOneAndUpdate({
            address
        }, {
            points: newPoints
        });
    }
}