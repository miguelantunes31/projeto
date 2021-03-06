import * as React from "react";
import { Grid, Button, Menu, MenuItem, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Paper, makeStyles } from '@material-ui/core';
import { useState } from "react";
import Todos from "./todos";

interface IList {
  name: string
  id: number
}

const useStyles = makeStyles(() => ({
  paper: {
    height: 30,
    width: "100%",
    color: "white",
    backgroundColor: "black"
  }
}));



export default function App() {


  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [newList, setNewList] = useState("");
  const [list, setLists] = useState<IList[]>([])
  const [open, setOpen] = React.useState(false);
  const [elemination, setEleminationt] = useState("");


  const handleClick = (event: { currentTarget: React.SetStateAction<any>; }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(null);
    setNewList("")
    event.preventDefault()
    if (list.length === 5) {
      return alert("Sem espaço para novas listas")
    } else if (newList !== "") {
      addList(newList);
      setNewList("");
    } else {
      return alert("Introduza um titulo")
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewList(e.target.value);
  };

  const eleminationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEleminationt(e.target.value)
  }

  const addList = (name: string) => {
    setLists([...list, { name, id: Math.random() }]);
  };



  const openConfirmation = () => {
    setOpen(true);
  };

  const closeConfirmation = () => {
    setOpen(false);
  };

  function deleteList() {
    let index: string = elemination;
    const newList = [...list]
    if (parseInt(index) % 1 === 0) {
      newList.splice(parseInt(index) - 1, 1)
      setLists(newList)
      setEleminationt("")
      setOpen(false);
    } else {
      alert("foi introduzido um numero errado ou nada")
      setEleminationt("")
      setOpen(false);
    }

  }



  return (

    <Grid>
      <Grid container justify="center" >

        <Button variant="contained" color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Adicionar Lista
        </Button>
        <Button onClick={openConfirmation}>Eliminar lista</Button>


        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Escolha a lista para eliminar</DialogTitle>
          <DialogContent>
            <TextField
              value={elemination}
              label="Numero da lista"
              onChange={eleminationChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeConfirmation} color="primary">
              Cancelar
          </Button>
            <Button onClick={deleteList} color="primary">
              Eleminar
          </Button>
          </DialogActions>
        </Dialog>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem >
            <TextField id="standard-basic" value={newList} onChange={handleChange} />
            <Button onClick={handleClose}>Adicionar titulo</Button>
          </MenuItem>
        </Menu>
      </Grid>
      <Typography paragraph />
      <Typography paragraph />
      <Typography paragraph />
      <Grid container spacing={3}>
        {list.map((item, index) => (
          <Grid container item xs={7} key={index}>
            <Paper square className={classes.paper}  >Lista {index + 1}</Paper>
            <Paper square className={classes.paper} elevation={3}>
              {item.name}
            </Paper>
            <Todos />
          </Grid>
        ))}
      </Grid>
    </Grid>

  );
}




