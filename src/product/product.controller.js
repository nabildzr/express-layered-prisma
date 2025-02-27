const express = require("express");
const { getAllProducts, getProductsById, createProduct, deleteProductById, updateProductById } = require("./product.service");

const router = express.Router()

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products)
})

router.get("/:id", async (req, res) => {

  try {
    const productId = parseInt(req.params.id)

    const result = await getProductsById(productId)
    res.send(result)

  } catch (err) {
    res.status(400).send(err.message)
  }

})

router.post("/addProduct", async (req, res) => {
  try {
    const newProductData = req.body
    console.log(newProductData)
  const product = await createProduct(newProductData);

  res.status(201).send({
    data: product,
    message: "Successfully created new Product"
  })
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.delete("/:id", async (req, res) => {
 try {
  const productId = parseInt(req.params.id);

  const result = await deleteProductById(productId)

  res.status(200).send("Product Deleted")
 } catch (error) {
  res.status(400).send(error.message)
 }

})

router.put("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
  const product = req.body

  if (
    !(
      product.name && product.price && product.description && product.image
    )
  ) {
    res.status(400).send("Some field are missing")
    return;
  }

  const result = await updateProductById(productId, product)

  res.status(200).send(
    {
      data: result,
      message: `Successfully updated product with id: ${productId}`
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.patch("/:id", async (req, res) => {
 try {
  const productId = parseInt(req.params.id);
  const product = req.body

  const result = await updateProductById(productId, product)

  res.status(200).send(
    {
      data: result,
      message: `Successfully updated product with id: ${productId}`
    })
 } catch (error) {
  res.status(400).send(error.message)
 }
})


module.exports = router;