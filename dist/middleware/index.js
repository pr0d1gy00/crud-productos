"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputErrors = void 0;
const express_validator_1 = require("express-validator");
const handleInputErrors = (req, res, next) => {
    //validacion
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.availability === undefined) {
        req.body.availability = true;
    }
    next();
};
exports.handleInputErrors = handleInputErrors;
//# sourceMappingURL=index.js.map