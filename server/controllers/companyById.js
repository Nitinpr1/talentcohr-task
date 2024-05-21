import db from "../dbconfig/db.js";

const companyById = async (req, res) => {
  const companyId = req.params.companyId;
  const connection = await db.getConnection();
  try {
    const [results] = await connection.query(
      "select * from tblCompanies where companyId=?",
      [companyId]
    );
    res.status(200).json({ companies: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default companyById;
