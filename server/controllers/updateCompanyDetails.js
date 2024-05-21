import db from "../dbconfig/db.js";

const updateCompanyDetails = async (req, res) => {
  const companyId = req.params.companyId;
  const { companyName, email, address, description } = req.body;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // update in  the tblCompanies
    await connection.query(
      "update tblCompanies set companyname = ?, email =?, address=?, companyDesc=? where companyId=?",
      [companyName, email, address, description, companyId]
    );

    await connection.commit();
    res.status(200).json({ message: "Company updated successfully" });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};
export default updateCompanyDetails;
