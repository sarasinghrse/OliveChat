import express from 'express';
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv'
import {connectDB} from './lib/db.js'
import cookieParser from "cookie-parser"
import cors from 'cors'
import { app,server } from './lib/socket.js';
import { fileURLToPath } from 'url';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

import path from 'path'


dotenv.config();

const PORT=process.env.PORT || 5002;


app.use(express.json());
app.use(cookieParser());
app.use(cors(
   {
     origin:"http://localhost:5173",
     credentials:true,
   }
    
))

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

server.listen(PORT,()=>{
    console.log(`server running on PORT:${PORT}`);
    connectDB();
    
    
});