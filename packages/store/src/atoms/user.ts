import { atom } from 'recoil';

export interface useSessionData {
  user_id: number
  username: string
  first_name: string
  last_name: string
}

export const userAtom = atom<null | useSessionData>({
  key: 'userAtom',
  default: null,
});
