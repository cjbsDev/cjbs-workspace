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
  keyword: string | null;
  resultKeyword: string | null;
  subjectMaxAge: string | null | undefined;
  subjectMinAge: string | null | undefined;
  filter: SelectedFilterValues[] | null;
  page: Page | null;
  list?: string[];
}

export interface SelectedFilterValues {
  code: string;
  field: string;
}

export interface Page {
  page?: number;
  size?: number;
  sort?: string[] | null;
}

export interface FilterList {
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

export interface CheckType {
  root: string;
  p_code: string;
  code: string;
  label: string;
  checked: boolean;
  valid: boolean; //true인 값만 api 전송
  date: string | null; //날짜는 최신순으로 선택한 필터 보여주기 위해 설정
}

export interface AgeType {
  subjectMaxAge: string | null;
  subjectMinAge: string | null;
}