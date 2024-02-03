import { Router } from "express";
import { homeHandler, tradeCreated, offerCreated, bidCreated } from "../controllers/webhookController";

const webhook: Router = Router();

webhook.get("", homeHandler);
webhook.post("/webhook/trade-created", tradeCreated);
webhook.post("/webhook/offer-created", offerCreated);
webhook.post("/webhook/bid-created", bidCreated);

export default webhook;
