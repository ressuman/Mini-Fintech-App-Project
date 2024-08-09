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

import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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

export default function SendMoney() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const submitHandler = async (data) => {
    const { email, amount } = data;
    const amountNumber = Number(amount);

    if (amountNumber <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (userDetails.balance < amountNumber) {
      alert("Insufficient balance");
      return;
    }

    try {
      // Need to check if recipient exists
      const usersCollection = collection(db, "users");
      const recipientQuery = query(
        usersCollection,
        where("email", "==", email)
      );
      const recipientSnapshot = await getDocs(recipientQuery);

      if (recipientSnapshot.empty) {
        alert("Recipient not found");
        return;
      }

      const recipientDocRef = recipientSnapshot.docs[0].ref;

      // So here we will deduct amount from sender balance
      const senderDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(senderDocRef, {
        balance: increment(-amountNumber),
      });

      // Add that amount to recipient balance
      await updateDoc(recipientDocRef, {
        balance: increment(amountNumber),
      });

      toast.success(
        "Transaction successful!. Money sent successfully. Thank you for choosing us.",
        {
          style: {
            background: "#4caf50",
            color: "#fff",
            borderRadius: "10px",
            padding: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          icon: "✅",
        }
      );
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error("Error sending money:", error);
      toast.error("Transaction cancelled! Error sending money", {
        style: {
          background: "#f44336",
          color: "#fff",
          borderRadius: "10px",
          padding: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        icon: "⚠️",
      });
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        endContent={<IoIosSend />}
        className="rounded-sm col-span-1 "
      >
        Send Money
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(submitHandler)}>
              <ModalHeader className="flex flex-col gap-1">
                Send Money
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  type="email"
                  placeholder="Enter recipient's email"
                  variant="bordered"
                  {...register("email", { required: true })}
                  isInvalid={errors.email ? true : false}
                  errorMessage="Please enter a valid email"
                />
                <Input
                  label="Amount"
                  placeholder="Enter amount"
                  type="number"
                  variant="bordered"
                  {...register("amount", { required: true })}
                  isInvalid={errors.amount ? true : false}
                  errorMessage="Please enter a valid amount"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={errors ? null : onClose}
                  type="submit"
                  className="rounded-sm"
                >
                  Send
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
