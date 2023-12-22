import { Typography,Box,makeStyles,Grid,TextField,Button } from '@material-ui/core';
import { deepPurple, green } from '@material-ui/core/colors';
import List from '../Student/List';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
const useStyle =makeStyles({
    headingColor:{
        background: deepPurple[400],
        color :'white'
    },
    addStuColor: {
        backgroundColor: green[400],
        color :'white'
    }
})
const Home = () => {
    const classes = useStyle();
    const [student,setStudent]=useState({
      stuname:"",
      email:""
    });
    const [status, setStatus] =useState();
    // changer
    function onTextChane(e){
      setStudent({
        ...student,
        [e.target.name]: e.target.value  
      })
    }

    async function onFormSubmit(e) {
      e.preventDefault();
      try {
        await axios.post(`http://localhost:3333/students`, student);
        setStatus(true);
      } catch (error) {
        console.log("something is wrong", error);
      }
    }
    if (status){
      return <Home />
    }
  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={2}>
        <Typography variant='h2'>React crud with APi Call</Typography>
      </Box>
      <Grid container justifyContent= "center" spacing={4}>
        <Grid item md={6} xs={12}>
            <Box textAlign="center" p={2} className={classes.addStuColor}
            mb ={2}>
                <Typography variant='h4'>Add Student</Typography>
            </Box>
            <form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField autoComplete='stuname' name='stuname'  
                        variant='outlined' required fullWidth id='stuname'
                        label = 'Name' onChange={e =>onTextChane(e)}/>
                </Grid>
                    <Grid item xs={12} >
                        <TextField autoComplete='email' name='email'  
                        variant='outlined' required fullWidth id='email'
                        label = 'EMail Address' onChange={e =>onTextChane(e)} />
                    </Grid>
                </Grid>
                <Box m={3}>
<Button type='submit' variant='contained' 
color='primary' fullWidth onClick={e=> onFormSubmit(e)}>Add</Button>
</Box>
</form>
</Grid>
<Grid item md={6} xs={12}>
    <List />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;