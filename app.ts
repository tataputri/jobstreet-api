import express from "express"
import createRouter,{router} from "express-file-routing"
import * as dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use('/api',router())
createRouter(app)

const listener = app.listen(process.env.PORT||3000,()=>{
  console.log(`app run on port ${process.env.PORT}`)
})
