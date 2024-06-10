import { getSessionMessages, getSessionQuestions } from '../../../../actions/session/session-actions'
import ChatContainer from '../../../../components/sessions/chat-container'
import ControlDock from '../../../../components/sessions/control-dock'
import QuestionsContainer from '../../../../components/sessions/questions-container'
import { SocketProvider } from '../../../socketContext'

export const LiveSession = async ({ params }: { params: { id: string } }) => {
  const room_id: string = params.id
  const messageResponse = await getSessionMessages(room_id, 10, 0)
  const questionsResponse = await getSessionQuestions(room_id, 10, 0)

  return (
    <SocketProvider room_id={room_id}>
      <main className="p-4 h-[100vh] flex flex-col justify-between overflow-y-auto">
        <div className="flex-1 gap-2">
          <div className="grid gap-4 lg:grid-cols-3">
            <ChatContainer room_id={room_id} messages={messageResponse} />
            <QuestionsContainer room_id={room_id} questions={questionsResponse} />
          </div>
        </div>
        <ControlDock />
      </main>
    </SocketProvider>
  )
}

export default LiveSession
