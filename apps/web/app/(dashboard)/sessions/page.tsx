import React from 'react';

import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { getSessionDetails } from '../../../actions/session/session-actions';
import { SessionsClient } from '../../../components/sessions/sessions-client';

const Page = async () => {
  const session = await getServerSession(authOptions);
  const response = await getSessionDetails(session?.user.id);
  console.log("checking it =", response.data)
  return <SessionsClient sessionList={response.data} />;
};

export default Page;
