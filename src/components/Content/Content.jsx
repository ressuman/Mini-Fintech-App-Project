import { Card, CardBody } from "@nextui-org/react";

import { LineChart } from "../Chart/LineChart";

import PropTypes from "prop-types";

import { useEffect, useState } from "react";

import { auth, db } from "../../firebase/firebaseSDK/config";

import { doc, onSnapshot } from "firebase/firestore";

export const CardStats = ({ text, label }) => {
  return (
    <Card className="min-w-44" shadow="none">
      <CardBody>
        <h3
          className={`${
            text ? "font-bold text-2xl" : "font-bold text-2xl text-slate-300"
          }`}
        >
          {text ? `GH₵${text}` : "No data"}
        </h3>
        <p className="mt-2 text-xl text-slate-400">{label}</p>
      </CardBody>
    </Card>
  );
};

CardStats.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default function Content() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log("User data not found in Firestore");
          }
          setLoading(false);
        });
        return unsubscribeSnapshot; // Cleanup function to unsubscribe from onSnapshot
      } else {
        setUserDetails(null); // Clear userDetails if no user is authenticated
        console.log("User is not logged in");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from onAuthStateChanged
  }, []);

  return (
    <div className="h-full p-5">
      <div className="grid grid-cols-4 gap-2 mb-10 items-center justify-center">
        <div>
          <p className="text-sm font-bold uppercase">Your total balance</p>
          <p className="mt-4 text-sm text-slate-400">Stats</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase">Your savings balance</p>
          <p className="mt-4 text-sm text-slate-400">Stats</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase">Your investments</p>
          <p className="mt-4 text-sm text-slate-400">Stats</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase">Your total debt</p>
          <p className="mt-4 text-sm text-slate-400">Stats</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 items-center justify-center">
        {loading ? (
          <p>loading</p>
        ) : (
          <CardStats
            text={
              userDetails?.balance === 0
                ? "0"
                : userDetails?.balance.toLocaleString("en-US")
            }
            label="Total Balance"
          />
        )}
        <CardStats text="100,000" label="Savings Balance" />
        <CardStats text="50,000" label="Investments" />
        <CardStats text="20,000" label="Total Debt" />
      </div>
      <div className="mt-10">
        <LineChart />
      </div>
    </div>
  );
}
