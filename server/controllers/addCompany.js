import db from "../dbconfig/db.js";

const addCompany = async (req, res) => {
  const { companyName, email, address, description, userName, password } =
    req.body;
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Insert the company user
    const [userResult] = await connection.query(
      "INSERT INTO tblUser (username, pass, roleid) VALUES (?, ?, ?)",
      [userName, password, 2] // Assuming roleid 2 is for 'company'
    );
    const userId = userResult.insertId;

    // Insert the company details
    await connection.query(
      "INSERT INTO tblCompanies (companyName, email, address, companyDesc, companyId) VALUES (?, ?, ?, ?, ?)",
      [companyName, email, address, description, userId]
    );

    await connection.commit();
    res.status(201).json({ message: "Company added successfully" });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

export default addCompany;
