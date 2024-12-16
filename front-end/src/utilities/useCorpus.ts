import { useState, useEffect } from 'react';

export const useCorpus = (corpusTitle: string) => {
  const [corpus, setCorpus] = useState<string>('');

  const findCorpusBasedOnTitle = (corpusTitle: string): string => {
    try {
      if (!corpusTitle.trim() || corpusTitle === 'geen-corpus') {
        return '';
      }
      const data = require(`../data/corpora/${corpusTitle}`);
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
