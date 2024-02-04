import User from "../db/models/userModel";

export class UserService {
    static async createUser(address: string, points: number = POINT_SYSTEM.NEW_USER) {
        const user = await User.create({
            address,
            points
        });
        return user;
    }

    static async checkIfUserExistsAndCreateIfUserDoesNotExist(address: string) {
        const user = await User.findOne({
            address
        });
        if (!user) {
            return await this.createUser(address);
        }
    }

    static async updateUser(address: string, points: number) {
        //get old points and add new points
        let user = (await User.findOne({ address }));
        if (!user) return this.createUser(address, points);

        const newPoints = user.points + points;

        return await User.findOneAndUpdate({
            address
        }, {
            points: newPoints
        });
    }

    static async referUser(address: string, referredAddress: string) {
        this.checkIfUserExistsAndCreateIfUserDoesNotExist(referredAddress);
        this.updateUser(address, POINT_SYSTEM.REFER_USER);
    }

    static async tradeCreated(buyerAddress: string, sellerAddress: string) {
        this.checkIfUserExistsAndCreateIfUserDoesNotExist(buyerAddress);
        this.checkIfUserExistsAndCreateIfUserDoesNotExist(sellerAddress);

        this.updateUser(buyerAddress, POINT_SYSTEM.TRADE_CREATED);
        this.updateUser(sellerAddress, POINT_SYSTEM.TRADE_CREATED);
    }

    static async offerCreated(address: string, takerAddress?: string) {
        this.checkIfUserExistsAndCreateIfUserDoesNotExist(address);
        this.updateUser(address, POINT_SYSTEM.OFFER_CREATED);

        if (takerAddress) {
            this.checkIfUserExistsAndCreateIfUserDoesNotExist(takerAddress);
            this.updateUser(takerAddress, POINT_SYSTEM.OFFER_CREATED);
        }
    }

    static async bidCreated(address: string, takerAddress?: string) {
        this.checkIfUserExistsAndCreateIfUserDoesNotExist(address);
        this.updateUser(address, POINT_SYSTEM.BID_CREATED);

        if (takerAddress) {
            this.checkIfUserExistsAndCreateIfUserDoesNotExist(takerAddress);
            this.updateUser(takerAddress, POINT_SYSTEM.BID_CREATED);
        }
    }
}

const POINT_SYSTEM = {
    REFER_USER: 20,
    NEW_USER: 10,
    TRADE_CREATED: 20,
    OFFER_CREATED: 5,
    BID_CREATED: 5,
}