"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.deleteProduct = exports.updateAvailabity = exports.updateProduct = exports.getProductById = exports.getProducts = void 0;
const express_1 = require("express");
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProducts = async (req, res) => {
    try {
        const products = await Product_model_1.default.findAll();
        res.json({ data: products });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id);
        if (!product) {
            return res.status(400).json({
                error: 'Producto no encontrado'
            });
        }
        res.json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        });
    }
    console.log(req.body);
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
};
exports.updateProduct = updateProduct;
const updateAvailabity = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        });
    }
    product.availability = !product.dataValues.availability;
    await product.save();
    res.json({ data: product });
};
exports.updateAvailabity = updateAvailabity;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        });
    }
    await product.destroy();
    res.json({ data: "Producto eliminado" });
};
exports.deleteProduct = deleteProduct;
const createProduct = async (req, res) => {
    try {
        if (!express_1.request) {
            return res.status(400).json({
                error: 'Problemaaaaaaa'
            });
        }
        const product = await Product_model_1.default.create(req.body);
        res.status(201).json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createProduct = createProduct;
//# sourceMappingURL=products.js.map