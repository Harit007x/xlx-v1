import React from 'react';
import { Badge } from '@repo/ui/shadcn';
import { TSessionBoxItems } from '../types/types';
import { Icons } from '../../../packages/ui/src/icons';

interface SessionBoxProps {
  sessionList: TSessionBoxItems[] | undefined;
  setSessionData: React.Dispatch<React.SetStateAction<TSessionBoxItems | undefined>>;
  setToggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const SessionBox = (props: SessionBoxProps) => {
  const locale = 'en-US'; // or 'en-GB' or any other locale you prefer
  const options: any = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return (
      <>
        {props.sessionList?.map((item: TSessionBoxItems) => (
          <main
            className="flex flex-col relative p-4 gap-3 border border-foreground/10 rounded-lg hover:bg-secondary hover:cursor-pointer"
            onClick={() => {
              props.setSessionData(item);
              props.setToggleOpen(true);
              props.setIsEdit(true);
            }}
          >
            <div className="flex flex-col gap-2">
              <p className="font-bold text-md">{item.name}</p>
    
              <p className="text-sm font-font-semibold">{item.schedule_date_time.toLocaleString(locale, options)}</p>
    
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
    
            <span className="flex justify-between gap-4">
              <div className="flex gap-2 flex-wrap">
                {item.tags.map((item: any) => {
                  return <Badge key={item.value}>{item.value}</Badge>;
                })}
              </div>
              <div className='absolute right-4 flex gap-2'>
                <Icons.link2 className="min-w-fit" width="20" height="20" />
                {/* <Icons.clipBoardPaste className="min-w-fit cursor-copy" width="20" height="20" /> */}
              </div>
            </span>
          </main>
        ))}
      </>
  );
};

export default SessionBox;
