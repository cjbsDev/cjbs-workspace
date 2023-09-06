export interface StudyData {
  institute: number;
  investigator: string;
  level: number;
  id: number;
  parentId: string;
  rootId: string;
  studyCode: string;
  sampleType: string;
  studyCount: number;
  subjectCount: number;
  title: string;
  checked?: boolean;
}

export interface StudyCount {
  diseaseCount: number;
  studyCount: number;
}
