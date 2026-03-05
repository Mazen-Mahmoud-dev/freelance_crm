import { useState } from "react";
import { useDeleteTask, useTasks } from "../../hooks/useTasks";
import { useFilteredTasks } from "../../hooks/useFilteredTasks";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TasksFilters from "../components/TasksFilters";
import Skeleton from "../../components/skeletons/Skeleton";
import EditTaskModal from './../components/EditTaskModal';
import ConfirmDeleteModal from './../../components/modals/ConfirmDeleteModal';

const TasksPage = ({ project }) => {

  const { data: tasks = [], isLoading, isError } = useTasks(project.id);

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const { mutate: deleteTask, isModalLoading } = useDeleteTask();

  const filteredTasks = useFilteredTasks(tasks, filter, sortBy);

  if (isLoading) return <Skeleton />;
  if (isError) return <div className="text-red-500">Failed to load tasks.</div>;

  return (
    <div className="bg-bg py-12">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-foreground">Tasks</h1>

        <Link
          to={`/projects/${project.id}/tasks/add`}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Add Task
        </Link>
      </div>

      <TasksFilters
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {filteredTasks.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={setTaskToEdit}
              onDelete={setTaskToDelete}
            />
          ))}

        </div>

      ) : (

        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No tasks yet.</p>
        </div>

      )}

      {taskToDelete && (
        <ConfirmDeleteModal
          item={taskToDelete}
          isOpen={true}
          onClose={() => setTaskToDelete(null)}
          deleteMutation={{ mutate: deleteTask, isModalLoading }}
          title="Delete Task"
        />
      )}

      {taskToEdit && (
        <EditTaskModal
          isOpen={true}
          onClose={() => setTaskToEdit(null)}
          task={taskToEdit}
          title="Update Task"
        />
      )}

    </div>
  );
};
export default TasksPage