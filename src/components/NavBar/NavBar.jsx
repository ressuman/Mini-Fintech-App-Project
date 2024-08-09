import { User } from "@nextui-org/react";

import { useEffect, useState } from "react";

import { MdAccountBalanceWallet } from "react-icons/md";

import { auth, db } from "../../firebase/firebaseSDK/config";
import { doc, getDoc } from "firebase/firestore";

export const NavBar = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User data not found in Firestore");
        }
      } else {
        setUserDetails(null);
        console.log("User is not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  const { firstName = "", lastName = "", email = "" } = userDetails || {};

  return (
    <nav className="p-3 grid grid-cols-12">
      <div className="col-span-2 flex items-center relative">
        <div className="flex gap-x-2 items-center">
          <MdAccountBalanceWallet className="text-3xl" />
          <h3 className="font-bold">Ressuman FinTech Bank App</h3>
        </div>
        <div className="bg-slate-200 h-[40px] w-[2px] rounded-3xl absolute right-2"></div>
      </div>
      <div className="col-span-8 flex items-center">
        <p className="text-xl">
          Hey {firstName && `${firstName} ${lastName}`} 👋, Welcome back to your
          Secure Banking Dashboard.
        </p>
      </div>
      <div className="col-span-2 flex items-center pl-5">
        <User
          name={`${firstName} ${lastName}`}
          description={email ? `Account: ${email}` : "Your secure account"}
          avatarProps={{
            src: "https://plus.unsplash.com/premium_photo-1675242132036-36da2715b88e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGZpbmFuY2V8ZW58MHx8MHx8fDA%3D",
          }}
          className="object-cover"
        />
      </div>
    </nav>
  );
};
