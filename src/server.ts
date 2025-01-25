import express from "express";
import router from "./routes";
import db from "./config/db";
import colors from 'colors'
import cors,{CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import { camelizeIf } from "sequelize/lib/utils";
async function connectDB() {
	try {
		await db.authenticate()
		db.sync()
	} catch (error) {
		console.log(error)
		console.log(colors.red.bold('Hubo un error al conectar la DB'))
	}
}

connectDB()

//instancia de express
const server = express()

const corsOptions:CorsOptions={
	origin:function(origin,callback){
		if(origin===process.env.FRONTEND_URL){
			callback(null,true)
		}else{
			callback(new Error('Error de cors'),false)
		}
	}
}

server.use(cors(corsOptions))

//leer datos de formularios
server.use(express.json())
server.use(morgan('dev'))
server.use('/api/products',router)

server.use('/docs',
	swaggerUi.serve, swaggerUi.setup(swaggerSpec)
)
export default server