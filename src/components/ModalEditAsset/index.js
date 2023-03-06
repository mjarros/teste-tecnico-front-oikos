import React from "react";
import styles from "./index.module.scss";
import { useStores } from "../../stores";
import closeIcon from "../../assets/images/x-square.svg";
import { toast } from "react-toastify";

export default function ModalEditAsset() {
  const {
    generalStore: { openModalEditAsset, setOpenModalEditAsset, assetsList, setAssetsList, editAsset, setEditAsset },
  } = useStores();

  function handleCloseModal() {
    setOpenModalEditAsset(!openModalEditAsset);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "_id":
      case "company":
      case "asset":
      case "type":
        setEditAsset((formAsset) => ({
          ...formAsset,
          [name]: value,
        }));
        break;
      case "allotmentSize":
      case "unitPrice":
      case "operation":
        setEditAsset((formAsset) => ({
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

  function handleEditAsset() {
    let newForm = { ...editAsset };

    let { unitPrice, allotmentSize } = editAsset.additionalInfo;

    const newUnitPrice = parseFloat(unitPrice);
    const newAllotmentSize = parseFloat(allotmentSize);

    setEditAsset({
      ...editAsset,
      additionalInfo: {
        ...editAsset.additionalInfo,
        unitPrice: newUnitPrice,
        allotmentSize: newAllotmentSize,
      },
    });

    newForm = {
      ...editAsset,
      additionalInfo: {
        ...editAsset.additionalInfo,
        unitPrice: newUnitPrice,
        allotmentSize: newAllotmentSize,
      },
    };

    const assetsIndex = assetsList.findIndex((asset) => asset._id === editAsset._id);

    assetsList.splice(assetsIndex, 1, newForm);

    setAssetsList([...assetsList]);

    toast.success(`Ativo ${editAsset.asset} editado com sucesso!`, {
      toastId: "1",
    });

    handleCloseModal();
  }

  return (
    <div className={styles["modal-background"]}>
      <div className={styles["modal-container"]}>
        <div className={styles["asset-title"]}>
          <div className={styles["div-left"]}>
            <h3>Editar ativo</h3>
            <p>Preencha as informações para editar o ativo</p>
          </div>
          <div className={styles["div-right"]} onClick={() => handleCloseModal()}>
            <img src={closeIcon} alt='close-icon' />
          </div>
        </div>
        <div className={styles["asset-body"]}>
          <div className={styles["company"]}>
            <span>Nome da empresa</span>
            <input className={styles["input-disabled"]} disabled='disabled' placeholder='Nome da empresa*' onChange={(e) => handleChange(e)} name='company' type='text' value={editAsset.company} />
          </div>
          <div className={styles["identifyer"]}>
            <span>Identificador</span>
            <input className={styles["input-disabled"]} disabled='disabled' placeholder='Identificador*' onChange={(e) => handleChange(e)} name='asset' type='text' value={editAsset.asset} />
          </div>
          <div className={styles["type"]}>
            <span>Tipo do ativo</span>
            <input className={styles["input-disabled"]} disabled='disabled' placeholder='Identificador*' onChange={(e) => handleChange(e)} name='asset' type='text' value={editAsset.type === "acao" ? "Ação" : "Opção"} />
          </div>

          <div className={styles["batch"]}>
            <span>Lote padrão</span>
            <input placeholder='Lote padrão*' onChange={(e) => handleChange(e)} name='allotmentSize' type='number' value={editAsset.additionalInfo.allotmentSize} />
          </div>
          <div className={styles["price"]}>
            <span>{editAsset.type === "opcao" ? "Valor por opção" : "Valor por ação"}</span>
            <input placeholder={editAsset.type === "opcao" ? "Valor por opção*" : "Valor por ação*"} onChange={(e) => handleChange(e)} name='unitPrice' type='number' value={editAsset.additionalInfo.unitPrice} />
          </div>
        </div>
        <div className={styles["asset-btns"]}>
          <button onClick={() => handleCloseModal()} className={styles["cancel"]} type='button'>
            Cancelar
          </button>
          <button onClick={() => handleEditAsset()} className={styles["add"]} type='button'>
            Salvar edição
          </button>
        </div>
      </div>
    </div>
  );
}
