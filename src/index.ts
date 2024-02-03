import express from "express";
import cors from "cors";
import "./db/index";
import webhook from "./routes/webhookRoute";
import errorHandler from "./utils/error.middleware";

const app = express();

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:3000",
  preflightContinue: false,
};

app.use(cors(options));


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", webhook);
// Error Handler
app.use(errorHandler)