import React, { useRef } from "react";
import { Box, Button, Paper } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TodoList = ({ todo, setTodo, setEditTodo }) => {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleComplete = (item) => {
    setTodo(
      todo.map((items) => {
        if (items.id === item.id) {
          return { ...items, completed: !items.completed };
        }
        return items;
      })
    );
  };

  const handleEdit = ({ id }) => {
    const find = todo.find((todo) => todo.id === id);
    setEditTodo(find);
  };

  const handleDelete = ({ id }) => {
    setTodo(todo.filter((todo) => todo.id !== id));
  };

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...todo];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTodo(copyListItems);
  };
  return (
    <>
      {todo?.map((item, index) => (
        <Paper
          sx={{ margin: 1, padding: 1 }}
          elevation={3}
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={drop}
          key={index}
          draggable
        >
          <Box display="flex">
            <Box
              flexGrow={1}
              style={{
                textDecoration: `${item.completed ? "line-through" : ""}`,
              }}
            >
              {item.title}
            </Box>

            <Box mr={2}>
              <Button
                size="small"
                onClick={() => handleComplete(item)}
                sx={{
                  display: "inline-block",
                  padding: 0,
                  minHeight: 0,
                  minWidth: 0,
                }}
              >
                <CheckCircleIcon color="info" />
              </Button>
            </Box>
            <Box mr={2}>
              <Button
                size="small"
                onClick={() => handleEdit(item)}
                sx={{
                  display: "inline-block",
                  padding: 0,
                  minHeight: 0,
                  minWidth: 0,
                }}
              >
                <EditNoteOutlinedIcon color="success" />
              </Button>
            </Box>
            <Box mr={1}>
              <Button
                size="small"
                onClick={() => handleDelete(item)}
                sx={{
                  display: "inline-block",
                  padding: 0,
                  minHeight: 0,
                  minWidth: 0,
                }}
              >
                <DeleteOutlineOutlinedIcon color="error" />
              </Button>
            </Box>
          </Box>
        </Paper>
      ))}
    </>
  );
};

export default TodoList;
