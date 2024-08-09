import { useDisclosure } from "@nextui-org/react";

import { doc, getDoc, increment, updateDoc } from "firebase/firestore";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { auth, db } from "../../firebase/firebaseSDK/config";

import { IoIosSend } from "react-icons/io";

export default function AddMoney() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const submitHandler = (data) => {
    console.log("Form data:", data);
  };

  const handlePaystackSuccessAction = async (response) => {
    console.log("Payment successful:", response);
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        balance: increment(amount),
      });
      alert("Payment successful");
      onOpenChange(false);
      reset();
    } catch (error) {
      console.log("Error updating balance:", error);
    }
  };

  const handlePaystackCloseAction = () => {
    console.log("Payment closed");
    alert("Payment closed");
  };

  return <div></div>;
}
