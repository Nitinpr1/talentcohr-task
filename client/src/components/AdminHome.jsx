import { useEffect, useState } from "react";
import Table from "./Table";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  // defining state for handling form data
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    email: "",
    userName: "",
    password: "",
    address: "",
    description: "",
  });

  // selecting roleId from global state
  const adminId = useSelector((state) => state.user.roleId);
  useEffect(() => {
    if (adminId !== 1) navigate("/");
    fetchCompanies();
  }, []);

  // handling input fields change event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  //fetchCompanies for table creation
  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/companies-for-admin"
      );

      setCompanies(response.data.companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };
  // if (companyDetails) {
  //   console.log(companyDetails);
  // }

  // handling Add company function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...companyDetails,
      adminId,
    };
    try {
      let response = await axios.post(
        "http://localhost:4000/addCompany",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (parseInt(response.status) === 201) {
        setCompanyDetails({
          companyName: "",
          email: "",
          userName: "",
          password: "",
          address: "",
          description: "",
        });
        alert("company added Successfully!!");
        fetchCompanies();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update company
  const handleUpdateCompany = async (e, companyId) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/updateCompany/${companyId}`,
        companyDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (parseInt(response.status) === 200) {
        setCompanyDetails({
          companyName: "",
          email: "",
          userName: "",
          password: "",
          address: "",
          description: "",
        });
        alert("company updated Successfully!!");
        fetchCompanies();
      }
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  //handle form submission

  const handleFormSubmit = (e) => {
    let companyId = companyDetails.companyId;
    if (companyId) {
      handleUpdateCompany(e, companyId);
    } else {
      handleSubmit(e);
    }
  };

  //handle cancel button
  const handleCancel = () => {
    setCompanyDetails({
      companyName: "",
      email: "",
      userName: "",
      password: "",
      address: "",
      description: "",
      companyId: null,
    });
  };

  return (
    <div className="flex flex-wrap gap-5 p-5">
      <div className=" flex-1 flex justify-center flex-col gap-3 p-5 w-full max-w-[350px] border bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl mb-5 font-bold text-center text-blue-700">
          Add Company
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col w-full">
            <label className="p-2 font-bold"> Company Name : </label>
            <input
              type="text"
              required
              name="companyName"
              value={companyDetails.companyName}
              placeholder="Enter company Name "
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex flex-col">
            <label className="p-2 font-bold"> Email : </label>
            <input
              type="email"
              required
              name="email"
              value={companyDetails.email}
              placeholder="Enter company's email "
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex flex-col">
            <label className="p-2 font-bold"> User Name : </label>
            <input
              type="text"
              required
              name="userName"
              value={companyDetails.userName}
              placeholder="Enter Company's User Name "
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex flex-col">
            <label className="p-2 font-bold"> Password : </label>
            <input
              type="password"
              required
              name="password"
              value={companyDetails.password}
              placeholder="Enter password "
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="p-2 font-bold"> Address : </label>
            <input
              type="text"
              required
              name="address"
              value={companyDetails.address}
              placeholder="Enter address"
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="p-2 font-bold"> Description : </label>
            <textarea
              required
              name="description"
              value={companyDetails.description}
              placeholder="Enter description"
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div className="my-5 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full p-2 text-white font-bold bg-blue-700 rounded-md"
            >
              {companyDetails.companyId ? "Update" : "Add"}
            </button>
            {companyDetails.companyId && (
              <button
                onClick={handleCancel}
                className="w-full p-2 text-blue-700 font-bold bg-blue-200 border border-blue-700 rounded-md"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="flex-1 p-3">
        <h1 className="text-3xl text-center text-blue-600 font-bold p-2 mb-3">
          Company List
        </h1>
        {/* table */}
        <Table
          companies={companies}
          setCompanies={setCompanies}
          setCompanyDetails={setCompanyDetails}
        />
      </div>
    </div>
  );
};

export default AdminHome;
