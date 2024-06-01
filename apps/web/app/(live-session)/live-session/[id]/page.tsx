'use client'
import LiveSessionClient from "../../../../components/sessions/live-session-client";

export const LiveSession = ({params}: {params: {id: string}}) => {
  const id: string = params.id
  console.log("id= ", id)
  return (
    <main>
      <LiveSessionClient
        room_id={id}
      />
    </main>
  );
}

export default LiveSession;