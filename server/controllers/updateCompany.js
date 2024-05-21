import db from "../dbconfig/db.js";

const updateCompany = async (req, res) => {
  const { companyName, email, address, description, userName, password } =
    req.body;

  const companyId = req.params.companyId;
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // update the tblUser
    await connection.query(
      "update tblUser set username = ?, pass=? where id=?",
      [userName, password, companyId]
    );

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
export default updateCompany;
