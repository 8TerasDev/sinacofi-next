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
import { Edit} from "@mui/icons-material";
import SinaText from "@/components/atoms/SinaText";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import axios from "@/common/http-client";
import { CreateUserForm } from "@/components/organisms/CreateUserForm";
import { CreateBankForm } from "@/components/organisms/CreateBankForm";
import { useGetUsers } from "@/custom-hooks/useGetUsers";
import { AdminStack } from "@/components/organisms/Admin";
import { useGetBanks } from "@/custom-hooks/useGetBanks";
import ButtonConfirm from "@/components/organisms/ButtonConfirm";
import { deleteBankById, enableBankById } from "@/common/bank";
import { deleteUserById, enableUserById } from "@/common/user";
import { EditUserForm } from "@/components/organisms/EditUserForm";
import { EditBankForm } from "@/components/organisms/EditBankForm";

// TODO: Create a customHook / actions in store to createUsers/Banks

export type CreateFormsProps = {
  handleSubmit: (input: any) => void;
  setOpenModal: (input: boolean) => void;
  banks?: any;
  isBankAdmin?: boolean;
  currentRow?: any;
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
    width:200
  },
  {
    field: "is_staff",
    headerName: "Es Staff",
  },
  {
    field: "bankName",
    headerName: "Banco",
    width:200
  },
];
const preColumnsBanks = [
  {
    field: "acciones",
    headerName: "Acciones",
    sortable: false,
    renderCell: ({ row }: any) => (
      <Stack flexDirection={'row'} flex={1} justifyContent={'space-around'}>
        <IconButton onClick={()=>row.updateBank(row)} sx={{padding:0}}>
          <Edit color='action' />
        </IconButton>
        <ButtonConfirm
          icon={isActive(row) ? <DeleteIcon /> : <RestoreFromTrashIcon />}
          title={row.nombre}
          message={
            isActive(row)
              ? "Al desactivar el banco no podra crear nuevos o usar usuarios con este banco"
              : "Esta acción permitira que el banco pueda usarse nuevamente"
          }
          handleDelete={async () => {
            if (isActive(row)) {
              await row.disableBank(row);
            } else {
              await row.enableBank(row);
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
    field: "nombre",
    headerName: "Nombre",
    width:300
  },
  {
    field: "codigo",
    headerName: "Codigo",
  },
];

const AdminPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showBanks, setShowBanks] = useState(false);
  const [currentRow, setCurrentRow] = useState<any>();
  const [error, setError] = useState(false);
  const [type, setType] = useState("");
  const { data: usersData, isLoading: usersLoading } = useGetUsers();
  const { data: banksData, isLoading: banksLoading } = useGetBanks();
  const [bankDataList, setBankDataList] = useState(banksData);
  const [userDataList, setUserDataList] = useState(usersData);

  const handleModal = (modalType: string) => {
    setIsLoading(true);
    setType(modalType);
    setOpenModal(true);
    setIsLoading(false);
  };

  const handleCreateBank = async (e: any) => {
    const [nombre, codigo] = e.target;
    const date = new Date();
    try {
      const data = {
        nombre: nombre.value,
        codigo: codigo.value,
        created_at: date.toISOString(),
      };
      const { data: banks, status } = await axios.post(`api/createbank`, data);
      if (status < 400) {
        setBankDataList(banks);
      } else {
        setError(banks.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditBank = async (e: any) => {
    const [nombre, codigo] = e.target;
    try {
      const data = {
        nombre: nombre.value,
        codigo: codigo.value,
      };
      const { data: banks } = await axios.put(`api/banks/${currentRow._id}`, data);
      setBankDataList(banks);
    
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateUser = async (e: any) => {
    const [
      { value: username },
      { value: first_name },
      { value: last_name },
      { value: email },
      { value: password },
      { value: nothing },
      { value: bank_id },
      { value: is_staff }
    ] = e.target;

    const date = new Date();
    try {
      const data = {
        username,
        first_name,
        last_name,
        email,
        is_superuser: false,
        is_staff: Boolean(is_staff),
        is_active: true,
        bank_id,
        password,
        date_joined: date.toISOString(),
      };

      const res = await axios.post(`api/createuser`, data);
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
      { value: bank_id },
      { value: is_staff }
    ] = e.target;

    try {
      const data = {
        username,
        first_name,
        last_name,
        email,
        is_staff: Boolean(is_staff),
        bank_id,
      };
      const res = await axios.put(`api/users/${currentRow._id}`, data);
      const newUsersList = res.data;
      setUserDataList(newUsersList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    setOpenModal(false);
    e.preventDefault();
    try {
      if (type === "createbank") {
        const res = await handleCreateBank(e);
      }
      if (type === "createuser") {
        const res = await handleCreateUser(e);
      }
      if (type === "edituser") {
        const res = await handleEditUser(e);
      }
      if (type === "editbank") {
        const res = await handleEditBank(e);
      }
    } catch (err) {
      console.log("Error", err);
    } finally {
      setIsLoading(false);
    }
  };



  const updateBankData = (_row: any) => {
    const data: any[] = [...(bankDataList || banksData || [])];
    const prev: any = data[_row.id];
    data[_row.id] = { ...prev, ..._row };
    setBankDataList(data as any);
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

  const enableBank = errorWrapper(async (row: any) => {
    await enableBankById(row?._id);
    updateBankData({ ...row, status: "ACTIVE" });
  });
  const enableUser = errorWrapper(async (row: any) => {
    await enableUserById(row?._id);
    updateUserData({ ...row, status: "ACTIVE" });
  });
  const disableBank = errorWrapper(async (row: any) => {
    await deleteBankById(row?._id);
    updateBankData({ ...row, status: "DISABLED" });
  });
  const disableUser = errorWrapper(async (row: any) => {
    await deleteUserById(row?._id);
    updateUserData({ ...row, status: "DISABLED" });
  });
  const updateUser = errorWrapper(async (row: any) => {
    handleModal('edituser')
    setCurrentRow(row);
  });
  const updateBank = errorWrapper(async (row: any) => {
    handleModal('editbank')
    setCurrentRow(row);
  });


  const addSetters = (row: any) => ({
    ...row,
    disableUser,
    enableUser,
    disableBank,
    enableBank,
    setError,
    updateUser,
    updateBank,
  });

  if (isLoading || usersLoading || banksLoading)
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
  const handleClose = () => {
    setError(false);
  };
  return (
    <Stack flex={1} height={"100vh"} padding={"15px"} width={'100%'}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
      >
        <Alert severity='warning'>{error}</Alert>
      </Snackbar>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        width={'100%'}
      >
        <Stack
          borderRadius={"5px"}
          justifyContent={"space-around"}
          width={"100%"}
        >
          <AdminStack
            title={"ADMINISTRAR USUARIOS"}
            handleModal={() => handleModal("createuser")}
            showTable={showUsers}
            tableColumns={preColumnsUsers}
            setShowTable={setShowUsers}
            dataTable={(userDataList || usersData || []).map(addSetters)}
            banks={bankDataList || banksData}
          />
          <Stack height={"15px"} />
          <AdminStack
            title={"ADMINISTRAR BANCOS"}
            handleModal={() => handleModal("createbank")}
            showTable={showBanks}
            tableColumns={preColumnsBanks}
            setShowTable={setShowBanks}
            dataTable={(bankDataList || banksData || []).map(addSetters)}
          />
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
                {type === "createuser" && "Crear Usuario"}
                {type === "createbank" && "Crear Banco"}
                {type === "edituser" && "Editar Usuario"}
              </SinaText>
            </Stack>
            {type === "createuser" && (
              <CreateUserForm
                banks={(bankDataList || banksData || []).filter(
                  (b: any) => b.status == "ACTIVE"
                )}
                handleSubmit={handleSubmit}
                setOpenModal={setOpenModal}
              />
            )}
            {type === "edituser" && (
              <EditUserForm
                banks={(bankDataList || banksData || []).filter(
                  (b: any) => b.status == "ACTIVE"
                )}
                handleSubmit={handleSubmit}
                setOpenModal={setOpenModal}
                currentRow={currentRow}
              />
            )}
            {type === "createbank" && (
              <CreateBankForm
                handleSubmit={handleSubmit}
                setOpenModal={setOpenModal}
              />
            )}
            {type === "editbank" && (
              <EditBankForm
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
