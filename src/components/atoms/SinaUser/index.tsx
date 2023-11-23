import React, { useEffect, useState } from "react";
import BotonPopover from "../BotonPopover";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useModalHandle from "../../../custom-hooks/useModalHandle";
import ModalPopover from "../../molecules/SinaUserModal";
import styles from "./sinauser.module.css";
import axios from "axios";

type Props = {};

const SinaUser = ({ isOpen }: any) => {
  const { isModalOpen, handleClick } = useModalHandle();
  const [data, setData] = useState({
    name: '',
    lastName: '',
    email: '',
    bank: '',
  });
  const getProfile = async () => {
    try {
      const config = {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
      const { data } = await axios.get("/api/auth/getprofile", config);
      setData(data.user);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile();
  }, [])
  return (
    <>
      {isOpen && (
        <div className={styles.profile_container}>
          <div className={styles.profile_details}>
            <img
              className={styles.profile_details_images}
              src="https://placehold.co/45x45"
              alt=""
            />
            <div>
              <h1 className={styles.profile_details_text}>Hola, {data.name}</h1>
              <p className={styles.profile_details_sub_text}>Banco Santander</p>
            </div>
          </div>
          <div className={styles.profile_actions}>
            <BotonPopover handleClick={handleClick}>
              <KeyboardArrowDownIcon />
            </BotonPopover>
            <ModalPopover isOpen={isModalOpen} handleClick={handleClick} data={data} />
          </div>
        </div>
      )}
      {!isOpen && (
        <img
          className={styles.profile_details_images}
          src="https://placehold.co/45x45"
          alt=""
        />
      )}
    </>
  );
};

export default SinaUser;
