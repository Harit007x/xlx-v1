import React from 'react'

import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { getSessionDetails } from '../../../actions/session/session-actions'
import { SessionsClient } from '../../../components/session/session-client'

const Sessions = async () => {
  const session = await getServerSession(authOptions);

  const response = await getSessionDetails(session?.user.id)

  return (
    <SessionsClient sessionList={response.data} />
  )
}

export default Sessions