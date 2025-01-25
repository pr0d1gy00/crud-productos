import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailabity, updateProduct } from "./handlers/products"
import {body,param} from 'express-validator'
import { handleInputErrors } from "./middleware"
import server from "./server"

const router = Router()

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


router.get('/',	getProducts)
router.get('/:id',	
	param('id').isInt().withMessage('Id no valido'),
	handleInputErrors,
	getProductById)
router.put('/:id',
	body("name")
	.notEmpty()
	.withMessage("El producto debe contener un nombre"),
	body("price")
	.notEmpty()
	.withMessage("El precio no debe estar vacio")
	.isNumeric()
	.withMessage("El precio debe ser un numero")
	.custom((value) => value > 0)
	.withMessage("Precio no valido"),
	handleInputErrors,
	updateProduct
)
router.patch('/:id',
	handleInputErrors,
	updateAvailabity
)
router.post('/',

	body("name")
	.notEmpty()
	.withMessage("El producto debe contener un nombre"),
	body("price")
	.notEmpty()
	.withMessage("El precio no debe estar vacio")
	.isNumeric()
	.withMessage("El precio debe ser un numero")
	.custom((value) => value > 0)
	.withMessage("Precio no valido"),
	handleInputErrors,
	createProduct
)
router.delete('/:id',
	param('id').isInt().withMessage('Id no valido'),
	handleInputErrors,
	deleteProduct

)

export default router