import request from 'supertest'
import server from '../server'

describe('Get /api',()=>{
	it('should sen back a json response',async ()=>{
		const res = await request(server).get('/api')
		console.log(res)
		expect(res.status).toBe(200)
		expect(res.status).not.toBe(404)
	})
	
})