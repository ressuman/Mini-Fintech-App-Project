# Mini Fintech App

This is a mini fintech application that allows users to sign up, log in, add money, and send money using Paystack. The app also features a dashboard where users can view their transaction history. Firebase is used as the backend for authentication and database management.

## Features

- **User Authentication**: Sign up, log in, and log out functionality using Firebase Authentication.
- **Dashboard**: View user details and transaction history.
- **Add Money**: Integrate Paystack to add money to the user's account.
- **Send Money**: Transfer money to other users via Paystack.
- **Transaction History**: Maintain a record of all transactions (amount and history) in Firebase Firestore.

## Technologies Used

- **Frontend**: React.js (or any other frontend framework/library)
- **Backend**: Firebase Authentication and Firestore
- **Payment Gateway**: Paystack

### Getting Started

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/mini-fintech-app.git
cd mini-fintech-app
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the application**:

```bash
npm start
```

### Usage

1. **Sign Up**:

   - Navigate to the Sign Up page.
   - Enter your full name, email, and password.
   - Click the Sign Up button to create an account.

2. **Log In**:

   - Navigate to the Log In page.
   - Enter your email and password.
   - Click the Log In button to access your dashboard.

3. **Dashboard**:

   - View your user details and transaction history.

4. **Add Money**:

   - Navigate to the Add Money page.
   - Enter the amount you wish to add.
   - Click the Add Money button to initiate the Paystack transaction.

5. **Send Money**:

   - Navigate to the Send Money page.
   - Enter the recipient's email and the amount to send.
   - Click the Send Money button to initiate the Paystack transfer.

6. **Log Out**:
   - Click the Log Out button to sign out of your account.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

#### Gif

Here is an expected gif of the preview of the App(Mini Fintech Bank App)

## ![Mini Fintech Bank App gif](./src/assets/mini-fintech-bank-app.gif)

---

**Note**: Ensure you replace placeholders like `YOUR_API_KEY`, `YOUR_PAYSTACK_PUBLIC_KEY`, and `YOUR_PAYSTACK_SECRET_KEY` with your actual keys from Firebase and Paystack.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
