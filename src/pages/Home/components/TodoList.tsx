import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useToDo } from '../../../context/TodoProvider';
import { ToDo } from '../../../models/ToDo';
import { useNavigate } from 'react-router-dom';

export default function TodoList() {
  const [value, setValue] = React.useState<string>('');
  const [rendersNumber, setRendersNumber] = React.useState<number>(0);

  const navigate = useNavigate();

  const { addTodo, deleteTodo, data, completeTodo } = useToDo();

  const handleAddTask = () => {
    if (!!value) {
      addTodo(value);
      setValue('');
    }
  };

  const handleDeleteTask = (row: ToDo) => {
    deleteTodo(row.id);
  };

  const handleViewDetails = (row: ToDo) => {
    navigate(`/details/${row.id}`);
  };

  const list = React.useMemo(() => {
    setRendersNumber(prev => prev + 1);
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell align="right">¿ Completed ?</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: ToDo) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={row.completed}
                    onClick={() => completeTodo(row.id)}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleViewDetails(row)}>
                    <ManageSearchIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTask(row)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [data]);

  return (
    <>
      <Box display="flex" alignItems="center">
        <Button variant="contained" onClick={handleAddTask}>
          Añadir Tarea
        </Button>
        <TextField
          id="outlined-controlled"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
        />
        (note that grid also does not render while typing)
      </Box>
      <Box component="div" sx={{ marginTop: 2 }}>
        <h3>Grid render number: {rendersNumber}</h3>
        {list}
      </Box>
    </>
  );
}
