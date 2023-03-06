import React from "react";
import styles from "./index.module.scss";
import { useStores } from "../../stores";
import closeIcon from "../../assets/images/x-square.svg";
import { toast } from "react-toastify";
import alertIcon from "../../assets/images/alert-icon.svg";

export default function ModalDeleteAsset() {
  const {
    generalStore: { openModalDeleteAsset, setOpenModalDeleteAsset, assetsList, setAssetsList, assetToDelete },
  } = useStores();

  function handleCloseModal() {
    setOpenModalDeleteAsset(!openModalDeleteAsset);
  }

  function handleDeleteAsset() {
    const assetsIndex = assetsList.findIndex((asset) => asset._id === assetToDelete._id);

    assetsList.splice(assetsIndex, 1);

    setAssetsList([...assetsList]);

    toast.success(`O ativo ${assetToDelete.asset} foi excluído com sucesso!`, {
      toastId: "1",
    });

    handleCloseModal();
  }

  return (
    <div className={styles["modal-background"]}>
      <div className={styles["modal-container"]}>
        <div className={styles["asset-title"]}>
          <div className={styles["div-left"]}>
            <img src={alertIcon} />
            <h3>Deletar ativo?</h3>
          </div>
          <div className={styles["div-right"]} onClick={() => handleCloseModal()}>
            <img src={closeIcon} alt='close-icon' />
          </div>
        </div>
        <div className={styles["asset-body"]}>
          <p>
            Tem certeza que deseja excluir o ativo de identificador <strong>{`${assetToDelete.asset}?`}</strong>
          </p>
          <strong>Essa ação não poderá ser desfeita.</strong>
        </div>
        <div className={styles["asset-btns"]}>
          <button onClick={() => handleCloseModal()} className={styles["cancel"]} type='button'>
            Cancelar
          </button>
          <button onClick={() => handleDeleteAsset()} className={styles["delete"]} type='button'>
            Excluir ativo
          </button>
        </div>
      </div>
    </div>
  );
}
