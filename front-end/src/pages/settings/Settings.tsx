import '../../App.css';
import './Settings.css';
import Sidebar from '../../components/sideBar/Sidebar';
import SettingsArea from '../../components/settingsArea/SettingsArea';

const Settings = () => {
  return (
    <div className="settings">
      <Sidebar />
      <SettingsArea />
    </div>
  );
};

export default Settings;
