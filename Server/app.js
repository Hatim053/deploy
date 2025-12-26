import express, { urlencoded } from 'express'
import 'dotenv/config'
import cors from 'cors'
import http from 'http'
import cookieParser from 'cookie-parser'
import userRoutes from './src/routes/user.routes.js'
import sellerRoutes from './src/routes/seller.routes.js'
import advertisementRoutes from './src/routes/advertisement.routes.js'
import paymentRoutes from './src/routes/payment.routes.js'
import chatRoutes from './src/routes/chat.routes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "../Client/dist")));

// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../Client/dist/index.html"));
// });


const server = http.createServer(app)


// midllewares setup
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({ extended: true , limit : '50mb' }));
app.use(cookieParser())
app.use(express.static('public'))
app.use(cors(
    {
        origin : `${process.env.CLIENT_SIDE_URL}`,
        methods : ['GET' , 'POST'],
        credentials : true,
    }
))


// routes setup
app.use('/user', userRoutes)
app.use('/ad', advertisementRoutes)
app.use('/payment', paymentRoutes)
app.use('/seller', sellerRoutes)
app.use('/api' , chatRoutes)

export default server