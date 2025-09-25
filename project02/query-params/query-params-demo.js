const express = require("express");
const app = express();
const PORT = 5000;

const fruits = [];
const products = [];

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/fruits/", (req, res) => {
  const { name, color } = req.body;

  if (!name || !color) {
    return res.status(500).json({ message: " Name and Color are required" });
  }

  fruits.push({ name, color });
  res.status(200).json({ message: `${name} : fruit added` });
});

app.get("/fruits/:name", (req, res) => {
  const { name } = req.params;
  console.log("name:", name);

  const fruit = fruits.find((fruit) => fruit.name === name);
  if (!fruit) {
    return res.status(404).json({ message: "fruits not found" });
  }
  res.json(fruit);
});

app.get("/fruits", (req, res) => {
  const name = req.query.name;
  console.log("name:", name);
  console.log("fruits : ", fruits);

  const color = req.query.color;
  console.log("color", color);
  console.log("fruits : ", fruits);

  const fruit = fruits.find(
    (fruit) => fruit.name === name && fruit.color === color
  );

  if (!fruit) {
    return res.status(404).json({ message: "fruits not found" });
  }
  res.json(fruit);
});

// req query

app.get("/products", (req, res) => {
  const { name, color } = req.query;

  if (!name || !color) {
    return res.status(400).json({ message: "Name and color required" });
  }

  const pro = products.find(
    (pro) =>
      pro.name === name &&
      pro.color  === color
  );

  if (!pro) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json({ message: "Product found", products : pro });
});


app.post("/products", (req, res) => {
  const { name, color } = req.body;

  if (!name || !color) {
    return res
      .status(400)
      .json({ message: "Product Name and Color are required" });
  }

  products.push({ name, color });
  return res.status(201).json({ message: "Product added", products });
});
