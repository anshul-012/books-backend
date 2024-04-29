import express from "express";
import errorHandler from "./middlewares/error-handler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173"
}));

app.get("/", (req, res) => {
  res.send("Working fine ⚙ ");
});

//importing routes
import bookRouter from "./routes/book-routes.js";

app.use("/api/v1/books", bookRouter);

export default app;
app.use(errorHandler);
