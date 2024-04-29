import asyncHandler from "../utils/async-error-handler.js";
import ApiError from "../utils/api-error.js";
import Book from "../models/book-model.js";
import ApiResponse from "../utils/api-response.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

export const addBook = asyncHandler(async (req, res, next) => {
  const { name, author, description, price } = req.body;

  if (!name || !author || !description || !price) {
    return next(new ApiError(400, "All fields are required !"));
  }

  const image = req.file.path;

  const uploadedImage = await uploadOnCloudinary(image);

  const book = await Book.create({
    name,
    author,
    image: {
      url: uploadedImage.url,
      public_id: uploadedImage.public_id,
    },
    description,
    price,
  });

  return res.json(new ApiResponse(book, "Your Book is upload on Store"));
});

export const getAllBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find();

  return res.json(new ApiResponse(books, "All Books"));
});

export const getBookById = asyncHandler(async (req, res, next) => {
  const { bookId } = req.params;

  if (!bookId) {
    return next(new ApiError(400, "Book Id is required !"));
  }
  try {
    const book = await Book.findOne({ _id: bookId });

    res.status(200).json(new ApiResponse(book, "You book"));
  } catch (error) {
    return next(new ApiError(400, "Wrong Book Id"));
  }
});

export const deleteBookById = asyncHandler(async (req, res, next) => {
  const { bookId } = req.params;

  if (!bookId) {
    return next(new ApiError(400, "BookId is required !"));
  }

  const book = await Book.findOneAndDelete({ _id: bookId });

  await deleteOnCloudinary(book.image.public_id);

  res.status(200).json(new ApiResponse({}, "Book is deleted now !"));
});

export const updateById = asyncHandler(async (req, res, next) => {
  const { bookId } = req.params;

  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    return next(new ApiError(400, "All fields are Required !"));
  }

  if (!bookId) {
    return next(new ApiError(400, "book Id are Required !"));
  }

  const book = await Book.findByIdAndUpdate(
    bookId,
    {
      name,
      price,
      description,
    },
    { new: true }
  );

  res.status(200).json(new ApiResponse(book, "your book is updated Now !"));
});
