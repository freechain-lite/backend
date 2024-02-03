import { Events, parseAndVerifyRequest } from '@nft/webhook';
import asyncHandler from "express-async-handler";
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export const homeHandler = (req: Request, res: Response) => {
    res.send('Hello, Welcome to Freechain!');
};


export const tradeCreated = asyncHandler(
    async (req: Request, res: Response) => {
        const { data, timestamp, type } = await useData('TRADE_CREATED', req);
        // ...do something with the event

        const { buyer, seller, offer, unitPrice, quantity, currency } = data;

        const buyerAddress = buyer.address;
        const sellerAddress = seller.address;

        UserService.checkIfUserExistsAndCreateIfUserDoesNotExist(buyerAddress);
        UserService.checkIfUserExistsAndCreateIfUserDoesNotExist(sellerAddress);

        res.status(200).send()
    }
);


export const offerCreated = asyncHandler(
    async (req: Request, res: Response) => {
        const { data, timestamp, type } = await useData('OFFER_CREATED', req);
        // ...do something with the event
        console.log(data);

        res.status(200).send()
    }
);


export const bidCreated = asyncHandler(
    async (req: Request, res: Response) => {
        const { data, timestamp, type } = await useData('BID_CREATED', req);
        // ...do something with the event

        res.status(200).send()
    }
);



const useData = async <T extends keyof Events>(type: T, req: Request) => {
    const { data, timestamp } = await parseAndVerifyRequest<T>(req, process.env.LITEFLOW_WEBHOOK_SECRET!);
    return { data, timestamp, type };
}