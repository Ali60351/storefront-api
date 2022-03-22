"use strict";
exports.__esModule = true;
exports.validateUser = void 0;
var validateUser = function (req, res, next) {
    var requiredFields = ['firstName', 'lastName', 'password'];
    if (requiredFields.some(function (field) { return !req.body[field]; })) {
        res.status(400);
        res.json({ requiredFields: requiredFields });
    }
    else {
        next();
    }
};
exports.validateUser = validateUser;
