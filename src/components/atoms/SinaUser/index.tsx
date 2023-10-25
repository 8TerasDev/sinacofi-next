import React from "react";
import BotonPopover from "../BotonPopover";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useModalHandle from "../../../custom-hooks/useModalHandle";
import ModalPopover from "../../molecules/SinaUserModal";
import styles from "./sinauser.module.css";

type Props = {};

const SinaUser = ({ isOpen }: any) => {
  const { isModalOpen, handleClick } = useModalHandle();
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
              <h1 className={styles.profile_details_text}>Hola, Juan Pablo</h1>
              <p className={styles.profile_details_sub_text}>Banco Santander</p>
            </div>
          </div>
          <div className={styles.profile_actions}>
            <BotonPopover handleClick={handleClick}>
              <KeyboardArrowDownIcon />
            </BotonPopover>
            <ModalPopover isOpen={isModalOpen} handleClick={handleClick} />
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
