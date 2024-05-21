import axios from "axios";
import { useEffect, useState } from "react";

const Table = ({ companies, setCompanies, setCompanyDetails }) => {
  // useEffect(() => {}, []);

  const handleDelete = async (companyId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/deleteCompany/${companyId}`
      );
      if (response.status === 200) {
        // Update the companies state to reflect the deletion
        setCompanies(
          companies.filter((company) => company.companyId !== companyId)
        );
        alert("Company deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-400">
        <thead className="bg-gray-100">
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
              User Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
            >
              Password
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
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider"
            >
              Action
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
                {data.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {data.pass}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {data.address}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
                {data.companyDesc}
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex w-full gap-2">
                  <button
                    onClick={() =>
                      setCompanyDetails({
                        companyName: data.companyName,
                        email: data.email,
                        userName: data.username,
                        password: data.pass,
                        address: data.address,
                        description: data.companyDesc,
                        companyId: data.companyId,
                      })
                    }
                    className="bg-green-600 text-white p-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(data.companyId)}
                    className="bg-red-400 text-white p-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
