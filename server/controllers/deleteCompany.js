import db from "../dbconfig/db.js";

const deleteCompany = async (req, res) => {
  const companyId = req.params.companyId;
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // delete in  the tblCompanies
    await connection.query("delete from tblCompanies where companyId=?", [
      companyId,
    ]);

    // delete in the tblUser
    await connection.query("delete from tblUser where id=?", [companyId]);

    await connection.commit();
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

export default deleteCompany;
