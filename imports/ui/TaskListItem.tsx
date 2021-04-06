import {
  Box,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { Task, TaskCollection } from "../api/Task";
import "./TaskListItemStyles.css";

export function TaskListItem({
  task,
  onClick,
  selected,
}: {
  task: Task;
  onClick?: () => void;
  selected: boolean;
}) {
  return (
    <ListItem
      className="TaskListItem"
      button
      selected={selected}
      onClick={onClick}
    >
      <ListItemIcon>
        <Checkbox
          color="default"
          className={classNames({
            TaskListItemCheckboxDropped: task.state === "dropped",
          })}
          disabled={task.state === "dropped"}
          checked={task.state === "complete"}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            const checked = e.currentTarget.checked;
            if (checked) {
              TaskCollection.update(
                { _id: task._id },
                { $set: { state: "complete" } }
              );
            } else {
              TaskCollection.update(
                { _id: task._id },
                { $set: { state: "pending" } }
              );
            }
          }}
        />
      </ListItemIcon>
      <ListItemText
        className={classNames({
          TaskListItemTextComplete: task.state === "complete",
          TaskListItemTextDropped: task.state === "dropped",
        })}
      >
        <Box fontWeight={task.state === "pending" ? "bold" : "normal"}>
          {task.name}
        </Box>
      </ListItemText>
    </ListItem>
  );
}
