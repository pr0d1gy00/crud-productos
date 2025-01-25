import { Request,Response,NextFunction } from "express"
import { validationResult } from "express-validator";

export const handleInputErrors=(req:Request,res:Response,next:NextFunction)=>{
		//validacion
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		if (req.body.availability === undefined) {
			req.body.availability=true
		}
		next()
}