import CustomError from "../utils/CustomError.js"

const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stack: error.stack,
        error: error,
    })
}


const productionErrors = (res, error) => {
    if(error.isOperational) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    } else {
        res.status(500).json({
            status: error,
            message: 'something wrong happened please try later'
        })
    }
}



const errorhandler = (error, req, res, next) => {

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    

    if(process.env.NODE_ENV === 'development') {
        devErrors(res, error);
    } else if (process.env.NODE_ENV === 'production') {
        productionErrors(res, error);
    }
}
export default errorhandler;