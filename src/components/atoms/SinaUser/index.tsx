import React, { useContext, useEffect, useState } from "react";
import BotonPopover from "../BotonPopover";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useModalHandle from "../../../custom-hooks/useModalHandle";
import ModalPopover from "../../molecules/SinaUserModal";
import styles from "./sinauser.module.css";
import axios from "@/common/http-client";
import { Avatar, Button } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import { NewDeclaracionesContext } from "@/contexts/new-declaraciones.context";

type Props = {};

const SinaUser = ({ isOpen }: any) => {
  const { handleOpenNotificacionBar } = useContext(NewDeclaracionesContext);

  const { isModalOpen, handleClick } = useModalHandle();
  const [data, setData] = useState({
    name: "",
    lastName: "",
    email: "",
    bank: "",
  });
  const getProfile = async () => {
    try {
      const { data } = await axios.get("/api/auth/getprofile");
      setData(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      {isOpen && (
        <div className={styles.profile_container}>
          <div className={styles.profile_details}>
            <Avatar sx={{ bgcolor: deepOrange[400] }}>{data.name.slice(0, 2).toUpperCase()}</Avatar>
            <div>
              <h1 className={styles.profile_details_text}>Hola, {data.name}</h1>
              <p className={styles.profile_details_sub_text}>
                <Button sx={{padding:'0'}} onClick={handleOpenNotificacionBar}>{data.bank ?? "-"}</Button>
              </p>
            </div>
          </div>
          <div className={styles.profile_actions}>
            <BotonPopover handleClick={handleClick}>
              <KeyboardArrowDownIcon />
            </BotonPopover>
            <ModalPopover
              isOpen={isModalOpen}
              handleClick={handleClick}
              data={data}
            />
          </div>
        </div>
      )}
      {!isOpen && <Avatar sx={{ bgcolor: deepOrange[400] }}>{data.name.slice(0, 2).toUpperCase()}</Avatar>}
    </>
  );
};

export default SinaUser;
