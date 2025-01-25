import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options={
	swaggerDefinition:{
		openapi:'3.0.0',
		tags:[{
			name:'Products',
			description:'API operation related to products'
		}],
		info:{
			title:'REST API',
			version:"1.0.0",
			description:"Api docs for products"
		}
	},
	apis:['/src/routes.ts']
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec