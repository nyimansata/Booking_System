// const ErrorHandler = (err, req, res, next) => {
//   console.log(err);

//   if (err.name === "CastError") {
//     const message = `teacher not found with id of ${err.value}`;
//     console.log(`teacher not found with id of ${err.value}`);
//   }

//   res.status(404).send(err.message);
// };

// module.exports = ErrorHandler;

const ErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = ErrorHandler;
