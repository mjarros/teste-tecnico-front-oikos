import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import closedEye from "../../assets/images/closed-eye.png"
import openedEye from "../../assets/images/opened-eye.png"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStores } from "../../stores";

function LoginInputs() {

  const [showPassord, setShowPassord] = useState(false)
  const [mockUser, setMockUser] = useState({
    email: "usuario@email.com",
    password: "123456"
  })
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const {
    generalStore: { logoutDone, setLogoutDone },
  } = useStores();

  useEffect(() => {
    handleLogoutMessage()
  }, [])

  function handleLogoutMessage() {
    if (logoutDone) {
      toast.success("Logout realizado com sucesso!", {
        toastId: "1"
      })

      setLogoutDone(!logoutDone)
    }
  }

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleNavigateToAccessCode() {
    if ((form.email === mockUser.email) && (form.password === mockUser.password)) {
      navigate("/login/codigo-acesso")
    } else {
      toast.error("Usuário e/ou senha incorretos!", {
        toastId: "1"
      })
    }
  }

  return (
    <div className={styles["login-div-right"]}>
      <div className={styles["login-div"]}>
        <div className={styles["login-header"]}>
          <h2>Faça o Login para acessar sua conta</h2>
          <h3>Informe seu email e senha</h3>
        </div>
        <div className={styles["login-inputs-button"]}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.name}
            onChange={(e) => handleChange(e)}
          />

          <div className={styles['password-input']}>
            <input
              placeholder="Senha"
              name="password"
              value={form.password}
              type={showPassord === false ? 'password' : 'text'}
              onChange={(e) => handleChange(e)}
            />
            <button
              type="button"
              onClick={() => setShowPassord(!showPassord)}
            >
              <img src={showPassord === false ? closedEye : openedEye} alt="Visibilidade senha" />
            </button>
          </div>
          <button onClick={() => handleNavigateToAccessCode()} type="button" >Entrar</button>
        </div>
      </div>
    </div>
  );
}

export default LoginInputs;
