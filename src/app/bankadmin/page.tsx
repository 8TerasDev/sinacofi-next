"use client";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Snackbar,
  Stack,
} from "@mui/material";
import Image from "next/image";
import sinacofi_logo from "../../assets/images/sinacofi_logo.png";
import { useRouter } from "next/navigation";
import { Edit, Home } from "@mui/icons-material";
import SinaText from "@/components/atoms/SinaText";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import axios from "@/common/http-client";
import { CreateUserForm } from "@/components/organisms/CreateUserForm";
import { useGetProfile } from "@/custom-hooks/useGetProfile";
import { AdminStack } from "@/components/organisms/Admin";
import ButtonConfirm from "@/components/organisms/ButtonConfirm";
import { deleteUserById, enableUserById } from "@/common/user";
import { useGetUsersSameBank } from "@/custom-hooks/useGetUsersSameBank";
import { EditUserForm } from "@/components/organisms/EditUserForm";

export type CreateFormsProps = {
  handleSubmit: (input: any) => void;
  setOpenModal: (input: boolean) => void;
  banks?: any;
};

const isActive = (row: any) => row.status === "ACTIVE";

const preColumnsUsers = [
  {
    field: "acciones",
    headerName: "Acciones",
    sortable: false,
    renderCell: ({ row }: any) => (
      <Stack flexDirection={'row'} flex={1} justifyContent={'space-around'}>
        <IconButton onClick={()=>row.updateUser(row)} sx={{padding:0}}>
          <Edit color='action' />
        </IconButton>
        <ButtonConfirm
          icon={isActive(row) ? <DeleteIcon /> : <RestoreFromTrashIcon />}
          title={`${row.first_name} ${row.last_name}`}
          message={
            isActive(row)
              ? "Al desactivar el usaurio este no podra usarse"
              : "Esta acción permitira que el usuario pueda usarse nuevamente"
          }
          handleDelete={async () => {
            if (isActive(row)) {
              await row.disableUser(row);
            } else {
              await row.enableUser(row);
            }
          }}
        />

      </Stack>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    renderCell: ({ row }: any) => {
      return (
        row.status && (
          <Chip
            label={row.status.toLowerCase()}
            color={row.status === "ACTIVE" ? "success" : undefined}
            variant='outlined'
          />
        )
      );
    },
  },
  {
    field: "username",
    headerName: "Username",
  },
  {
    field: "first_name",
    headerName: "Nombre",
  },
  {
    field: "last_name",
    headerName: "Apellido",
  },
  {
    field: "email",
    headerName: "Email",
  },
  {
    field: "is_staff",
    headerName: "Es Staff",
  },
  {
    field: "bank_id",
    headerName: "Banco",
  },
  {
    field: "telefono",
    headerName: "Telefono",
  },
];

const AdminPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState("");
  const route = useRouter();
  const { data: userData, isLoading: loading }: any = useGetProfile();
  const { data: usersData, isLoading: usersLoading } = useGetUsersSameBank();
  const [userDataList, setUserDataList] = useState(usersData);
  const [currentRow, setCurrentRow] = useState<any>();

  const handleCloseSnack = () => setOpenSnack(false);
  const handleOpenSnack = (type: string) => {
    if(type === 'success'){
      setOpenSnack(true);
    }
  }

  const handleModal = (modalType: string) => {
    setIsLoading(true);
    setType(modalType);
    setOpenModal(true);
    setIsLoading(false);
  };


  const handleCreateUser = async (e: any) => {
    const [
      { value: username },
      { value: first_name },
      { value: last_name },
      { value: email },
      { value: telefono},
      { value: password },
    ] = e.target;

    const date = new Date();
    try {
      const data = {
        username,
        first_name,
        last_name,
        email,
        telefono,
        is_superuser: false,
        is_staff: false,
        is_active: true,
        password,
        date_joined: date.toISOString(),
      };

      const res = await axios.post(`api/users/createuser/samebank`, data);
      if (res.status < 400) {
        const newUsersList = res.data;
        setUserDataList(newUsersList);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditUser = async (e: any) => {
    const [
      { value: username },
      { value: first_name },
      { value: last_name },
      { value: email },
      { value: telefono},
    ] = e.target;

    try {
      const data = {
        username,
        first_name,
        last_name,
        telefono,
        email,
        bank_id: currentRow.bank_id,
        sameBank: true,
      };
      const res = await axios.put(`api/users/${currentRow._id}`, data);
      const newUsersList = res.data;
      setUserDataList(newUsersList);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setOpenModal(false);
    try {
      if (type === "createuser") {
        const res = await handleCreateUser(e);
      }
      if (type === "edituser") {
        const res = await handleEditUser(e);
      }
      handleOpenSnack('success');
    } catch (err) {
      console.log("Error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError(false);
  };


  const updateUserData = (_row: any) => {
    const data: any[] = [...(userDataList || usersData || [])];
    const prev: any = data[_row.id];
    data[_row.id] = { ...prev, ..._row };
    setUserDataList(data as any);
  };

  const errorWrapper = (callback: any) => {
    return async (args: any) => {
      try {
        return await callback(args);
      } catch (ex: any) {
        debugger;
        setError(ex.message);
      }
    };
  };


  const enableUser = errorWrapper(async (row: any) => {
    await enableUserById(row?._id);
    updateUserData({ ...row, status: "ACTIVE" });
  });

  const disableUser = errorWrapper(async (row: any) => {
    await deleteUserById(row?._id);
    updateUserData({ ...row, status: "DISABLED" });
  });

  const updateUser = errorWrapper(async (row: any) => {
    handleModal('edituser')
    setCurrentRow(row);
  });

  const addSetters = (row: any) => ({
    ...row,
    disableUser,
    enableUser,
    setError,
    updateUser
  });


  if (loading || isLoading || usersLoading )
  return (
    <Stack
      flex={1}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress />
    </Stack>
  );


  return (
    <Stack flex={1} height={"100vh"} padding={"15px"}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
      >
        <Alert severity='warning'>{error}</Alert>
      </Snackbar>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert severity="success"> Operacion realizada con exito </Alert>
      </Snackbar>
      <Stack
        borderRadius={"5px"}
        justifyContent={"space-between"}
        flexDirection={"row"}
        padding={"20px 40px"}
        boxShadow={"2px 4px 20px 2px rgba(0, 0, 0, 0.3);"}
      >
        <Button
          variant='contained'
          color='success'
          startIcon={<Home />}
          onClick={() => route.push(`/home`)}
        >
          HOME
        </Button>
        <Stack justifyContent={"center"}>
          <SinaText size='mWide'>ADMINISTRADOR</SinaText>
        </Stack>
        <Image src={sinacofi_logo} alt='' width={180} />
      </Stack>
      <Stack height={"15px"} />
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        paddingTop={"10px"}
      >
        <Stack
          borderRadius={"5px"}
          justifyContent={"space-around"}
          width={"100%"}
          padding={"30px"}
          boxShadow={"2px 4px 20px 2px rgba(0, 0, 0, 0.3);"}
        >
        <AdminStack
          title={"ADMINISTRAR USUARIOS"}
          handleModal={() => handleModal("createuser")}
          tableColumns={preColumnsUsers}
          dataTable={(userDataList || usersData || []).map(addSetters)}
          isLoading={usersLoading}
        />
        <Stack height={"15px"} />
        </Stack>
        <Modal
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Paper
            sx={{
              height: "80%",
              width: "80%",
              padding: "20px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              padding={"20px"}
            >
              <SinaText size='mWide'>
                Crear Usuario
              </SinaText>
            </Stack>
            {type === "createuser" && (
              <CreateUserForm
                handleSubmit={handleSubmit}
                setOpenModal={setOpenModal}
                isBankAdmin={userData?.isBankAdmin}
              />
            )}
            {type === "edituser" && (
              <EditUserForm
                handleSubmit={handleSubmit}
                setOpenModal={setOpenModal}
                currentRow={currentRow}
              />
            )}
          </Paper>
        </Modal>
      </Stack>
    </Stack>
  );
};

export default AdminPage;
