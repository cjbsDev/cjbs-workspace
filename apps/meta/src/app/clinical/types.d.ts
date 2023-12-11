export interface Search {
  keyword: string | null;
  resultKeyword: string | null;
  subjectMaxAge: number | null | undefined;
  subjectMinAge: number | null | undefined;
  bmiMaxValue: number | null | undefined;
  bmiMinValue: number | null | undefined;
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
  subjectMaxAge: number;
  subjectMinAge: number;
}

export interface BMIType {
  bmiMaxValue: number;
  bmiMinValue: number;
}
