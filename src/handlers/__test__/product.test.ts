import request from 'supertest'
import server from '../../server'
import { ExpressValidator } from 'express-validator'
import { reset } from 'colors'
import { camelizeIf } from 'sequelize/lib/utils'

describe('Post',()=>
	{
		it('should display validation errors',async()=>{
			const response = await request(server).post('/api/products').send({
				name:"",
				price:"",
			})
			expect(response.status).toBe(400)
			expect(response.body).toHaveProperty('errors')

			expect(response.status).not.toBe(201)
			console.log(response.error)


		})
	it('should create a new products',async()=>{
		const response = await request(server).post('/api/products').send({
			name:"Mouse",
			price:20
		})
		console.log('respuies' + response)
		expect(response.status).toBe(201)
		expect(response.status).not.toBe(400)
		expect(response.status).not.toBe(404)
		console.log(response.error)


	})
	it('should validate that the price is greater than 0',async()=>{
		const response = await request(server).post('/api/products').send({
			name:"Mouse",
			price:-1
		})
		console.log('respuies' + response)
		expect(response.status).not.toBe(201)
		expect(response.status).toBe(400)
		console.log(response.error)

	})
})

describe('Get',()=>{
	it('should check if api/products exist',async()=>{
		const response = await request(server).get('/api/products')
		expect(response.status).toBe(200)
	})
	it("Get a json rsponse", async()=>{
		const response = await request(server).get('/api/products')
		expect(response.status).toBe(200)
		expect(response.headers['content-type']).toMatch(/json/)
		expect(response.body).toHaveProperty('data')
		expect(response.body.data).toHaveLength(1)


		expect(response.body).not.toHaveProperty('errors')
	})
})

describe('Get by id',() => {
	it('should return a 404 response for a non-existent product',async()=>{
		const productId = 200
		const response = await request(server).get(`/api/products/${productId}`)

		expect(response.status).toBe(400)
		expect(response.body).toHaveProperty('error')
		expect(response.body.error).toBe('Producto no encontrado')

	})
	it('should check a valid id in the url', async()=>{
		const response = await request(server).get('/api/products/not-valid-rl')
		expect(response.status).toBe(400)
		expect(response.body).toHaveProperty('errors')
	})
	it('get a JSON response for a single product',async()=>{
		const productId = 200
		const response = await request(server).get(`/api/products/1`)

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('data')

	})
})

describe('put',()=>{
	it('should display vlaidation error message when updating a product',async () => {
		const response = await request(server).put('/api/products/100').send({
			name:'holaaa',
			price:67
		})

		expect(response.status).not.toBe(200)
		console.log(response.error)

	})
})