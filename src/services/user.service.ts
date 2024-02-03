import User from "../db/models/userModel";

export class UserService {
    static async createUser(address: string, points: number) {
        const user = await User.create({
            address,
            points
        });
    }

    static async checkIfUserExistsAndCreateIfUserDoesNotExist(address: string) {
        const user = await User.findOne({
            address
        });
        if (!user) {
            return await this.createUser(address, 10);
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

    static async referUser(address: string, referredAddress: string) {
        this.checkIfUserExistsAndCreateIfUserDoesNotExist(referredAddress);
        this.updateUser(address, 20);
    }

    static async tradeCreated(buyerAddress: string, sellerAddress: string) {
        this.checkIfUserExistsAndCreateIfUserDoesNotExist(buyerAddress);
        this.checkIfUserExistsAndCreateIfUserDoesNotExist(sellerAddress);

        this.updateUser(buyerAddress, 20);
        this.updateUser(sellerAddress, 20);
    }

    static async offerCreated(address: string, takerAddress?: string) {
        this.checkIfUserExistsAndCreateIfUserDoesNotExist(address);
        this.updateUser(address, 5);

        if (takerAddress) {
            this.checkIfUserExistsAndCreateIfUserDoesNotExist(takerAddress);
            this.updateUser(takerAddress, 5);
        }
    }

    static async bidCreated(address: string, takerAddress?: string) {
        this.checkIfUserExistsAndCreateIfUserDoesNotExist(address);
        this.updateUser(address, 5);

        if (takerAddress) {
            this.checkIfUserExistsAndCreateIfUserDoesNotExist(takerAddress);
            this.updateUser(takerAddress, 5);
        }
    }
}