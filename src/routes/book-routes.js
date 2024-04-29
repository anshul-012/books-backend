import express from "express";
import { addBook, deleteBookById, getAllBooks, getBookById, updateById } from "../controllers/book-controller.js";
import upload from "../middlewares/multer-middleware.js";


const router = express.Router();


router.route("/").post(upload.single("image"),addBook);
router.route("/:bookId").get(getBookById).delete(deleteBookById).put(updateById);
router.route("/").get(getAllBooks);
export default router