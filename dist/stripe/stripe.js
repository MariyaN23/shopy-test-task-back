"use strict";
/*
import env from "dotenv";
import path from "path";
import cors from "cors";
// Replace if using a different env file or config.
env.config({path: "./.env"});
import bodyParser from "body-parser";
import express from "express";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
    appInfo: { // For sample support and debugging, not required for production:
        name: "stripe-samples/accept-a-payment",
        url: "https://github.com/stripe-samples",
        version: "0.0.2",
    },
    typescript: true,
});

const app = express();
const resolve = path.resolve;

app.use(express.static(process.env.STATIC_DIR as string));
app.use(
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void => {
        if (req.originalUrl === "/webhook") {
            next();
        } else {
            bodyParser.json()(req, res, next);
        }
    }
);
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void => {
        if (req.originalUrl === "/webhook") {
            next();
        } else {
            bodyParser.json()(req, res, next);
        }
    }
);
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get("/", (_: express.Request, res: express.Response): void => {
    // Serve checkout page.
    const indexPath = resolve(process.env.STATIC_DIR + "/index.html");
    res.sendFile(indexPath);
});

app.get("/config", (_: express.Request, res: express.Response): void => {
    // Serve checkout page.
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
});*/
