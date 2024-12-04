import { useEffect } from 'react';
import HomeArea from '../../components/Home/HomeArea/HomeArea';
import Sidebar from '../../components/Other/Sidebar/Sidebar';
import { useAPI } from '../../utilities/useAPI';
import '../../App.css';

const Home = () => {
  const { question, answer, updateRequest, submitRequest } = useAPI();

  const updateNewRequest = (question: string, model: string, originality: number, corpus: string) => {
    updateRequest(question, model, originality, corpus);
  };

  useEffect(() => {
    if (question) {
      if (question.trim() !== '') {
        submitRequest();
      }
    }
  }, [question]);

  return (
    <div className="App">
      <div className="appContent">
        <Sidebar />
        <div className="chatAreaContainer">
          <HomeArea updateNewRequest={updateNewRequest} answer={answer} question={question} />
        </div>
      </div>
    </div>
  );
};

export default Home;
