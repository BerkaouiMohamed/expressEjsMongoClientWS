const {
  getAllProducts,
  getAddPage,
  addProd,
  deleteProd,
  getUpdatePage,
  updateProd,
  getSingleProd,
} = require("../controllers/productsController");

const router = require("express").Router();

router.get("/", getAllProducts);

router.get("/products/:id", getSingleProd);

//add new prod
router.get("/add", getAddPage);
router.post("/add", addProd);

// dele prod
router.get("/delete/:id", deleteProd);

//update prod
router.get("/update/:id", getUpdatePage);
router.post("/update/:id", updateProd);

module.exports = router;
