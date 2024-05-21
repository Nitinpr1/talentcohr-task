import db from "../dbconfig/db.js";

const companiesForAdmin = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const [results] = await connection.query(
      "select a.username, a.pass, b.* from tblUser as a inner join tblCompanies as b on a.id=b.companyId"
    );
    res.status(200).json({ companies: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default companiesForAdmin;
