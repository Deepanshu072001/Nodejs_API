const { facebookAccounts } = require("../../data/socialData");

exports.addFacebook = (req, res) => {
  const { username, friends } = req.body;
  if (!username || friends === undefined) return res.status(400).json({ message: "Username and friends required" });

  facebookAccounts.push({ username, friends });
  res.json({ message: "Facebook account added", facebookAccounts });
};

exports.getAllFacebook = (req, res) => res.json(facebookAccounts);

exports.getFacebook = (req, res) => {
  const { username } = req.params;
  const account = facebookAccounts.find(a => a.username === username);
  if (!account) return res.status(404).json({ message: "Facebook account not found" });
  res.json(account);
};

exports.updateFacebook = (req, res) => {
  const { username } = req.params;
  const { friends } = req.body;
  const account = facebookAccounts.find(a => a.username === username);
  if (!account) return res.status(404).json({ message: "Facebook account not found" });

  account.friends = friends !== undefined ? friends : account.friends;
  res.json({ message: "Facebook account updated", account });
};

exports.deleteFacebook = (req, res) => {
  const { username } = req.params;

  console.log("Trying to delete Facebook account:", username);
  console.log("Current accounts:", facebookAccounts);

  const index = facebookAccounts.findIndex(
    a => a.username.toLowerCase().trim() === username.toLowerCase().trim()
  );

  if (index === -1) {
    return res.status(404).json({ message: "Facebook account not found" });
  }

  const deleted = facebookAccounts.splice(index, 1);
  res.json({ message: "Facebook account deleted", deleted, facebookAccounts });
};


exports.deleteAllFacebook = (req, res) => {
  if (facebookAccounts.length === 0) {
    return res.status(404).json({ message: "No Facebook accounts to delete" });
  }

  const deleted = [...facebookAccounts]; // keep a copy of what was deleted
  facebookAccounts.length = 0;

  res.json({ message: "All Facebook accounts deleted", deleted, facebookAccounts });
};
