const success = (res, data, statusCode = 200) => {
    res.status(statusCode).json(data);
};

const fail = (res, errors, statusCode = 400) => {
    res.status(statusCode).json({ errors });
};

module.exports = {
    success,
    fail,
};
