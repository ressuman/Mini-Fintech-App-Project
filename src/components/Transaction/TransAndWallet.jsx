import AddMoney from "../AddMoney/AddMoney";
import SendMoney from "../SendMoney/SendMoney";

import PropTypes from "prop-types";

import { collection, onSnapshot, query, where } from "firebase/firestore";

import { useEffect, useState } from "react";

import { auth, db } from "../../firebase/firebaseSDK/config";

export const TransactionCard = ({ name, amount }) => {
  return (
    <div className="flex justify-between mt-3 bg-slate-100 px-3 py-2 rounded-md">
      <h6 className="font-semibold">{name}</h6>
      <p>GH₵{amount.toLocaleString()}</p>
    </div>
  );
};

TransactionCard.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export const TransAndWallet = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const userTransactionsRef = collection(db, "transactions");
      const q = query(
        userTransactionsRef,
        where("userId", "==", auth.currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const transactionsData = [];
        snapshot.forEach((doc) => {
          transactionsData.push(doc.data());
        });
        setTransactions(transactionsData);
      });

      return () => unsubscribe();
    }
  }, []);

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
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <TransactionCard
                  key={index}
                  name={transaction.name}
                  amount={transaction.amount}
                />
              ))
            ) : (
              <p className="text-center mt-5 text-slate-500">
                No transactions available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
