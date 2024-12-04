import { useState, useEffect } from 'react';
import jsonData from '../data/geen-gedoe.json';

export const useCorpus = (corpusTitle: string) => {
  const [corpus, setCorpus] = useState<string>('');

  const findCorpusBasedOnTitle = (corpusTitle: string): string => {
    let stringifiedCorpus = '';
    if (corpusTitle === 'geen-gedoe') {
      stringifiedCorpus = JSON.stringify(jsonData);
      return stringifiedCorpus;
    }
    return stringifiedCorpus;
  };

  useEffect(() => {
    setCorpus(findCorpusBasedOnTitle(corpusTitle));
  }, [corpusTitle]);

  return { corpus };
};
