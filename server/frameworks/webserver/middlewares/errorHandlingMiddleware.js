export default function errorHandingMiddleware(err, req, res, next) {
    err.statusCode = err.statusCode || 404

    return err.customMessage || err.customMessage
        ? res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.customMessage || err.message
        })
        : res.status(err.statusCode).json({ status: err.statusCode, message: err });
}