export default (controllerFunction) => (req, res, next) =>
  Promise.resolve(controllerFunction(req, res, next)).catch(next);

// if there is any error in controller function, catch that and pass that to the next.
// So in this way, if there is any error in this controller function, this catch async error will handle that.
