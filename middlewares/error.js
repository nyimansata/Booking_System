const ErrorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.name === "CastError") {
    const message = `teacher not found with id of ${err.value}`;
    console.log(`teacher not found with id of ${err.value}`);
  }

  res.status(404).send(err.message);
};

module.exports = ErrorHandler;
