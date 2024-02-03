import { Router } from "express";
import { homeHandler, tradeCreated, offerCreated, bidCreated, accountCreated } from "../controllers/webhookController";

const webhook: Router = Router();

webhook.get("", homeHandler);
webhook.post("/webhook/trade-created", tradeCreated);
webhook.post("/webhook/offer-created", offerCreated);
webhook.post("/webhook/bid-created", bidCreated);
webhook.post("/webhook/account-created", accountCreated);

export default webhook;
