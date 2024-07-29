const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
require("dotenv").config()
const client = new MongoClient(process.env.DB_URI);
const db = client.db("ecommerce");
const productsColl = db.collection("products");
const ordersColl = db.collection("orders");
const getAllProducts=async function (req, res) {
    try {
      await client.connect();
      const products = await productsColl.aggregate([{ $match: {} }]).toArray();
  
      res.render("index.ejs", { products });
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  }

  const getSingleProd=async function (req, res) {
    try {
      await client.connect();
      const id = req.params.id;
  
      const product = await productsColl
        .aggregate([{ $match: { _id: new ObjectId(id) } }])
        .toArray();
  
      console.log(product);
      res.render("product.ejs", { product: product[0] });
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  }


  const getAddPage=(req, res) => {
    res.render("add.ejs");
  }
  const addProd=async (req, res) => {
    try {
      await client.connect();
      await productsColl.insertOne(req.body);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    } finally {
      client.close();
    }
  }

  const deleteProd=async function (req, res) {
    try {
      await client.connect();
      const id = req.params.id;
      await productsColl.deleteOne({ _id: new ObjectId(id) });
      res.redirect("/");
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  }

  const getUpdatePage=async (req, res) => {
    try {
      await client.connect();
      const product = await productsColl
        .aggregate([{ $match: { _id: new ObjectId(req.params.id) } }])
        .toArray();
  
      console.log(product);
      res.render("update.ejs", { product: product[0] });
    } catch (error) {}
  }


  const updateProd=async (req, res) => {
    try {
      await client.connect();
      console.log(req.body);
      const a = await productsColl.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      console.log(a);
      res.redirect("/");
    } catch (error) {}
  }
  module.exports={getAllProducts:getAllProducts,getSingleProd,getAddPage,addProd,deleteProd,getUpdatePage,updateProd}