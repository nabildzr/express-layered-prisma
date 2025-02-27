const prisma = require("../db");
const { findProduct, findProductById, insertProduct, findProductByName, deleteProduct, editProduct } = require("./product.repository");


const getAllProducts = async () => {
  const products =  await findProduct();
  return products
}

const getProductsById = async (id)=> {

  const result = await findProductById(id)

  if(!result) {
    // res.status(400).send("Product not found")

    throw Error("Product not found")
  }

  return result;

}

const createProduct = async (newProductData) => {
  const findProduct = await findProductByName(newProductData.name);

  if(findProduct) {
    throw new Error("Name already taken ")
  }

  const result = await insertProduct(newProductData);


return result
}

const deleteProductById = async (id) => {

  await getProductsById(id);
  
  await deleteProduct(id);
}

const updateProductById = async (id, productData) => {
  await getProductsById(id)

  const product = await editProduct(id, productData)

  return product;
}

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  deleteProductById,
  updateProductById
};