const errorHandlerMiddleware = (err, req, res, next) => {
    !err ? res.status(409).json({ message: 'conflict' })
        : res.status(500).json({ error: -1, description: `${err.code} - Route ${err.route}, method ${err.method} not authorized` })
}

export default errorHandlerMiddleware;