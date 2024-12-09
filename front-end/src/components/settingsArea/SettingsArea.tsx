import React, { useState, useEffect } from 'react';
import './SettingsArea.css';
import '../../App.css';
import { useError } from '../../context/ErrContext';

const SettingsArea = () => {
  const { showError } = useError();

  const handleError = () => {
    showError('This is a sample error message!');
  };

  interface Template {
    bedrijf: {
      algemeen: {
        naam: string;
        adres: string;
        website: string;
        branche: string;
      };
      inhoudelijk: {
        omschrijving: string;
        producten_diensten: string;
        kernwaarde: string;
        doelgroep: string;
        bedrijfswaarde: string;
      };
      klantrelatie: {
        uitgeleende_werkzaamheden: string;
        facturatie: string;
      };
    };
  }

  const [formData, setFormData] = useState({ naam: '', adres: '', website: '', branche: '', omschrijving: '', producten_diensten: '', kernwaarde: '', doelgroep: '', bedrijfswaarde: '', uitgeleende_werkzaamheden: '', facturatie: '' });
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const response = await fetch('/template.json');
        const temp: Template = await response.json();
        setTemplate(temp);
      } catch (error) {
        console.error('Error loading template: ', error);
      }
    };

    loadTemplate();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (template) {
      const updatedTemplate: Template = {
        ...template,
        bedrijf: {
          ...template.bedrijf,
          algemeen: {
            ...template.bedrijf.algemeen,
            naam: formData.naam,
            adres: formData.adres,
            website: formData.website,
            branche: formData.branche,
          },
          inhoudelijk: {
            ...template.bedrijf.inhoudelijk,
            omschrijving: formData.omschrijving,
            producten_diensten: formData.producten_diensten,
            kernwaarde: formData.kernwaarde,
            doelgroep: formData.doelgroep,
            bedrijfswaarde: formData.bedrijfswaarde,
          },
          klantrelatie: {
            ...template.bedrijf.klantrelatie,
            uitgeleende_werkzaamheden: formData.uitgeleende_werkzaamheden,
            facturatie: formData.facturatie,
          },
        },
      };

      await saveDataToFile(updatedTemplate);
    } else {
      console.error("Template hasn't loaded yet.");
    }
  };

  const saveDataToFile = async (data: Template) => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.bedrijf.algemeen.naam || 'data'}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="settingsArea">
      <div className="settingsAreaContainer">
        <h1>Corpus aanmaken</h1>
        <form onSubmit={handleSubmit} className="mainInfoContainer">
          <div className="mainInfoSummary">
            <h2>Algemeen</h2>
            <div className="inputSection">
              <div className="sectionPart">
                <label className="label">Naam</label>
                <input className="input" name="naam" value={formData.naam} onChange={handleChange} placeholder="Bijv. Geen Gedoe" />
                <label className="label">Adres</label>
                <input className="input" name="adres" value={formData.adres} onChange={handleChange} placeholder="Bijv. Maasheseweg 85e, 5804 AB Venray" />
              </div>
              <div className="sectionPart">
                <label className="label">Website</label>
                <input className="input" name="website" value={formData.website} onChange={handleChange} placeholder="Bijv. https://www.geen-gedoe.nl" />
                <label className="label">Branche</label>
                <input className="input" name="branche" value={formData.branche} onChange={handleChange} placeholder="Bijv. Marketing & communicatie" />
              </div>
            </div>
            <h2>Inhoudelijk</h2>
            <label className="label">Omschrijving</label>
            <textarea className="textArea" name="omschrijving" value={formData.omschrijving} onChange={handleChange} />
            <div className="inputSection">
              <div className="sectionPart">
                <label className="label">Producten en/of diensten</label>
                <textarea className="textArea" name="producten_diensten" value={formData.producten_diensten} onChange={handleChange} />
                <label className="label">Kernwaarde</label>
                <textarea className="textArea" name="kernwaarde" value={formData.kernwaarde} onChange={handleChange} />
              </div>
              <div className="sectionPart">
                <label className="label">Doelgroep</label>
                <textarea className="textArea" name="doelgroep" value={formData.doelgroep} onChange={handleChange} />
                <label className="label">Bedrijfswaarde</label>
                <textarea className="textArea" name="bedrijfswaarde" value={formData.bedrijfswaarde} onChange={handleChange} />
              </div>
            </div>

            <h2>Klantrelatie</h2>
            <div className="inputSection">
              <div className="sectionPart">
                <label className="label">Uitgeleende werkzaamheden</label>
                <textarea className="textArea" name="uitgeleende_werkzaamheden" value={formData.uitgeleende_werkzaamheden} onChange={handleChange} />
              </div>
              <div className="sectionPart">
                <label className="label">Facturatie</label>
                <textarea className="textArea" name="facturatie" value={formData.facturatie} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="btnContainer">
            <button type="submit" className="createCorpusBtn">
              Corpus aanmaken
            </button>
          </div>
        </form>
        <button onClick={handleError}>Trigger Error</button>
      </div>
    </div>
  );
};

export default SettingsArea;
