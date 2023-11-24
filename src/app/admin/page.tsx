"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  Modal,
  Paper,
  Snackbar,
  Stack,
} from "@mui/material";
import Image from "next/image";
import sinacofi_logo from "../../assets/images/sinacofi_logo.png";
import { useRouter } from "next/navigation";
import { Home } from "@mui/icons-material";
import SinaText from "@/components/atoms/SinaText";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import axios from "@/common/http-client";
import { CreateUserForm } from "@/components/organisms/CreateUserForm";
import { CreateBankForm } from "@/components/organisms/CreateBankForm";
import { useGetProfile } from "@/custom-hooks/useGetProfile";
import { useGetUsers } from "@/custom-hooks/useGetUsers";
import { AdminStack } from "@/components/organisms/Admin";
import { useGetBanks } from "@/custom-hooks/useGetBanks";
import ButtonConfirm from "@/components/organisms/ButtonConfirm";
import { deleteBankById, enableBankById } from "@/common/bank";
import { deleteUserById, enableUserById } from "@/common/user";

// TODO: Create a customHook / actions in store to createUsers/Banks

export type CreateFormsProps = {
  handleSubmit: (input: any) => void;
  setOpenModal: (input: boolean) => void;
  banks?: any;
};

const isActive = (row: any) => row.status === "ACTIVE";

const preColumnsUsers = [
  {
    field: "acciones",
    name: "Acciones",
    sortable: false,
    renderCell: ({ row }: any) => (
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
    ),
  },
  {
    field: "status",
    name: "Status",
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
    name: "Username",
  },
  {
    field: "first_name",
    name: "Nombre",
  },
  {
    field: "last_name",
    name: "Apellido",
  },
  {
    field: "email",
    name: "Email",
  },
  {
    field: "is_staff",
    name: "Es Staff",
  },
  {
    field: "bank_id",
    name: "Banco",
  },
];
const preColumnsBanks = [
  {
    field: "acciones",
    name: "Acciones",
    sortable: false,
    renderCell: ({ row }: any) => (
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
    ),
  },
  {
    field: "status",
    name: "Status",
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
    name: "Nombre",
  },
  {
    field: "codigo",
    name: "Codigo",
  },
];

const AdminPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [showBanks, setShowBanks] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState("");
  const route = useRouter();
  const { data, isLoading: loading } = useGetProfile();
  const { data: usersData, isLoading: usersLoading } = useGetUsers();
  const { data: banksData, isLoading: banksLoading } = useGetBanks();
  const [bankDataList, setBankDataList] = useState(banksData);
  const [userDataList, setUserDataList] = useState(usersData);

  useEffect(() => {
    // TODO. REFACTOR. Better use Middleware
    if (data) {
      // @ts-ignore
      !data.isAdmin && route.push(`/home`);
      setIsLoading(loading);
    }
  }, [data]);

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

  const handleCreateUser = async (e: any) => {
    const [
      { value: username },
      { value: first_name },
      { value: last_name },
      { value: email },
      { value: bank_id },
      { value: password },
    ] = e.target;

    // TODO. Do it when DJANDO AUTH is done !
    // const encryptedPassword = encryption(password);
    const date = new Date();
    try {
      const data = {
        username,
        first_name,
        last_name,
        email,
        is_superuser: false,
        is_staff: false,
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
    } catch (err) {
      console.log("Error", err);
    } finally {
      setIsLoading(false);
    }
  };

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

  const addSetters = (row: any) => ({
    ...row,
    disableUser: disableUser,
    enableUser: enableUser,
    disableBank: disableBank,
    enableBank: enableBank,
    setError: setError,
  });

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
          {!showBanks && (
            <AdminStack
              title={"ADMINISTRAR USUARIOS"}
              handleModal={() => handleModal("createuser")}
              showTable={showUsers}
              tableColumns={preColumnsUsers}
              setShowTable={setShowUsers}
              dataTable={(userDataList || usersData || []).map(addSetters)}
              banks={bankDataList || banksData}
            />
          )}
          <Stack height={"15px"} />
          {!showUsers && (
            <AdminStack
              title={"ADMINISTRAR BANCOS"}
              handleModal={() => handleModal("createbank")}
              showTable={showBanks}
              tableColumns={preColumnsBanks}
              setShowTable={setShowBanks}
              dataTable={(bankDataList || banksData || []).map(addSetters)}
            />
          )}
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
            {type === "createbank" && (
              <CreateBankForm
                handleSubmit={handleSubmit}
                setOpenModal={setOpenModal}
              />
            )}
          </Paper>
        </Modal>
      </Stack>
    </Stack>
  );
};

export default AdminPage;
