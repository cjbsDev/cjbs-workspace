export interface SubjectData {
  age: number;
  disease: string;
  diseasePart: string;
  id: number;
  screeningCode: string;
  sex: string;
  studyCode: string;
}

export interface Search {
  diseaseName?: string[];
  diseasePartName?: string[];
  keyword?: string;
  resultKeyword?: string;
  sampleType?: string;
  studyDesign?: string;
  subjectMaxAge?: number;
  subjectMinAge?: number;
  subjectSex?: string;
  page?: number;
  size?: number;
  sort?: string[];
}
