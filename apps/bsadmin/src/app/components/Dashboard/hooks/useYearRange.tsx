import { useState, useEffect } from "react";

const useYearRange = (startYear: number, endYear: number) => {
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const yearRange = [];
    for (let year = startYear; year <= endYear; year++) {
      yearRange.push(year);
    }
    setYears(yearRange);
  }, [startYear, endYear]);

  return years;
};

export default useYearRange;
