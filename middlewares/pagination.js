module.exports.pagination = async(req, res, next) => {
    try {
        const {query} = req;
        const limit = query.limit || 10;
        const pagination = {
            limit,
            offset: ((query.page - 1) * limit)

        }
        req.pagination = pagination;
        next();
    } catch (error) {
        next(error);
    }
}