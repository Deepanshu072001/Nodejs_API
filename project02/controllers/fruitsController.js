const fruits = require("../data/fruitsData");

exports.addFruit = (req, res) => {
  const { name, color } = req.body;
  if (!name || !color) return res.status(400).json({ message: "Name and color required" });

  fruits.push({ name, color });
  res.json({ message: "Fruit added", fruits });
};

exports.getAllFruits = (req, res) => res.json(fruits);

exports.getFruit = (req, res) => {
  const { name } = req.params;
  const fruit = fruits.find(f => f.name === name);
  if (!fruit) return res.status(404).json({ message: "Fruit not found" });
  res.json(fruit);
};

exports.updateFruit = (req, res) => {
  const { name } = req.params;
  const { color } = req.body;
  const fruit = fruits.find(f => f.name === name);
  if (!fruit) return res.status(404).json({ message: "Fruit not found" });

  fruit.color = color || fruit.color;
  res.json({ message: "Fruit updated", fruit });
};

exports.deleteFruit = (req, res) => {
  const { name } = req.params;

  console.log("Deleting fruit:", name);  // Debug log
  console.log("Current fruits:", fruits);

  const index = fruits.findIndex(
    f => f.name.toLowerCase().trim() === name.toLowerCase().trim()
  );

  if (index === -1) {
    return res.status(404).json({ message: "Fruit not found" });
  }

  const deleted = fruits.splice(index, 1);
  res.json({ message: "Fruit deleted", deleted, fruits });
};
