import { Typography,Box,makeStyles,Grid,TextField,Button } from '@material-ui/core';
import {deepPurple} from '@material-ui/core/colors';
import { useState, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';
const useStyle =makeStyles({
    headingColor:{
        background: deepPurple[400],
        color :'white'
    },
})
const Edit = () => {
    const classes = useStyle();
    const {id} = useParams();
    const [student, setStudent] = useState({
      stuname: "",
      email: ""
    });
    useEffect(()=>{
      async function getstudent(){
        try{
        const student = await axios.get(`http://localhost:3333/students/${id}`)
        setStudent(student.data);
        }catch(error){
            console.log("something is wrong");
        }
    } 
      getstudent()
  })
   function onTextChange(e){
      setStudent({
        ...student,
        [e.target.name]: e.target.value  
      })
    }
  async function onFormSubmit(e){
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3333/students/${id}`, student);
    } catch (error) {
      console.log("something is wrong", error);
    }
  }
  const navigate = useNavigate();
const handleClick = () => {
  navigate('/');
}
  return (
    <>
      <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
        <Typography variant='h2'>React crud with APi Call</Typography>
      </Box>
      <Grid container justifyContent= "center" spacing={4}>
        <Grid item md={6} xs={12}>
            <Box textAlign="center" p={2} className={classes.addStuColor}
            mb={2}>
                <Typography variant='h4'>Edit Student</Typography>
            </Box>
            <form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} >
                        <TextField autoComplete='id' name='id'  
                        variant='outlined' required fullWidth id='id'
                        label = 'ID'  autoFocus value={id} disabled />
                </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField autoComplete='stuname' name='stuname'  
                        variant='outlined' required fullWidth id='stuname'
                        label = 'Name' value={student.stuname} onChange={e => onTextChange(e)} />
                </Grid>
                    <Grid item xs={12} >
                        <TextField autoComplete='email' name='email'  
                        variant='outlined' required fullWidth id='email'
                        label = 'EMail Address' value={student.email} onChange={e => onTextChange(e)} />
                    </Grid>
                </Grid>
                <Box m={3}>
<Button type='button' variant='contained' 
color='primary' fullWidth onClick={e =>onFormSubmit(e)}>Update</Button>
</Box>
</form>
<Box m={3} textAlign="center">
  <Button variant='contained' color='primary' onClick={handleClick}>Back to Home</Button>
</Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Edit;