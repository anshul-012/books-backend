// const errorHandler = async(err, req, res, next)=>{

//     err.message = err.message || "something wrong in server";
//     err.statusCode = err.statusCode || 500;
//     res.status(err.statusCode).json({
//         message:err.message,
//         success:err.success
//     })
// }

// export default errorHandler;

const errorHandler = (err, req, res, next) => {
    (err.statusCode = err.statusCode || 500),
    (err.message = err.message || "Something Went wrong");
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
export default errorHandler;
