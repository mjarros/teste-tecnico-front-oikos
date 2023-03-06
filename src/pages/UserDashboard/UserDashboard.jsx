import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import assetsIcon from "../../assets/images/assets-Icon.svg"
import boxArrowRight from "../../assets/images/box-arrow-right.svg"
import plusSquare from "../../assets/images/plus-square.svg"
import { ToastContainer, toast } from 'react-toastify';
import assetsArray from "../../assets/files/oikos_teste_frontend-lista_ativos.json"
import editIcon from "../../assets/images/pencil-square.svg"
import deleteIcon from "../../assets/images/trash.svg"
import arrowsBack from "../../assets/images/arrows-back.svg"
import arrowsForward from "../../assets/images/arrows-forward.svg"
import { useStores } from "../../stores";
import ModalDetailedAsset from "../../components/ModalDetailedAsset";
import ModalAddAsset from "../../components/ModalAddAsset";
import ModalEditAsset from "../../components/ModalEditAsset";
import ModalDeleteAsset from "../../components/ModalDeleteAsset";
import ModalLogOut from "../../components/ModalLogOut";

function UserDashboard() {

  const {
    generalStore: {
      openModalDetailedAsset,
      setOpenModalDetailedAsset,
      setDetailedAsset,
      assetsList,
      setAssetsList,
      openModalAddAsset,
      setOpenModalAddAsset,
      openModalEditAsset,
      setOpenModalEditAsset,
      setEditAsset,
      openModalDeleteAsset,
      setOpenModalDeleteAsset,
      setAssetToDelete,
      openModalLogOut,
      setopenModalLogOut
    }
  } = useStores()

  useEffect(() => {
    loadAssets()
    toast.success("Login realizado com sucesso!", {
      toastId: "1",
    });
  }, [])

  function loadAssets() {
    const data = JSON.parse(JSON.stringify(assetsArray))
    setAssetsList([...data])
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = assetsList.slice(indexOfFirstRecord,
    indexOfLastRecord);

  const nPages = Math.ceil(assetsList.length / recordsPerPage)
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)


  const nextPage = () => {
    if (currentPage !== nPages)
      setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage !== 1)
      setCurrentPage(currentPage - 1)
  }

  function handleOpenAssetDetail(asset) {
    setOpenModalDetailedAsset(!openModalDetailedAsset);
    setDetailedAsset({ ...asset })
  }

  function handleOpenModalAddAsset() {
    setOpenModalAddAsset(!openModalAddAsset)
  }

  function handleOpenModalEditAsset(asset) {
    setTimeout(() => {
      setOpenModalDetailedAsset(false);
    }, 0)
    setOpenModalEditAsset(!openModalEditAsset)
    setEditAsset({ ...asset })
  }

  function handleOpenModalDeleteAsset(asset) {
    setTimeout(() => {
      setOpenModalDetailedAsset(false);
    }, 0)
    setOpenModalDeleteAsset(!openModalDeleteAsset)
    setAssetToDelete({ ...asset })
  }

  return (
    <main className={styles["dashboard-container"]}>
      {openModalDetailedAsset && <ModalDetailedAsset />}
      {openModalAddAsset && <ModalAddAsset />}
      {openModalEditAsset && <ModalEditAsset />}
      {openModalDeleteAsset && <ModalDeleteAsset />}
      {openModalLogOut && <ModalLogOut />}
      <div className={styles["dashboard-first-div"]}>
        <div className={styles["header"]}>
          <div className={styles["header-div-left"]}>
            <img src={assetsIcon} alt="assets-icon" />
            <p>Financial Assets</p>
          </div>
          <div onClick={() => setopenModalLogOut(!openModalLogOut)} className={styles["header-div-right"]}>
            <img src={boxArrowRight} alt="logout-icon" />
            <p>Sair</p>
          </div>
        </div>
        <div className={styles["user-add-asset"]}>

          <div className={styles["div-left"]}>
            <h1>Olá, Tiago</h1>
            <p>Este é seu Dashboard de ativos</p>
          </div>

          <div className={styles["div-right"]}>
            <button
              type="button"
              onClick={() => handleOpenModalAddAsset()}
            >
              <img src={plusSquare} alt="add-asset-icon" />
              <p>Cadastrar Ativo</p>
            </button>
          </div>
        </div>
      </div>

      <div className={styles["dashboard-second-div"]}>
        <div className={styles["dashboard-central-div"]}>
          <div className={styles["assets-intro"]}>
            <p>Posição consolidada dos ativos</p>
          </div>
          <div className={styles["assets-display-div"]}>
            <div className={styles["table-header"]}>
              <span className={styles["company"]}>
                Empresa
              </span>
              <span className={styles["identifyer"]}>
                Identificador
              </span>
              <span className={styles["asset"]}>
                Tipo do Ativo
              </span>
              <span className={styles["price"]}>
                Valor
              </span>
            </div>

            <div className={styles["table-body"]}>
              {currentRecords.map((asset) => (
                <div onClick={() => handleOpenAssetDetail(asset)} className={styles["table-asset"]} key={asset.id}>
                  <span className={styles["asset-name"]}  >{asset.company}</span>
                  <span className={styles["asset-asset"]}  >{asset.asset}</span>
                  <div className={styles[asset.type === "opcao" ? "asset-type-opcao" : "asset-type-acao"]}>
                    <span >{asset.type === "opcao" ? "Opção" : "Ação"}</span>
                  </div>
                  <span className={styles["asset-price"]}  >R$ {asset.additionalInfo.unitPrice.toFixed(2).replace(".", ",")}</span>
                  <div className={styles["icons"]}>
                    <div onClick={() => handleOpenModalEditAsset(asset)} className={styles["edit"]}>
                      <img src={editIcon} alt="edit-icon" />
                      <span>
                        Editar
                      </span>
                    </div>
                    <div onClick={() => handleOpenModalDeleteAsset(asset)} className={styles["delete"]}>
                      <img src={deleteIcon} alt="delete-icon" />
                      <span>
                        Excluir
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <nav >
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a
                  className="page-link"
                  onClick={() => prevPage()}
                  href="#"
                >
                  <img src={arrowsBack} alt="arrows-page-back" />
                </a>
              </li>
              {pageNumbers.map((pgNumber) => (
                <li className={`page-item ${currentPage === pgNumber ? "active" : ""}`} key={pgNumber}>
                  <a
                    onClick={() => setCurrentPage(pgNumber)}
                    className="page-link"
                    href="#"
                  >
                    {pgNumber}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a
                  className="page-link"
                  onClick={() => nextPage()}
                  href="#"
                >
                  <img src={arrowsForward} alt="arrows-page-forward" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
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

export default UserDashboard;
