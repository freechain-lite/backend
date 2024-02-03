import { Events, parseAndVerifyRequest } from '@nft/webhook';
import asyncHandler from "express-async-handler";
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export const homeHandler = (req: Request, res: Response) => {
    res.send('Hello, Welcome to Freechain!');
};


export const tradeCreated = asyncHandler(
    async (req: Request, res: Response) => {
        const { data } = await useData('TRADE_CREATED', req);
        // ...do something with the event
        const { buyer, seller} = data;

        const buyerAddress = buyer.address;
        const sellerAddress = seller.address;

        UserService.tradeCreated(buyerAddress, sellerAddress);
        res.status(200).send()
    }
);


export const offerCreated = asyncHandler(
    async (req: Request, res: Response) => {
        const { data } = await useData('OFFER_CREATED', req);
        // ...do something with the event
        const { maker, taker } = data;
        const address = maker.address;
        const takerAddress = taker?.address;
        UserService.offerCreated(address, takerAddress);
        res.status(200).send()
    }
);


export const bidCreated = asyncHandler(
    async (req: Request, res: Response) => {
        const { data } = await useData('BID_CREATED', req);
        // ...do something with the event
        const { maker } = data;
        const address = maker.address;
        UserService.bidCreated(address);
        res.status(200).send()
    }
);

export const accountCreated = asyncHandler(
    async (req: Request, res: Response) => {
        const { data } = await useData('ACCOUNT_CREATED', req);
        // ...do something with the event
        const { address, referrer } = data;
        if(referrer) {
            UserService.referUser(address, referrer.address);
        } else {
            UserService.checkIfUserExistsAndCreateIfUserDoesNotExist(address);
        }
        res.status(200).send()
    }
);



const useData = async <T extends keyof Events>(type: T, req: Request) => {
    const { data } = await parseAndVerifyRequest<T>(req, process.env.LITEFLOW_WEBHOOK_SECRET!);
    return { data };
}