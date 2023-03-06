import React from "react";
import styles from "./index.module.scss";
import assetsIcon from "../../assets/images/assets-Icon.svg"
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

function Login() {

  return (
    <main className={styles["login-container"]}>
      <div className={styles["login-div-left"]}>
        <img src={assetsIcon} alt="assets-icon" />
        <p>Financial Assets</p>
      </div>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}

export default Login;
