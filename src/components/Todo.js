import {
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";

const Todo = () => {
  const initial = JSON.parse(localStorage.getItem("todos")) || [];
  const [todo, setTodo] = useState(initial);
  const [filterTodo, setFilterTodo] = useState([]);
  const [input, setInput] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const updatedTodo = (title, id, completed) => {
    const newtTodo = todo.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodo(newtTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      setTodo([...todo, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
    } else {
      updatedTodo(input, editTodo.id, editTodo.completed);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (val) => {
    setAnchorEl(null);
    if (val === "completed") {
      setFilterTodo(todo.filter((todo) => todo.completed === true));
    } else if (val === "uncompleted") {
      setFilterTodo(todo.filter((todo) => todo.completed === false));
    } else {
      setFilterTodo([]);
    }
  };

  return (
    <Box mt={12} width="100%" maxWidth="550px">
      <Paper>
        <Box display="flex" p={1.5} sx={{ backgroundColor: "#e0e0e0" }}>
          <Box flexGrow={1}>
            <Typography variant="h5">Todo List</Typography>
          </Box>
          <Button onClick={handleMenu}>
            <FilterAltIcon color="warning" />
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose("completed")}>
              Completed
            </MenuItem>
            <MenuItem onClick={() => handleClose("uncompleted")}>
              Uncompleted
            </MenuItem>
            <MenuItem onClick={handleClose}>All</MenuItem>
          </Menu>
        </Box>
        <Box display="flex" p={1}>
          <Box mr={2} width="100%">
            <TextField
              fullWidth
              label="Enter todo"
              variant="outlined"
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              disabled={input === ""}
              onClick={handleSubmit}
            >
              {editTodo ? "OK" : "Submit"}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            maxHeight: 500,
            overflowY: "scroll",
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
          }}
        >
          <Paper>
            <Box p={1.5}>
              {todo.length === 0 ? (
                <Typography variant="subtitle1">No Todo...</Typography>
              ) : filterTodo.length !== 0 ? (
                <TodoList
                  todo={filterTodo}
                  setTodo={setFilterTodo}
                  setEditTodo={setEditTodo}
                />
              ) : (
                <TodoList
                  todo={todo}
                  setTodo={setTodo}
                  setEditTodo={setEditTodo}
                />
              )}
            </Box>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};

export default Todo;
