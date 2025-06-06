const erorrMiddleware = (err, req, res, next) => {
    try {
        let error = {...err};
        error.message = err.message
        console.log(err);

        //Mongoose bad ObjectId
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message);
            error.statusCode = 404;
        }
        //Mongoose duplicate key
        if (err.code === 11000) {
            const message = `Duplicate key value entered: ${err.keyValue.name}`;
            error = new Error(message);
            error.statusCode = 400;
        }
        //Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
        
    } catch (error) {
        next(error);
    }
}

export default erorrMiddleware;