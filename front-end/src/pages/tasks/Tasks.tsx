import '../../App.css';
import './Tasks.css';
import Sidebar from '../../components/sidebar-new/Sidebar';
import SettingsArea from '../../components/tasksArea/TasksArea';

const Tasks = () => {
  return (
    <div className="tasks">
      <Sidebar />
      <SettingsArea />
    </div>
  );
};

export default Tasks;
