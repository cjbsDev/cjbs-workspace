export interface SampleData {
  disease: string;
  sampleCode: string;
  sampleId: number;
  sampleType: string;
  studyCode: string;
  subjectCode: string;
  subjectId: string;
  timePoint: string;
  analysisList: AnalysisListData[];
}

export interface AnalysisListData {
  id: number | null;
  type: string | null;
  result: null;
}
