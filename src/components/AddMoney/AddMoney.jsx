import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { doc, getDoc, increment, updateDoc } from "firebase/firestore";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { auth, db } from "../../firebase/firebaseSDK/config";

import { IoIosSend } from "react-icons/io";

import { PaystackButton } from "react-paystack";

import toast, { Toaster } from "react-hot-toast";

export const Toast = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default function AddMoney() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);

  const { handleSubmit, reset } = useForm();

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
      toast.success("Transaction successful! Thank you for choosing us.", {
        style: {
          background: "#4caf50",
          color: "#fff",
          borderRadius: "10px",
          padding: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        icon: "✅",
      });
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

  const paystackConfig = {
    email: userDetails?.email || "",
    amount: amount * 100,
    currency: "GHS",
    publicKey: import.meta.env.VITE_REACT_PAYSTACK_SDK_CONFIG_PUBLIC_KEY,
    text: "Top Up",
    onSuccess: (reference) => {
      handlePaystackSuccessAction(reference);
      toast.success("Transaction successful! Thank you for choosing us.", {
        style: {
          background: "#4caf50",
          color: "#fff",
          borderRadius: "10px",
          padding: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        icon: "✅",
      });
    },
    onClose: () => {
      handlePaystackCloseAction();
      toast.error("Transaction cancelled! Don't miss out on great deals.", {
        style: {
          background: "#f44336",
          color: "#fff",
          borderRadius: "10px",
          padding: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        icon: "⚠️",
      });
    },
  };

  const handleFormSubmit = (data) => {
    console.log("Form submitted with data:", data);
    submitHandler(data);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        endContent={<IoIosSend />}
        className="rounded-sm col-span-1"
      >
        Add Money
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {() => (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Add Money
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Amount"
                  placeholder="Enter amount"
                  onChange={(e) => setAmount(Number(e.target.value))}
                  type="number"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <PaystackButton {...paystackConfig} />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
