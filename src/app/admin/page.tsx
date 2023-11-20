"use client"
import React, { useState } from 'react';
import { Button, CircularProgress, FormControl, Grid, Modal, Paper, Stack, TextField } from '@mui/material';
import Image from 'next/image';
import sinacofi_logo from '../../assets/images/sinacofi_logo.png';
import { useRouter } from 'next/navigation';
import { Home } from '@mui/icons-material';
import SinaText from '@/components/atoms/SinaText';
import axios from 'axios';
import { encryption } from '@/lib/utils';
import { CreateUserForm } from '@/components/organisms/CreateUserForm';
import { CreateBankForm } from '@/components/organisms/CreateBankForm';

// TODO: Create a customHook / actions in store to createUsers/Banks

export type CreateFormsProps = {
  handleSubmit: (input:any) => void;
  setOpenModal: (input:boolean) => void;
}

const AdminPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('');
  const route = useRouter();

  const handleModal = (modalType:string) => {
    setIsLoading(true);
    setType(modalType);
    setOpenModal(true);
    setIsLoading(false);
  }

  const handleCreateBank = async (e: any) => {
    const [nombre , codigo] = e.target;
    const data = await axios.post(
      `api/createbank`,{
      nombre: nombre.value,
      codigo: codigo.value
    })
  }

  const handleCreateUser = async (e:any) => {
    const [
      {value: username},
      {value: first_name},
      {value: last_name},
      {value: email},
      {value: bank_id},
      {value: password}
    ] = e.target;

    // TODO. Do it when DJANDO AUTH is done !
    // const encryptedPassword = encryption(password);
    const date = new Date();

    await axios.post(
      `api/createuser`,{
      username,
      first_name,
      last_name,
      email,
      is_superuser: false,
      is_staff: false,
      is_active: true,
      // bank_id: BigInt(9007199254740991),
      // bank_id,
      password,
      date_joined: date.toISOString()
    });
  }

  const handleSubmit = async (e:any) => {
    setIsLoading(true);
    setOpenModal(false);
    e.preventDefault();
    try{
      if(type === 'createbank'){
        const res = await handleCreateBank(e);
      }
      if(type === 'createuser'){
        const res = await handleCreateUser(e);
      }
    }
    catch(err){
      console.log('Error0',err);
    }
    finally{
      setIsLoading(false);
    }

  }

  if(isLoading) return (
    <Stack flex={1} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <CircularProgress/>
    </Stack>)

  return(
    <Stack flex={1} height={'100vh'} padding={'15px'}>
      <Stack 
        borderRadius={'5px'}
        justifyContent={'space-between'} flexDirection={'row'} padding={'20px 40px'} boxShadow={'2px 4px 20px 2px rgba(0, 0, 0, 0.3);'}>
        <Button
          variant='contained'
          color='success'
          startIcon={<Home/>}
          onClick={()=>route.push('/home')}>
          HOME
        </Button>
        <Stack justifyContent={'center'}>
          <SinaText size='mWide'>
            ADMINISTRADOR
          </SinaText>
        </Stack>
        <Image src={sinacofi_logo} alt="" width={180} />
      </Stack>
      <Stack height={'15px'} />
      <Stack
        justifyContent={'center'} 
        alignItems={'center'} 
        height={'100%'} 
        padding={'0px'} 
        >
        <Stack 
        borderRadius={'5px'}
        justifyContent={'space-around'} height={'100%'} width={'100%'} padding={'30px'} boxShadow={'2px 4px 20px 2px rgba(0, 0, 0, 0.3);'}>
          <Paper>
            <Stack flexDirection={'row'} justifyContent={'space-around'} padding={'30px'} >
            <SinaText size='sl'>
              CREAR USUARIO
            </SinaText>
              <Button 
                sx={{width:'200px'}}
                variant='contained' 
                onClick={()=>handleModal('createuser')}>
                Crear
              </Button>
            </Stack>
          </Paper>
          <Paper>
            <Stack flexDirection={'row'} justifyContent={'space-around'} padding={'30px'}>
            <SinaText size='sl'>
              CREAR BANCO
            </SinaText>
              <Button sx={{width:'200px'}} variant='contained' onClick={()=>handleModal('createbank')}>
                Crear
              </Button>
            </Stack>
          </Paper>

        </Stack>
        <Modal
          sx={{ justifyContent:'center', display:'flex', alignItems:'center'}}
          open={openModal}
          onClose={()=>setOpenModal(false)}>
            <Paper sx={{height:'80%', width:'80%', padding:'20px', overflow:'hidden', display:'flex', flexDirection:'column'}}>
              <Stack justifyContent={'center'} alignItems={'center'} padding={'20px'}>
                <SinaText size='mWide'>
                  {type === 'createuser' && 'Crear Usuario' }
                  {type === 'createbank' && 'Crear Banco' }
                </SinaText>
              </Stack>
              {type === 'createuser' && <CreateUserForm handleSubmit={handleSubmit} setOpenModal={setOpenModal}/>}
              {type === 'createbank' && <CreateBankForm handleSubmit={handleSubmit} setOpenModal={setOpenModal}/>}
            </Paper>
        </Modal>
      </Stack>
    </Stack>

  )
}

export default AdminPage;