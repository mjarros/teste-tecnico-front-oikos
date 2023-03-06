import { useState } from "react";

export function utilsStore() {
  const [openModalDetailedAsset, setOpenModalDetailedAsset] = useState(false);
  const [openModalAddAsset, setOpenModalAddAsset] = useState(false);
  const [openModalEditAsset, setOpenModalEditAsset] = useState(false);
  const [openModalDeleteAsset, setOpenModalDeleteAsset] = useState(false);
  const [openModalLogOut, setopenModalLogOut] = useState(false);
  const [editAsset, setEditAsset] = useState({
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
  const [detailedAsset, setDetailedAsset] = useState("");
  const [assetsList, setAssetsList] = useState([]);
  const [assetToDelete, setAssetToDelete] = useState({});
  const [logoutDone, setLogoutDone] = useState(false);

  return {
    openModalDetailedAsset,
    setOpenModalDetailedAsset,
    detailedAsset,
    setDetailedAsset,
    assetsList,
    setAssetsList,
    openModalAddAsset,
    setOpenModalAddAsset,
    openModalEditAsset,
    setOpenModalEditAsset,
    editAsset,
    setEditAsset,
    openModalDeleteAsset,
    setOpenModalDeleteAsset,
    assetToDelete,
    setAssetToDelete,
    openModalLogOut,
    setopenModalLogOut,
    logoutDone,
    setLogoutDone,
  };
}
