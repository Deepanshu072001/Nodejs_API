const mobiles = require("../data/mobilesData");

exports.addMobiles = (req, res) => {
  let data = req.body;
  if (!Array.isArray(data)) data = [data];

  for (const m of data) {
    const { ph_name, model_no, price, mf_year } = m;
    if (!ph_name || !model_no || !price || !mf_year) return res.status(400).json({ message: "All fields required" });
  }

  data.forEach(m => mobiles.push(m));
  res.json({ message: `${data.length} mobile(s) added`, mobiles });
};

exports.getAllMobiles = (req, res) => res.json(mobiles);

exports.getMobile = (req, res) => {
  const { ph_name } = req.params;
  const mobile = mobiles.find(m => m.ph_name === ph_name);
  if (!mobile) return res.status(404).json({ message: "Mobile not found" });
  res.json(mobile);
};

exports.updateMobile = (req, res) => {
  const { ph_name } = req.params;
  const { model_no, price, mf_year } = req.body;

  const mobile = mobiles.find(m => m.ph_name === ph_name);
  if (!mobile) return res.status(404).json({ message: "Mobile not found" });

  mobile.model_no = model_no || mobile.model_no;
  mobile.price = price || mobile.price;
  mobile.mf_year = mf_year || mobile.mf_year;

  res.json({ message: "Mobile updated", mobile });
};

exports.deleteMobile = (req, res) => {
  const { ph_name } = req.params;

  console.log("Trying to delete:", ph_name);   // Debug log
  console.log("Current mobiles:", mobiles);

  const index = mobiles.findIndex(
    m => m.ph_name.toLowerCase().trim() === ph_name.toLowerCase().trim()
  );

  if (index === -1) {
    return res.status(404).json({ message: "Mobile not found" });
  }

  const deleted = mobiles.splice(index, 1);
  res.json({ message: "Mobile deleted", deleted, mobiles });
};


exports.deleteAllMobiles = (req, res) => {
  mobiles.length = 0;
  res.json({ message: "All mobiles deleted", mobiles });
};
