import { useState, useEffect } from 'react';
import { useTemperature } from '../../../utilities/useTemperature';
import { useCorpus } from '../../../utilities/useCorpus';
import './ConfigSettings.css';

interface ConfigSettingsInterface {
  sendSettings: (settings: { model: string; temperature: number; corpus: string }) => void;
}

const ConfigSettings: React.FC<ConfigSettingsInterface> = ({ sendSettings }) => {
  const [model, setModel] = useState<string>('gpt-4o-mini');
  const [originality, setOriginality] = useState<string>('genuanceerd');
  const [corpusTitle, setCorpusTitle] = useState<string>('geen');
  const [corpus, setCorpus] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0.5);

  const corpusObj = useCorpus(corpusTitle);
  const temperatureObj = useTemperature(originality);

  useEffect(() => {
    if (corpusObj.corpus !== corpus) {
      setCorpus(corpusObj.corpus);
    }
  }, [corpusObj, corpus]);

  useEffect(() => {
    if (temperatureObj.temperature !== temperature) {
      setTemperature(temperatureObj.temperature);
    }
  }, [temperatureObj, temperature]);

  useEffect(() => {
    sendSettings({ model, temperature, corpus });
  }, [model, temperature, corpus]);

  return (
    <>
      <label className="title">Parameters</label>
      <label>Model</label>
      <div className="parameters">
        <label className={`custom-button ${model === 'gpt-3.5-turbo' ? 'active' : ''}`}>
          <input type="radio" value="gpt-3.5-turbo" checked={model === 'gpt-3.5-turbo'} onChange={(e) => setModel(e.target.value)} />
          GPT-3.5 Turbo
        </label>
        <label className={`custom-button ${model === 'gpt-4o-mini' ? 'active' : ''}`}>
          <input type="radio" value="gpt-4o-mini" checked={model === 'gpt-4o-mini'} onChange={(e) => setModel(e.target.value)} />
          GPT-4o Mini
        </label>
        <label className={`custom-button ${model === 'gpt-4-turbo' ? 'active' : ''}`}>
          <input type="radio" value="gpt-4-turbo" checked={model === 'gpt-4-turbo'} onChange={(e) => setModel(e.target.value)} />
          GPT-4o Turbo
        </label>
        <label className={`custom-button ${model === 'gpt-4o' ? 'active' : ''}`}>
          <input type="radio" value="gpt-4o" checked={model === 'gpt-4o'} onChange={(e) => setModel(e.target.value)} />
          GPT-4o
        </label>
      </div>
      <label>Originaliteit</label>
      <div className="parameters">
        <label className={`custom-button ${originality === 'voorspelbaar' ? 'active' : ''}`}>
          <input type="radio" value="voorspelbaar" checked={originality === 'voorspelbaar'} onChange={(e) => setOriginality(e.target.value)} />
          Voorspelbaar
        </label>
        <label className={`custom-button ${originality === 'genuanceerd' ? 'active' : ''}`}>
          <input type="radio" value="genuanceerd" checked={originality === 'genuanceerd'} onChange={(e) => setOriginality(e.target.value)} />
          Genuanceerd
        </label>
        <label className={`custom-button ${originality === 'creatief' ? 'active' : ''}`}>
          <input type="radio" value="creatief" checked={originality === 'creatief'} onChange={(e) => setOriginality(e.target.value)} />
          Creatief
        </label>
      </div>
      <div className="line-break"></div>
      <label className="title">Corpus</label>
      <div className="corpus">
        <label>Presets</label>
        <select className="corpus-options" onChange={(e) => setCorpusTitle(e.target.value)}>
          <option value="geen">Geen</option>
          <option value="geen-gedoe">Geen Gedoe</option>
          <option value="eleven-travel">Eleven Travel</option>
          <option value="loo-mare">Loo Mare</option>
          <option value="jade-styling">Jade Styling</option>
          <option value="aiki-sports">Aiki Sports</option>
        </select>
      </div>
    </>
  );
};

export default ConfigSettings;
