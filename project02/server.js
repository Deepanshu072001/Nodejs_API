const express = require("express");
const app = express();
const PORT = 5000;

const fruitsRoutes = require("./routes/fruitsRoutes");
const mobilesRoutes = require("./routes/mobilesRoutes");
const instagramRoutes = require("./routes/social/instagramRoutes");
const facebookRoutes = require("./routes/social/facebookRoutes");

app.use(express.json());

app.use("/fruits", fruitsRoutes);
app.use("/mobile", mobilesRoutes);
app.use("/social/instagram", instagramRoutes);
app.use("/social/facebook", facebookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
