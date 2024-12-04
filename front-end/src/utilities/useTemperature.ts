import { useState, useEffect } from 'react';

export const useTemperature = (originality: string) => {
  const [temperature, setTemperature] = useState<number>(0.5);

  const calculateTemperature = (originality: string): number => {
    let temp = 0.5;
    if (originality === 'voorspelbaar') {
      temp = 0.2;
    } else if (originality === 'genuanceerd') {
      temp = 0.5;
    } else if (originality === 'creatief') {
      temp = 0.8;
    }
    return temp;
  };

  useEffect(() => {
    setTemperature(calculateTemperature(originality));
  }, [originality]);

  return { temperature };
};
