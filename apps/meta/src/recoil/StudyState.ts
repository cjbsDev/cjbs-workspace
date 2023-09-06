import { StudyCount } from 'src/app/clinical/(mainlayout)/disease-study/types';
import { atom } from 'recoil';

export const studySearchInputState = atom<string>({
  key: 'studySearchInputState', // unique ID (with respect to other atoms/selectors)
  default: '',
});

export const studyTotalElementsState = atom<number>({
  key: 'studyTotalElementsState', // unique ID (with respect to other atoms/selectors)
  default: 0,
});

export const studyCountState = atom<StudyCount | null>({
  key: 'studyCountState', // unique ID (with respect to other atoms/selectors)
  default: null,
});

export const studySelectedState = atom<string[]>({
  key: 'studySelectedState', // unique ID (with respect to other atoms/selectors)
  default: [],
});
