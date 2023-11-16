"use client"
import React, { useState } from 'react';
import { Button, FormControl, Grid, Modal, Paper, Stack, TextField } from '@mui/material';
import Image from 'next/image';
import sinacofi_logo from '../../assets/images/sinacofi_logo.png';
import { useRouter } from 'next/navigation';

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

  return(
    <Stack flex={1} height={'100vh'} padding={'15px'}>
      <Stack 
        borderRadius={'5px'}
        justifyContent={'space-between'} flexDirection={'row'} padding={'20px 40px'} boxShadow={'2px 4px 20px 2px rgba(0, 0, 0, 0.3);'}>
        <Button onClick={()=>route.push('/home')}>
          HOME
        </Button>
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
              <p> Crear usuario </p>
              <Button variant='contained' onClick={()=>handleModal('user')}>
                Crear
              </Button>
            </Stack>
          </Paper>
          <Paper>
            <Stack flexDirection={'row'} justifyContent={'space-around'} padding={'30px'}>
              <p> Crear Banco </p>
              <Button variant='contained' onClick={()=>handleModal('bank')}>
                Crear
              </Button>
            </Stack>
          </Paper>

        </Stack>
        <Modal
          sx={{ justifyContent:'center', display:'flex', alignItems:'center'}}
          open={openModal}
          onClose={()=>setOpenModal(false)}>
            <Paper sx={{height:'80%', width:'80%', padding:'20px'}}>
              <Stack justifyContent={'center'} alignItems={'center'}>
                <p>
                  {type}
                </p>
              </Stack>
              <FormControl 
                fullWidth
                required
                component={'form'}
                onSubmit={(e)=>{
                  //e.stopPropagation();
                  //e.preventDefault();
                  console.log(e.target[0].value)
                }}
                sx={{height:'100%', flex:1, justifyContent:'space-between'}}
                >
                  <Stack overflow={'scroll'}>
                    <Grid container sx={{ justifyContent:'center', height:'100%', flex:1}} >
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                      <Grid item sm={4} padding={'10px'}>
                        <TextField 
                          required 
                          variant='filled'
                          label='Username'
                          placeholder='Username'
                          sx={{width:'100%'}}
                          />  
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack padding={'10px'}>
                    <Button
                      fullWidth
                      variant='contained' 
                      type='submit'>
                      CREAR
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