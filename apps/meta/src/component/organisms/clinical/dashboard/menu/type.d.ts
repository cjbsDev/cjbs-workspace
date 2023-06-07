interface FilterList {
  field: string;
  name: string;
  title: string;
  values: FilterValues[];
}

interface FilterValues {
  code: string;
  label: string;
  values: FilterValues[];
}

interface Search {
  diseaseName: string[];
}
