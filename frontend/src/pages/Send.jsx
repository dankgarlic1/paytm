export const SendMoney = () => {
  return (
    <div className="bg-slate-300  flex justify-center py-10">
      <div className="flex flex-col rounded shadow-md h-max bg-white p-8 w-96">
        <div className="text-3xl font-bold text-center">Send Money</div>
        <div className="flex flex-col justify-center h-full mt-20 ">
          <div className="flex items-center">
            <div className="bg-green-500 h-12 w-12 rounded-full flex justify-center  ">
              <div className=" flex  flex-col justify-center h-full  text-2xl text-white ">
                A
              </div>
            </div>
            <div className="flex  justify-center h-full ml-2 font-semibold text-2xl">
              Friend's Money
            </div>
          </div>
          <div className="text-sm font-medium mt-1">Amount (in Rs)</div>
          <input
            type="text"
            className="w-full px-1 border border-1 border-gray-200 rounded mt-2 h-10 "
            placeholder="Enter Amount"
          />
          <div className="w-full mt-2">
            <button
              type="button"
              className="w-full text-white bg-green-500 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
