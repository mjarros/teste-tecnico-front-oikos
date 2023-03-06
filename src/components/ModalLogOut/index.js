import React from "react";
import styles from "./index.module.scss";
import { useStores } from "../../stores";
import closeIcon from "../../assets/images/x-square.svg";
import { useNavigate } from "react-router-dom";

export default function ModalLogOut() {
  const {
    generalStore: { openModalLogOut, setopenModalLogOut, logoutDone, setLogoutDone },
  } = useStores();

  const navigate = useNavigate();

  function handleCloseModal() {
    setopenModalLogOut(!openModalLogOut);
  }

  function handleUserLogout() {
    navigate("/");
    setLogoutDone(!logoutDone);
    handleCloseModal();
  }

  return (
    <div className={styles["modal-background"]}>
      <div className={styles["modal-container"]}>
        <div className={styles["asset-title"]}>
          <div className={styles["div-left"]}>
            <h3>Logout</h3>
          </div>
          <div className={styles["div-right"]} onClick={() => handleCloseModal()}>
            <img src={closeIcon} alt='close-icon' />
          </div>
        </div>
        <div className={styles["asset-body"]}>
          <p>Tem certeza que deseja fazer o logout?</p>
        </div>
        <div className={styles["asset-btns"]}>
          <button onClick={() => handleCloseModal()} className={styles["cancel"]} type='button'>
            Cancelar
          </button>
          <button onClick={() => handleUserLogout()} className={styles["delete"]} type='button'>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
