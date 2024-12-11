import { useState, useEffect } from 'react';

export const useCorpus = (corpusTitle: string) => {
  const [corpus, setCorpus] = useState<string>('');

  const findCorpusBasedOnTitle = (corpusTitle: string): string => {
    try {
      const data = require(`../data/${corpusTitle}`);
      return JSON.stringify(data);
    } catch (error) {
      console.error(`Error loading corpus file: ${corpusTitle}`, error);
      return '';
    }
  };

  useEffect(() => {
    setCorpus(findCorpusBasedOnTitle(corpusTitle));
  }, [corpusTitle]);

  return { corpus };
};
