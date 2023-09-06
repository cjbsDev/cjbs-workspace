import { SubCategories } from './types.d';
export interface SubjectInfo {
  group: string | null;
  age: number | null;
  sex: string | null;
  height: number | null;
  weight: number | null;
  sampleTypeList: string | null;
  date: string | null;
  label: string | null;
  code: string | null;
}

export interface SubjectDetailResponse extends SubjectInfo {
  timePoints: TimePoints[] | [];
  categories: Categories[] | [];
}

export interface Categories {
  name: string;
  timePoints: CategoryTimePoints[];
}

export interface CategoryTimePoints extends SubjectInfo {
  subCategories: SubCategoryItem[];
}

export interface SubCategoryItem {
  name: string;
  header: string[];
  data: any[];
}

export interface SubCategories {
  name: string;
  header: [];
  data: [];
}

export interface TimePoints extends SubjectInfo {
  categories: TimePointsCategory[];
}

export interface TimePointsCategory extends SubjectInfo {
  name: string;
  subCategories: SubCategories[];
}

export interface TimePointsCategoryItem extends SubjectInfo {
  name: string;
  subCategories: SubCategories[];
}
