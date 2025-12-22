import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { FiEdit, FiPlus } from "react-icons/fi";
import EditTaskModal from "./EditTaskModal";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTasks } from "../../hooks/useTasks";
import TasksPage from "../pages/TasksPage";

const ProjectTasksSection = ({ project }) => {
  return <TasksPage />
};

export default ProjectTasksSection;
