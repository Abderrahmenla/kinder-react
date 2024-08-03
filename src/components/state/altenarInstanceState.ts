import { atom } from 'recoil';
import { AltenarInstance } from 'src/globals';

export const alternarInstanceState = atom<void | AltenarInstance | undefined>({
  key: 'alternarInstanceState',
  default: undefined
});
