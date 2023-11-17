"use client"
import React, { useState } from 'react';
import { Button, CircularProgress, FormControl, Grid, Modal, Paper, Stack, TextField } from '@mui/material';
import Image from 'next/image';
import sinacofi_logo from '../../assets/images/sinacofi_logo.png';
import { useRouter } from 'next/navigation';
import { Home } from '@mui/icons-material';
import SinaText from '@/components/atoms/SinaText';
import axios from 'axios';

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

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setOpenModal(false);
    e.preventDefault();
    //const [nombre , codigo ] = e.target;

    const [name, lastName, email, bankCode, role, phone, password] = e.target;

    //console.log(nombre.value,codigo.value)
    // const data = await axios.post(
    //   `api/${type}`,{
    //   nombre: nombre.value,
    //   codigo: codigo.value
    // })
    const data = await axios.post(
      `api/${type}`,{
      nombre: name.value,
      lastName: lastName.value,
      email: email.value,
      bankCode: bankCode.value,
      role: role.value,
      phone: phone.value,
      password: password.value
    })
    setIsLoading(false);
    console.log(data);
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
                <SinaText>
                 {type}
                </SinaText>
              </Stack>
              <FormControl 
                fullWidth
                required
                component={'form'}
                onSubmit={handleSubmit}
                sx={{ justifyContent:'space-between', flex:1}}
                >
                  <Stack overflow={'auto'}>
                    <Grid container sx={{ justifyContent:'center', height:'100%', flex:1}} >
                      {type === 'createuser' && <><Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Nombre'
                          placeholder='Nombre'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Apellido'
                          placeholder='Apellido'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Email'
                          placeholder='Email'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='BankId'
                          placeholder='BankId'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Role'
                          placeholder='Role'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          variant='filled'
                          label='Telefono'
                          placeholder='Telefono'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Password'
                          placeholder='Password'
                          sx={{width:'100%'}}
                          id="password"
                          name="password"
                          autoComplete="password"
                          type={true ? "text" : "password"}
                          />  
                      </Grid> </>}
                      { type === 'createbank' && <>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Nombre'
                          placeholder='Nombre'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Codigo'
                          placeholder='Codigo'
                          sx={{width:'100%'}}
                          />  
                      </Grid></>}
                    </Grid>
                  </Stack>
                  <Stack padding={'10px'} flexDirection={'row'} justifyContent={'space-around'}>
                    <Button
                      sx={{width:'40%'}}
                      color='success'
                      variant='contained' 
                      type='submit'>
                      CREAR
                    </Button>
                    <Button
                      sx={{width:'40%'}}
                      fullWidth
                      color='inherit'
                      variant='contained' 
                      onClick={()=>setOpenModal(false)}>
                      Cerrar
                    </Button>
                  </Stack>
              </FormControl>
            </Paper>
        </Modal>
      </Stack>
    </Stack>

  )
}

export default AdminPage;