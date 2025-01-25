import { request, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Product from "../models/Product.model";

export const getProducts=async(req:Request,res:Response)=>{
	try {
		const products = await Product.findAll()
		res.json({data:products})
	} catch (error) {
		console.log(error)
	}
}
export const getProductById=async(req:Request,res:Response)=>{
	try {
		const { id}=req.params
		const product = await Product.findByPk(id)

		if(!product){
			return res.status(400).json({
				error:'Producto no encontrado'
			})
		}
		res.json({data:product})
	} catch (error) {
		console.log(error)
	}
}
export const updateProduct=async (req:Request,res:Response) => {
	const { id}=req.params
	const product = await Product.findByPk(id)

	if(!product){
		return res.status(404).json({
			error:'Producto no encontrado'
		})
	}
	console.log(req.body)
	await product.update(req.body)
	await product.save()
	
	res.json({data:product})
}
export const updateAvailabity=async (req:Request,res:Response) => {
	const { id}=req.params
	const product = await Product.findByPk(id)

	if(!product){
		return res.status(404).json({
			error:'Producto no encontrado'
		})
	}
	product.availability = !product.dataValues.availability
	await product.save()
	
	res.json({data:product})
}
export const deleteProduct=async (req:Request,res:Response) => {
	const { id}=req.params
	const product = await Product.findByPk(id)

	if(!product){
		return res.status(404).json({
			error:'Producto no encontrado'
		})
	}
	await product.destroy()
	res.json({data:"Producto eliminado"})
}
export const createProduct = async (req: Request, res: Response) => {
	try {
		if(!request){
			return res.status(400).json({
				error:'Problemaaaaaaa'
			})
		}
		const product = await Product.create(req.body);
		res.status(201).json({ data: product });	
	} catch (error) {
		console.log(error)
	}
};
