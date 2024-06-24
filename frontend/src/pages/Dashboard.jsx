import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");
  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.balance);
      // console.log(balance);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUsers = async (filter = "") => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/bulk",
        {
          params: { filter },
        }
      );
      setUsers(response.data.user);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // console.log("called fetch user");
    fetchUsers();
    fetchBalance();
    // console.log(`Balance is: ${balance}`);
  }, []);

  const navigateToSendMoney = () => {
    navigate("/send");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    fetchUsers(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between p-4 h-14">
        <div className="flex flex-col justify-center h-full ml-4">
          PayTM App
        </div>
        <div className="flex items-center">
          <div className="flex justify-center h-full ml-4">Hello</div>
          <div className="bg-slate-200 h-12 w-12 rounded-full flex justify-center mt-1 mr-2 ml-4">
            <div className="flex flex-col justify-center h-full text-xl">U</div>
          </div>
        </div>
      </div>

      <div className="flex ml-10">
        <div className="font-bold text-lg">Your balance</div>
        <div className="font-semibold ml-4 text-lg">
          Rs {balance.toFixed(2)}
        </div>
      </div>

      <div className="flex flex-col ml-10 mt-6">
        <div className="font-bold text-lg">User</div>
        <div className="my-2 mr-8">
          <input
            type="text"
            className="w-full px-1 border border-1 border-gray-200 rounded"
            placeholder="Search users ..."
            value={search}
            onChange={handleSearchChange}
          />
          {users.map((user) => (
            <div key={user._id} className="flex justify-between h-8 mt-6">
              <div className="flex items-center">
                <div className="bg-slate-200 h-12 w-12 rounded-full flex justify-center">
                  <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                  </div>
                </div>
                <div className="flex justify-center h-full ml-4">
                  {user.firstName} {user.lastName}
                </div>
              </div>
              <div className="flex flex-col justify-center h-full">
                <button
                  className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() =>
                    navigate(`/send?id=${user._id}&name=${user.firstName}`)
                  }
                >
                  Send Money
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
