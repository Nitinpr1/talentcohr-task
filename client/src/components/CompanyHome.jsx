import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyHome = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState(null);

  const companyId = useSelector((state) => state.user.id);

  const navigate = useNavigate();

  const RoleId = useSelector((state) => state.user.roleId);
  useEffect(() => {
    if (RoleId !== 2) {
      navigate("/");
    } else {
      fetchCompany(companyId);
    }
  }, []);

  const fetchCompany = async (companyId) => {
    try {
      let response = await axios.get(
        `http://localhost:4000/company/${companyId}`
      );

      // console.log(response.data.companies[0]);
      setCompany(response.data.companies[0]);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };
  if (!company) {
    return <div>loading....</div>;
  }

  const handleSubmit = async (e, companyId) => {
    e.preventDefault();

    const data = {
      companyName: companyName,
      email: email,
      address: address,
      description: description,
      RoleId: RoleId,
    };

    try {
      let response = await axios.put(
        `http://localhost:4000/updateDetails/${companyId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (parseInt(response.status) === 200) {
        setCompanyName("");
        setEmail("");
        setAddress("");
        setDescription("");
        fetchCompany(companyId);
      }
    } catch (error) {
      console.log("Error fetching company:", error);
    }
  };

  return (
    <div className="flex flex-row-reverse w-full p-10 flex-wrap">
      <div className="flex-1 flex justify-center flex-col gap-3 p-5 w-full max-w-[400px] border bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl text-blue-600 font-bold mb-3 text-center">
          Edit Details
        </h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e, companyId);
          }}
        >
          <div className="flex flex-col w-full">
            <label className="p-2 font-bold">Company Name : </label>
            <input
              type="text"
              name="companyName"
              required
              value={companyName}
              placeholder="Enter your Company Name"
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="p-2 font-bold">Email : </label>
            <input
              type="email"
              required
              name="email"
              value={email}
              placeholder="Enter your email "
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="p-2 font-bold"> Address : </label>
            <input
              type="text"
              required
              name="address"
              value={address}
              placeholder="Enter your address "
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="p-2 font-bold"> Description: </label>
            <textarea
              type="text"
              required
              name="username"
              value={description}
              placeholder="Enter your description "
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="my-5">
            <button
              type="submit"
              className="w-full p-2 text-white font-bold bg-blue-700 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1 p-5">
        <div className="border shadow-md rounded-md p-5 w-full">
          <h1 className="text-3xl font-bold text-slate-800 p-1 mb-2">
            Company Name :{" "}
            <span className="text-blue-600"> {company.companyName} </span>
          </h1>
          <hr />
          <h5 className="text-lg p-1 my-2">
            Email : <span className="text-blue-600">{company.email}</span>
          </h5>
          <p className="my-2">
            Address : <span className="text-blue-600">{company.address}</span>
          </p>
          <p className="text-slate-700"> {company.companyDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;
