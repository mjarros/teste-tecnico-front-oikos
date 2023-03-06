import React from "react";
import styles from "./index.module.scss";
import { useStores } from "../../stores";
import closeIcon from "../../assets/images/x-square.svg";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ModalAddAsset() {
  const {
    generalStore: { openModalAddAsset, setOpenModalAddAsset, assetsList, setAssetsList },
  } = useStores();

  const [form, setForm] = useState({
    _id: "",
    company: "",
    asset: "",
    type: "",
    additionalInfo: {
      allotmentSize: "",
      unitPrice: "",
      operation: "",
    },
  });

  function handleCloseModal() {
    setOpenModalAddAsset(!openModalAddAsset);
  }

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    switch (name) {
      case "_id":
      case "company":
      case "asset":
      case "type":
        setForm((formAsset) => ({
          ...formAsset,
          [name]: value,
        }));
        break;
      case "allotmentSize":
      case "unitPrice":
      case "operation":
        setForm((formAsset) => ({
          ...formAsset,
          additionalInfo: {
            ...formAsset.additionalInfo,
            [name]: value,
          },
        }));
        break;

      default:
    }
  };

  function handleAddAsset() {
    let newForm = { ...form };

    const { unitPrice, allotmentSize } = form.additionalInfo;

    const newUnitPrice = parseFloat(unitPrice);
    const newAllotmentSize = parseFloat(allotmentSize);

    setForm({
      ...form,
      additionalInfo: {
        ...form.additionalInfo,
        unitPrice: newUnitPrice,
        allotmentSize: newAllotmentSize,
      },
    });

    newForm = {
      ...form,
      _id: Math.floor(Math.random() * 50),
      additionalInfo: {
        ...form.additionalInfo,
        unitPrice: newUnitPrice,
        allotmentSize: newAllotmentSize,
      },
    };

    setAssetsList([...assetsList, newForm]);

    toast.success(`Ativo ${form.asset} adicionado com sucesso!`, {
      toastId: "1",
    });

    handleCloseModal();
  }

  return (
    <div className={styles["modal-background"]}>
      <div className={styles["modal-container"]}>
        <div className={styles["asset-title"]}>
          <div className={styles["div-left"]}>
            <h3>Cadastrar ativo</h3>
            <p>Preencha as informações do ativo para cadastrar</p>
          </div>
          <div className={styles["div-right"]} onClick={() => handleCloseModal()}>
            <img src={closeIcon} alt='close-icon' />
          </div>
        </div>
        <div className={styles["asset-body"]}>
          <div className={styles["company"]}>
            <span>Nome da empresa</span>
            <input placeholder='Nome da empresa*' onChange={(e) => handleChange(e)} name='company' type='text' value={form.company} />
          </div>
          <div className={styles["identifyer"]}>
            <span>Identificador</span>
            <input placeholder='Identificador*' onChange={(e) => handleChange(e)} name='asset' type='text' value={form.asset} />
          </div>
          <div className={styles["type"]}>
            <span>Tipo do ativo</span>
            <select placeholder='Tipo do ativo*' onChange={(e) => handleChange(e)} name='type'>
              {!form.type ? (
                <option key='3' value=''>
                  Tipo do ativo*
                </option>
              ) : null}
              <option key='1' value='acao'>
                Ação
              </option>
              <option key='2' value='opcao'>
                Opção
              </option>
            </select>
          </div>

          {form.company && form.asset && form.type && (
            <>
              <div className={styles["batch"]}>
                <span>Lote padrão</span>
                <input placeholder='Lote padrão*' onChange={(e) => handleChange(e)} name='allotmentSize' type='number' value={form.additionalInfo.allotmentSize} />
              </div>
              <div className={styles["price"]}>
                <span>{form.type === "opcao" ? "Valor por opção" : "Valor por ação"}</span>
                <input placeholder={form.type === "opcao" ? "Valor por opção*" : "Valor por ação*"} onChange={(e) => handleChange(e)} name='unitPrice' type='number' value={form.additionalInfo.unitPrice} />
              </div>
            </>
          )}
        </div>
        <div className={styles["asset-btns"]}>
          <button onClick={() => handleCloseModal()} className={styles["cancel"]} type='button'>
            Cancelar
          </button>
          <button disabled={form.company && form.type && form.asset && form.additionalInfo.allotmentSize && form.additionalInfo.unitPrice ? null : "disabled"} onClick={() => handleAddAsset()} className={styles["add"]} type='button'>
            Cadastrar Ativo
          </button>
        </div>
      </div>
    </div>
  );
}
