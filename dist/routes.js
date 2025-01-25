"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("./handlers/products");
const express_validator_1 = require("express-validator");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
/**
 * 	@swagger
 * components:
 * 		schemas:
 * 			Product:
*				type:object
 * 				properties:
 * 					id:
 * 						type:integer
 * 						description:The product Id
 * 						example: 1
 * 					name:
 * 						type:string
 * 						description:The name product
 * 						example: monitor
 * 					price:
 * 						type:number
 * 						description:The product price
 * 						example:300
 * 					availability:
 * 						type:boolean
 * 						description:availability
 * 						example:true
 */
router.get('/', products_1.getProducts);
router.get('/:id', (0, express_validator_1.param)('id').isInt().withMessage('Id no valido'), middleware_1.handleInputErrors, products_1.getProductById);
router.put('/:id', (0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("El producto debe contener un nombre"), (0, express_validator_1.body)("price")
    .notEmpty()
    .withMessage("El precio no debe estar vacio")
    .isNumeric()
    .withMessage("El precio debe ser un numero")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"), middleware_1.handleInputErrors, products_1.updateProduct);
router.patch('/:id', middleware_1.handleInputErrors, products_1.updateAvailabity);
router.post('/', (0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("El producto debe contener un nombre"), (0, express_validator_1.body)("price")
    .notEmpty()
    .withMessage("El precio no debe estar vacio")
    .isNumeric()
    .withMessage("El precio debe ser un numero")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"), middleware_1.handleInputErrors, products_1.createProduct);
router.delete('/:id', (0, express_validator_1.param)('id').isInt().withMessage('Id no valido'), middleware_1.handleInputErrors, products_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=routes.js.map