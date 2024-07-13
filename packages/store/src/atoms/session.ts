import { atom } from 'recoil';

export interface session {
    id?: number | undefined;
    name: string;
    schedule_date_time: Date;
    description: string;
    is_auto?: boolean | undefined;
    is_finished: boolean;
    tags: any;
    invitation_link: string;
    meeting_id?: string | undefined;
    password?: string | undefined;
}

export const sessionAtom = atom<null | session>({
  key: 'sessionAtom',
  default: null,
});
