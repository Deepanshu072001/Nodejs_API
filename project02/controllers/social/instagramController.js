const { instagramAccounts } = require("../../data/socialData");

exports.addInstagram = (req, res) => {
  const { username, followers } = req.body;
  if (!username || followers === undefined) return res.status(400).json({ message: "Username and followers required" });

  instagramAccounts.push({ username, followers });
  res.json({ message: "Instagram account added", instagramAccounts });
};

exports.getAllInstagram = (req, res) => res.json(instagramAccounts);

exports.getInstagram = (req, res) => {
  const { username } = req.params;
  const account = instagramAccounts.find(a => a.username === username);
  if (!account) return res.status(404).json({ message: "Instagram account not found" });
  res.json(account);
};

exports.updateInstagram = (req, res) => {
  const { username } = req.params;
  const { followers } = req.body;
  const account = instagramAccounts.find(a => a.username === username);
  if (!account) return res.status(404).json({ message: "Instagram account not found" });

  account.followers = followers !== undefined ? followers : account.followers;
  res.json({ message: "Instagram account updated", account });
};

// ✅ Delete one Instagram account (case-insensitive + trim)
exports.deleteInstagram = (req, res) => {
  const { username } = req.params;

  console.log("Trying to delete Instagram account:", username);
  console.log("Current accounts:", instagramAccounts);

  const index = instagramAccounts.findIndex(
    a => a.username.toLowerCase().trim() === username.toLowerCase().trim()
  );

  if (index === -1) {
    return res.status(404).json({ message: "Instagram account not found" });
  }

  const deleted = instagramAccounts.splice(index, 1);
  res.json({ message: "Instagram account deleted", deleted, instagramAccounts });
};

// ✅ Delete all Instagram accounts
exports.deleteAllInstagram = (req, res) => {
  if (instagramAccounts.length === 0) {
    return res.status(404).json({ message: "No Instagram accounts to delete" });
  }

  const deleted = [...instagramAccounts]; // snapshot of deleted accounts
  instagramAccounts.length = 0;

  res.json({ message: "All Instagram accounts deleted", deleted, instagramAccounts });
};
