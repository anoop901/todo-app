import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { Task, TaskCollection } from "../api/Task";
import { TaskDetailsForm } from "./TaskDetailsForm";
import { NewTaskForm } from "./NewTaskForm";
import { TaskList } from "./TaskList";
import "./TasksView.css";

export function TasksView() {
  const tasks = useTracker(() => TaskCollection.find().fetch());
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [currentMenu, setCurrentMenu] = useState<
    "TaskDetails" | "NewTask" | null
  >(null);
  return (
    <div className="TasksView">
      <div className="TasksViewMain">
        <div className="NewTaskButtonRow">
          <button
            disabled={currentMenu === "NewTask"}
            className="NewTaskButton"
            onClick={() => {
              setCurrentMenu("NewTask");
              setSelectedTaskId(null);
            }}
          >
            New Task
          </button>
        </div>
        <TaskList
          tasks={tasks}
          selectedTaskId={selectedTaskId}
          setSelectedTaskId={(newSelectedTaskId) => {
            setCurrentMenu("TaskDetails");
            setSelectedTaskId(newSelectedTaskId);
          }}
        />
      </div>
      {currentMenu === "NewTask" ? (
        <NewTaskForm
          closeForm={() => {
            setCurrentMenu(null);
            setSelectedTaskId(null);
          }}
        />
      ) : null}
      {currentMenu === "TaskDetails" && selectedTaskId !== null ? (
        <TaskDetailsForm
          task={TaskCollection.findOne({ _id: selectedTaskId })!}
          closeForm={() => {
            setCurrentMenu(null);
            setSelectedTaskId(null);
          }}
        />
      ) : null}
    </div>
  );
}
