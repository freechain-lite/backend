import express from "express";
import cors from "cors";
import "./db/index";
import webhook from "./routes/webhookRoute";
import errorHandler from "./utils/error.middleware";

const app = express();

app.use(cors());


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", webhook);
// Error Handler
app.use(errorHandler)