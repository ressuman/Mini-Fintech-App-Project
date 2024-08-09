import AddMoney from "../AddMoney/AddMoney";
import SendMoney from "../SendMoney/SendMoney";

export const TransactionCard = ({ name, amount }) => {
  return (
    <div className="flex justify-between mt-3 bg-slate-100 px-3 py-2 rounded-md">
      <h6 className="font-semibold">{name}</h6>
      <p>${amount}</p>
    </div>
  );
};

export const TransAndWallet = () => {
  return (
    <div className="h-full px-5 py-8">
      <div className="w-full grid grid-cols-2 gap-x-4">
        <AddMoney />
        <SendMoney />
      </div>
      <h3 className="font-bold text-slate-600 text-2xl mt-5">
        Recent transactions
      </h3>
      <div className="mt-10">
        <div className="">
          <div className="flex justify-between px-3">
            <h6 className="font-bold text-lg">Name</h6>
            <p className="font-bold text-lg">Amount</p>
          </div>
          {/* Transactions Container */}
          <div className="mt-3 h-[540px] overflow-y-scroll">
            <TransactionCard name="Lee" amount="300" />
            <TransactionCard name="Bee" amount="2300" />
            <TransactionCard name="Cee" amount="50" />
            <TransactionCard name="Dee" amount="30" />
            <TransactionCard name="Eee" amount="390" />
          </div>
        </div>
      </div>
    </div>
  );
};
