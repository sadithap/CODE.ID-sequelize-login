import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import models,{sequelize} from '../schema/init-models'
import routes from './routes/indexRoute'

const port = process.env.PORT || 3300
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(async(req,res,next)=> {
    req.context = {models}
    next()
})

app.use('/auth',routes.userRoute)
app.use('/customer',routes.customerRoute)
app.use('/product',routes.productRoute)

const dropDatabaseSync = false

sequelize.sync({force : dropDatabaseSync}).then(async()=>{
    if (dropDatabaseSync) {
        console.log("Database do not drop");
    }
    app.listen(port,()=>{console.log(`Server is listening on port ${port}`)})
})

export default app