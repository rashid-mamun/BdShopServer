const successResponse = (res, data = null, message = 'Success', status = 200) => {
    res.status(status).json({ success: true, message, data });
};

const errorResponse = (res, message = 'Internal Server Error', status = 500) => {
    res.status(status).json({ success: false, message });
};

module.exports = { successResponse, errorResponse };