const asynchandaler = (requesthandaler) => {
  (req, res, next) => {
    Promise.resolve(requesthandaler(req, res, next)).catch((error) => next(error));
  };
};

export default asynchandaler;

// const asynchandaler = (fn) => ()=> {}
// const asynchandler = (fn) => () =>{}
// const asynchandler = (fn) => async() =>{}
// const asynchandler = (fn) => async(req, res ,next) =>{
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         next(error);
//     }
// }
