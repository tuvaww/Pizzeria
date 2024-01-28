const translateValidationError = (errors) => {
    const { details } = errors;
    return details.map((detail) => {
        const { message, path } = detail;
        return { message, path: path[0] };
    });
};

const customError = (message, path) => {
    return [{ message, path }];
};

module.exports = {
    translateValidationError,
    customError,
};
