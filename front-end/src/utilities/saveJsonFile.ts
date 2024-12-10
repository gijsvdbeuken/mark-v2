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

const saveJsonFile = async (data: Template) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.bedrijf.algemeen.naam || 'data'}.json`;
  link.click();

  URL.revokeObjectURL(url);
};

export default saveJsonFile;
