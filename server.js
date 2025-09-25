const express = require("express");

const app = express();
const PORT = 5000;

// fruit {name: fruitName, color: fruitColor}
// create an empty list to store fruit names during code start
// on post call, store details of fruit
// on get call, return fruit details with matching name
// on delete, delete fruit details with matching name

// Define a simple GET route
//app.get('/api/status/', (req, res) => {
// res.send('Hello World, from your Express API! GET');
//}
//);

// Define a simple GET route
// app.post('/api/status/', (req, res) => {
//   res.send('Hello World, from your Express API! POST');
// }
// );

app.use(express.json());

let fruits = [];

app.post("/fruits/data", (req, res) => {
  const { name, color } = req.body;

  if (!name || !color) {
    return res.status(500).json({ message: " Name and Color are required" });
  }

  fruits.push({ name, color });
  res.status(200).json({ message: `${name} : fruit added` });
});

app.get("/fruits/data/:name", (req, res) => {
  const { name } = req.params;
  console.log("name:", name);

  // fruits.find(f => {
  //     console.log("checking the fruit : ", f);
  // })

  const fruit = fruits.find((fruit) => fruit.name === name);
  if (!fruit) {
    return res.status(404).json({ message: "fruits not found" });
  }
  res.json(fruit);
});

app.delete("/fruits/data/:name", (req, res) => {
    const {name} = req.params;

    const index = fruits.findIndex(fruit => fruit.name === name);
    if(index === -1) {
        return res.status(404).json({message: "Fruits not found"});
    }
    fruits.splice(index,1);
    res.json({ message: "Fruit deleted", fruits});
});



//mobile API 

//mobile list
let mobiles = [];

app.post("/mobile/list", (req , res) => {
    //const { ph_name, model_no, price, mf_year } = req.body;
    let data = req.body;

    if(!Array.isArray(data)){
      data = [data];
    }

    for (const mobile of data) {
    const { ph_name, model_no, price, mf_year } = mobile;

    if (!ph_name || !model_no || !price || !mf_year) {
      return res.status(500).json({ message: " All the fields are mandatory. Please provide all the fields..." });
    }
  }
  
  let addedMessages = [];
  for (const mobile of data) {
    const { ph_name, model_no, price, mf_year } = mobile;
    mobiles.push({ ph_name, model_no, price, mf_year });
    addedMessages.push(`${ph_name}, ${model_no}, ${price}, ${mf_year}`);
  }

  res.status(200).json({message: `Mobile(s) added: ${addedMessages}`, mobiles });
});

app.get("/mobile/list", (req, res) => {
  res.json(mobiles);
});

app.get("/mobile/list/:ph_name", (req, res) => {
    const { ph_name } = req.params;
  //console.log("name:", ph_name);

        const mobile = mobiles.find(mobile => mobile.ph_name === ph_name);
        if (!mobile) {
            return res.status(404).json({ message: "Mobile not found" });
        }
        return res.json(mobile);
});

// Delete all mobile api without passing the parameter/ delete method route-parameter

app.delete("/mobile/list", (req, res) => {
  if (mobiles.length === 0) {
    return res.status(404).json({ message: "No mobiles to delete" });
  }

  mobiles.length = 0; // clear the array
  console.log("All mobiles deleted");
  res.json({ message: "All mobiles deleted", mobiles });
});

//Delete specific mobile api by passing the parameter/ delete method route-parameter

app.delete("/mobile/list/:ph_name", (req, res) => {
    const {ph_name} = req.params;
    
    console.log("Current mobiles:", mobiles);
    console.log("Deleting mobile with name:", ph_name);

    const index = mobiles.findIndex(mobile => mobile.ph_name === ph_name);
    if(index === -1) {
        return res.status(404).json({message: "Mobile not found"});
    }
    mobiles.splice(index,1);
    console.log("Remaining mobiles after deleting the current mobile :" , mobiles);
    console.log(`Mobile '${ph_name}' deleted successfully`);
  res.json({ message: `Mobile '${ph_name}' deleted successfully`, mobiles });

});

app.put("/mobile/update/:ph_name", (req, res) => {
    const { ph_name } = req.params; 
    const updates = req.body; 

    const mobile = mobiles.find(m => m.ph_name === ph_name);
    if (!mobile) {
        return res.status(404).json({ message: "Mobile not found" });
    }

    const allowedFields = ["ph_name", "model_no", "price", "mf_year"];
    const updatedFields = {};  // track only changed fields

    for (const key of allowedFields) {
        if (updates[key] !== undefined && updates[key] !== mobile[key]) {
            updatedFields[key] = { old: mobile[key], new: updates[key] }; 
            mobile[key] = updates[key];
        }
    }

    if (Object.keys(updatedFields).length === 0) {
        console.log("No fields updated");
    } else {
        console.log("Updated fields:", updatedFields);
    }

    res.status(200).json({ message: "Mobile updated successfully", mobile });
});



//server run 
app.listen(PORT, () => {
  console.log(`server is up on port: ${PORT}`);
});
