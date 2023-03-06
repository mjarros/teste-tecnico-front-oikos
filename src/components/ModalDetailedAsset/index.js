import React from "react";
import styles from "./index.module.scss";
import { useStores } from "../../stores";
import closeIcon from "../../assets/images/x-square.svg";

export default function ModalDetailedAsset() {
  const {
    generalStore: { openModalDetailedAsset, setOpenModalDetailedAsset, detailedAsset },
  } = useStores();

  function handleCloseModal() {
    setOpenModalDetailedAsset(!openModalDetailedAsset);
  }

  return (
    <div className={styles["modal-background"]}>
      <div className={styles["modal-container"]}>
        <div className={styles["asset-title"]}>
          <p>Detalhamento do ativo</p>
          <div onClick={() => handleCloseModal()}>
            <img src={closeIcon} alt='close-icon' />
          </div>
        </div>
        <div className={styles["asset-container"]}>
          <div className={styles["asset-item"]}>
            <div>
              <h3>Nome da Empresa</h3>
            </div>
            <span>{detailedAsset.company}</span>
          </div>
          <div className={styles["asset-item"]}>
            <div>
              <h3>Identificador</h3>
            </div>
            <span>{detailedAsset.asset ? detailedAsset.asset : "-"}</span>
          </div>
          <div className={styles["asset-item"]}>
            <div>
              <h3>Tipo do Ativo</h3>
            </div>
            <span className={styles[detailedAsset.type === "opcao" ? "asset-opcao" : "asset-acao"]}>{detailedAsset.type === "opcao" ? "Opção" : "Ação"}</span>
          </div>
          <div className={styles["asset-item"]}>
            <div>
              <h3>Lote Padrão</h3>
            </div>
            <span>{detailedAsset.additionalInfo.allotmentSize ? detailedAsset.additionalInfo.allotmentSize : "-"}</span>
          </div>
          <div className={styles["asset-item"]}>
            <div>
              <h3>Valor por ação</h3>
            </div>
            <span>R$ {detailedAsset.additionalInfo.unitPrice.toFixed(2).replace(".", ",") ? detailedAsset.additionalInfo.unitPrice.toFixed(2).replace(".", ",") : "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
