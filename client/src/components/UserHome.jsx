import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const [companies, setCompanies] = useState(null);
  const navigate = useNavigate();

  const RoleId = useSelector((state) => state.user.roleId);

  useEffect(() => {
    if (RoleId !== 3) {
      navigate("/");
    } else {
      fetchCompanies();
    }
  }, []);

  const fetchCompanies = async () => {
    try {
      let response = await axios.get("http://localhost:4000/Ucompanies");
      let data = response.data.companies;
      setCompanies(data);
    } catch (error) {
      console.error("Failed to fetch Companies", error);
    }
  };

  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center gap-5 p-10">
      <h1 className="text-3xl font-bold p-2 text-center text-blue-600">
        List of Companies
      </h1>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
              >
                Company Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.address}
                </td>
                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
                  {data.companyDesc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHome;
