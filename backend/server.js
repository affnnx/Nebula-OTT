import express from 'express'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js'
import contentRoutes from './routes/content.route.js'
import searchRoutes from './routes/search.route.js'

import { ENV_VARS } from './config/envVars.js'
import { connectDB } from './config/mongo.js'
import { protectRoute } from './middleware/protectRoute.js'
import path from 'path'

const app= express()

app.use(express.json());       // IMP : To have this before routes, this helps in json parsing of requests
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/content", contentRoutes)
app.use("/api/v1/search", protectRoute, searchRoutes)

const __dirname = path.resolve()
const PORT = ENV_VARS.PORT

if(ENV_VARS.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve( __dirname, "frontend", "dist", "index.html"))  //path.resolve uses correct path separators based on OS, also, always returns abs path
  });
}

app.listen(PORT, ()=>{
  console.log("listening at port:" + PORT)
  connectDB()
})
