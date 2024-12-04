import '../../App.css';
import './SettingsPage.css';
import Sidebar from '../../components/Other/Sidebar/Sidebar';
import SettingsArea from '../../components/Settings/SettingsArea/SettingsArea';

const Settings = () => {
  return (
    <div className="settingsPage">
      <Sidebar />
      <SettingsArea />
    </div>
  );
};

export default Settings;
