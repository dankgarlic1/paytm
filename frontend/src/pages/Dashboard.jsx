import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const navigateToSendMoney = () => {
    navigate("/send");
  };
  return (
    <div>
      <div className="flex justify-between p-4  h-14">
        <div className="flex flex-col justify-center h-full ml-4 ">
          PayTM App
        </div>
        <div className="flex items-center">
          <div className="flex  justify-center h-full ml-4">Hello</div>
          <div className="bg-slate-200 h-12 w-12 rounded-full flex justify-center  mt-1 mr-2 ml-4">
            <div className=" flex  flex-col justify-center h-full  text-xl ">
              U
            </div>
          </div>
        </div>
      </div>

      <div className=" flex ml-10">
        <div className=" font-bold text-lg">Your balance </div>
        <div className="font-semibold ml-4 text-lg"> Rs 10,000</div>
      </div>
      <div className=" flex flex-col ml-10 mt-6">
        <div className=" font-bold text-lg">User </div>
        <div className="my-2 mr-8 ">
          <input
            type="text"
            className="w-full px-1 border border-1 border-gray-200 rounded "
            placeholder="Search users ..."
          />
          <div className="flex justify-between h-8 mt-6">
            <div className="flex items-center">
              <div className="bg-slate-200 h-12 w-12 rounded-full flex justify-center  ">
                <div className=" flex  flex-col justify-center h-full  text-xl ">
                  H
                </div>
              </div>
              <div className="flex  justify-center h-full ml-4">
                Harshit Raizada
              </div>
            </div>
            <div className="flex flex-col justify-center h-full  ">
              <button
                className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={() => navigateToSendMoney()}
              >
                Send Money
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
