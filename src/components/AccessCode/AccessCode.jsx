import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import arrowLeft from "../../assets/images/arrow-left.svg"
import { useNavigate } from "react-router-dom";

function LoginAccessCode() {
  const [form, setForm] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  })

  const [mockUser, setMockUser] = useState({
    code: "123456",
  })

  const navigate = useNavigate()

  useEffect(() => {
    toast.success("Usuário e senha validados!", {
      toastId: "1"
    })
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleValidateAccessCode() {
    const newCodeArray = Object.values(form)

    const joinedNewCodeArray = newCodeArray.join(" ").replaceAll(" ", "")

    if (parseInt(joinedNewCodeArray, 10) === parseInt(mockUser.code, 10)) {
      navigate("/user-dashboard")
    } else {
      toast.error("O código fornecido é inválido!", {
        toastId: "1"
      })
    }

  }

  return (
    <div className={styles["access-div-right"]}>
      <div className={styles["access-div"]}>
        <div className={styles["access-header"]}>
          <h2>Valide seu acesso inserindo o código</h2>
          <h3>Enviamos um código para seu email</h3>
        </div>
        <div className={styles["access-inputs-button"]}>
          <div className={styles["access-inputs-div"]}>
            <form>
              <input
                name="input1"
                type="text"
                placeholder=""
                value={form.input1}
                onChange={(e) => handleChange(e)}
                maxLength="1"
              />
              <input
                name="input2"
                type="text"
                placeholder=""
                value={form.input2}
                onChange={(e) => handleChange(e)}
                maxLength="1"
              />

              <input
                name="input3"
                type="text"
                placeholder=""
                value={form.input3}
                onChange={(e) => handleChange(e)}
                maxLength="1"
              />

              <input
                name="input4"
                type="text"
                placeholder=""
                value={form.input4}
                onChange={(e) => handleChange(e)}
                maxLength="1"
              />
              <input
                name="input5"
                type="text"
                placeholder=""
                value={form.input5}
                onChange={(e) => handleChange(e)}
                maxLength="1"
              />
              <input
                name="input6"
                type="text"
                placeholder=""
                value={form.input6}
                onChange={(e) => handleChange(e)}
                maxLength="1"
              />
            </form>
            <p>O código é válido por 5 minutos</p>
          </div>
          <button onClick={() => handleValidateAccessCode()} type="button" >Entrar</button>
        </div>
      </div>
      <div
        className={styles["div-top-return"]}
        onClick={() => navigate("/login")}
      >
        <img src={arrowLeft} alt="arrow-go-back" />
        <p>Voltar para login</p>
      </div>
    </div>
  );
}

export default LoginAccessCode;
