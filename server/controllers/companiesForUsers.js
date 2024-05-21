import db from "../dbconfig/db.js";

const companiesForUsers = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const [results] = await connection.query("select * from tblCompanies");
    res.status(200).json({ companies: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default companiesForUsers;
