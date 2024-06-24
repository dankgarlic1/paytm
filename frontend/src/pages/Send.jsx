import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SendMoney = () => {
  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const token = localStorage.getItem("token");
  const handleSendMoney = async () => {
    try {
      const payload = {
        to: id,
        amount: parseFloat(amount), // Convert amount to number
      };

      console.log("Payload:", payload); // Log the payload before sending

      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data); // Log the response after receiving

      // Optionally, you can handle success cases here, such as showing a success message or updating state
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      // Handle error cases here, such as displaying an error message to the user
    }
  };

  return (
    <div className="bg-slate-300  flex justify-center py-10">
      <div className="flex flex-col rounded shadow-md h-max bg-white p-8 w-96">
        <div className="text-3xl font-bold text-center">Send Money</div>
        <div className="flex flex-col justify-center h-full mt-20 ">
          <div className="flex items-center">
            <div className="bg-green-500 h-12 w-12 rounded-full flex justify-center  ">
              <div className=" flex  flex-col justify-center h-full  text-2xl text-white ">
                {name[0].toUpperCase()}
              </div>
            </div>
            <div className="flex  justify-center h-full ml-2 font-semibold text-2xl">
              {name}
            </div>
          </div>
          <div className="text-sm font-medium mt-1">Amount (in Rs)</div>
          <input
            type="number"
            className="w-full px-1 border border-1 border-gray-200 rounded mt-2 h-10 "
            placeholder="Enter Amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            id="amount"
          />
          <div className="w-full mt-2">
            <button
              type="button"
              className="w-full text-white bg-green-500 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              onClick={handleSendMoney}
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
