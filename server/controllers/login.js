import db from "../dbconfig/db.js";

const login = async (req, res) => {
  const { userName, password } = req.body;

  const q = `SELECT * FROM tblUser WHERE username = ? AND pass = ?`;

  try {
    const [results] = await db.query(q, [userName, password]);
    if (results.length > 0) {
      const user = results[0];
      res.json({ roleId: user.roleid, username: user.username, id: user.id });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default login;
