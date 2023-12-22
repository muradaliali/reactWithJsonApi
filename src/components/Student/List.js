import { Typography,Box,makeStyles,TableContainer,
    Table,TableBody,TableCell,TableHead,TableRow,Paper,IconButton,
    Tooltip} from '@material-ui/core';
    import { blueGrey,orange } from '@material-ui/core/colors';
    import VisibilityIcon from '@material-ui/icons/Visibility';
    import EditIcon from '@material-ui/icons/Edit';
    import DeleteIcon from '@material-ui/icons/Delete';
    import { Link } from 'react-router-dom';
    import axios from "axios";
    import {useState,useEffect} from "react";
    import React from 'react';
    const useStyle =makeStyles({
        studentListColor: {
            backgroundColor: orange[400],
            color :'white'
        },
        tableHeadCell: {
            backgroundColor: blueGrey[400],
            color :'white'
        }
    })

const List =() =>{
    const classes = useStyle();
    const [students, setStudents] = useState([]);
    useEffect(()=>{
        async function getAllstudent(){
            try{
            const students = await axios.get("http://localhost:3333/students")
            // console.log(students.data);
            setStudents(students.data);
            }catch(error){
                console.log("something is wrong");
            }
        }
        getAllstudent();
    })
    const handleDelete = async id =>{
        await axios.delete(`http://localhost:3333/students/${id}`);
        // work on filter data use for new data after delete
        var newStudent = students.filter((item)=>{
       return item.id !== id;
        })
        setStudents(newStudent);
    }
    return(
    <>
   <Box textAlign="center" p={2} className={classes.studentListColor}>
<Typography variant='h4'>Student List</Typography>
</Box>
<TableContainer component={Paper}>
<Table>
<TableHead>
    <TableRow style={{backgroundColor :"#616161"}}>
        <TableCell align='center' className={classes.tableHeadCell}>No</TableCell>
        <TableCell align='center' className={classes.tableHeadCell}>Name</TableCell>
        <TableCell align='center' className={classes.tableHeadCell}>Email</TableCell>
        <TableCell align='center' className={classes.tableHeadCell}>Action</TableCell>
    </TableRow>
</TableHead>
<TableBody>
    {students.map((student, i) =>{
    return(
        <TableRow key={i} >
        <TableCell align='center'>{i +1}</TableCell>
        <TableCell align='center'>{student.stuname}</TableCell>
        <TableCell align='center'>{student.email}</TableCell>
        <TableCell align='center'>
        <Tooltip title="View">
        <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon
        color="primary" /></Link></IconButton>  
        </Tooltip>
        <Tooltip title="Edit">
        <IconButton><Link to={`/edit/${student.id}`}><EditIcon /></Link></IconButton>  
        </Tooltip>
        <Tooltip title="Delete">
        <IconButton onClick={() => handleDelete(student.id)}><DeleteIcon color="secondary" /> </IconButton>  
        </Tooltip>
        </TableCell>
    </TableRow>
    )
    })
  }
    
</TableBody>
</Table>
</TableContainer>
    </>
    )
}
export default List;


