const express = require("express")
const dotenv = require('dotenv')
const { PrismaClient } = require('@prisma/client')

let prisma = new PrismaClient();



const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT;

app.get("/api", (req, res) => {
  res.send("OK")
})  

const productController = require("./product/product.controller")

app.use("/products", productController)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})