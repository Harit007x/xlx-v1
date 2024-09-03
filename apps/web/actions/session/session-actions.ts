'use server';
import {
  GetReturnTypeSession,
  InputTypeSession,
  CreateReturnTypeSession,
  GetReturnTypeSingleSession,
  VerifyTypeSession,
  GetSessionMessages,
  GetSessionQuestions,
} from './types';
import { revalidatePath } from 'next/cache';
import { customAlphabet } from 'nanoid';
import { db } from '@repo/db';
import formateMeetingID from '../../lib/helper';

export const createSession = async (data: InputTypeSession, user_id: number): Promise<CreateReturnTypeSession> => {
  const meeting_nano_id = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 10);
  const password_nano_id = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
  const baseUrl = "http://localhost:3000/live-session";
  try {
    const user = await db.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return { error: 'User not found.' };
    }

    const { name, description, schedule_date_time, is_auto, tags } = data;

    const room = await db.room.create({
      data: {
        name,
        is_chat_paused: false,
        is_ind_paused: false,
      },
    });

    const password = password_nano_id();
    const meeting_id = formateMeetingID(meeting_nano_id());
    const invitation_link = `${baseUrl}/${meeting_id}`;

    const session = await db.session.create({
      data: {
        name,
        description,
        schedule_date_time,
        is_auto,
        invitation_link,
        meeting_id,
        password,
        tags,
        user_id: user.id,
        room_id: room.id,
      },
    });

    revalidatePath('/sessions');
    return { data: session, message: 'Session created successfully.' };
  } catch (err) {
    console.log(err);
    return { error: 'Failed to schedule a session.' };
  }
};

export const getSingleSession = async (session_id: number): Promise<GetReturnTypeSingleSession> => {
  try {
    const session = await db.session.findUnique({
      where: {
        id: session_id,
      },
    });

    if (!session) {
      return { error: 'Sessions not found.' };
    }

    return { data: session, message: 'Session fetched successfully.' };
  } catch (err) {
    console.log(err);
    return { error: 'Failed to fetch sessions.' };
  }
};

export const getSessionDetails = async (user_id: number): Promise<GetReturnTypeSession> => {
  try {
    const session = await db.session.findMany({
      where: {
        user_id,
      }
    });

    if (!session) {
      return { error: 'Sessions not found.' };
    }

    return { data: session, message: 'Sessions fetched successfully.' };
  } catch (err) {
    console.log(err);
    return { error: 'Failed to fetch sessions.' };
  }
};

export const updateSession = async (
  data: InputTypeSession,
  session_id: number | undefined,
  user_id: number
): Promise<any> => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return { error: 'User not found.' };
    }

    const session = await db.session.findUnique({
      where: {
        id: session_id,
      },
    });

    if (!session) {
      return { error: 'Session not found.' };
    }

    // Check if the user is the owner of the session
    if (session.user_id !== user.id) {
      return { error: 'User is not authorized to update this session.' };
    }

    const { name, description, schedule_date_time, is_auto, tags, invitation_link } = data;

    const updatedSession = await db.session.update({
      where: {
        id: session_id,
      },
      data: {
        name,
        description,
        schedule_date_time,
        is_auto,
        invitation_link,
        tags,
      },
    });
    revalidatePath('/sessions');
    return { data: updatedSession, message: 'Session updated successfully.' };
  } catch (err) {
    console.log(err);
    return { error: 'Failed to update the session.' };
  }
};

export const verifySession = async (meeting_id: string, password:string): Promise<VerifyTypeSession> => {
  try {
    const session = await db.session.findUnique({
      where: {
        meeting_id,
      },
    });

    if (!session) {
      return { error: 'Session not found.' };
    }

    if (password !== session.password) {
      return {error: 'Wrong session credentials.'};
    }

    return { data: session, message: 'Session verified successfully.' };
  } catch (err) {
    console.log(err);
    return { error: 'Failed to verify session details.' };
  }
};

export const getSessionMessages = async (
  meeting_id: string,
  limit?: number,
  offset?: number
): Promise<GetSessionMessages> => {
  try {
    const session = await db.session.findUnique({
      where: {
        meeting_id,
      },
    });
    
    if (!session) {
      return { error: 'room not found.' };
    }

    const sessionMessages = await db.sessionMessages.findMany({
      where: {
        session_id: session.id,
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const annotate = sessionMessages.map((message:any) => ({
      ...message,
      initials: `${message.user.first_name.slice(0, 1)}${message.user.last_name.slice(0, 1)}`,
      user_name: `${message.user.first_name} ${message.user.last_name}`,
    }));

    if (offset === undefined) {
      return { error: 'offset not found.' };
    }

    if (limit === undefined) {
      return { error: 'limit not found.' };
    }

    const paginatedMessages = annotate.slice(offset, offset + limit);
    return {
      data: paginatedMessages.reverse(),
      count: annotate.length,
      message: 'Session messages fetched successfully.',
    };
  } catch (err) {
    console.log(err);
    return { error: 'Failed to fetch session messages.' };
  }
};

export const getSessionQuestions = async (
  meeting_id: string,
  limit?: number,
  offset?: number
): Promise<GetSessionQuestions> => {
  try {
    const session = await db.session.findUnique({
      where: {
        meeting_id,
      },
    });

    if (!session) {
      return { error: 'session not found.' };
    }

    const sessionQuestions = await db.questions.findMany({
      where: {
        session_id: session.id,
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        questionaction: {
          select: {
            user_id: true,
          },
        },
      },
      orderBy: [
        {
          up_vote_count: 'asc', // or 'desc' depending on your requirement
        },
        {
          created_at: 'desc', // or 'desc' depending on your requirement
        },
      ],
    });

    const annotate = sessionQuestions.map((question: any) => {
      console.log('lol =', question);
      const userActionExists = question.questionaction.some((action: any) => action.user_id === question.user_id);
      return {
        ...question,
        initials: `${question.user.first_name.slice(0, 1)}${question.user.last_name.slice(0, 1)}`,
        user_name: `${question.user.first_name} ${question.user.last_name}`,
        is_disabled: userActionExists,
      };
    });

    if (offset === undefined) {
      return { error: 'offset not found.' };
    }

    if (limit === undefined) {
      return { error: 'limit not found.' };
    }

    const paginatedMessages = annotate.slice(offset, offset + limit);
    return {
      data: paginatedMessages.reverse(),
      count: annotate.length,
      message: 'Session questions fetched successfully.',
    };
  } catch (err) {
    console.log(err);
    return { error: 'Failed to fetch session messages.' };
  }
};

// export const upVoteDownVote = async (question_id: number, user_id: number, up_vote: boolean, down_vote: boolean, up_vote_count: number): Promise<any> => {
//     try {

//         const currentQuestion = await db.questions.findUnique({
//             where: { id: question_id },
//             select: { up_vote_count: true, down_vote_count: true },
//         });

//         if (!currentQuestion) {
//             return { error: 'Question not found.' };
//         }
//         console.log("up =", up_vote, "down =", down_vote)

//         const updateData: any = {};

//         if (up_vote) {
//             updateData.up_vote_count = { increment: 1 };
//         }

//         if (down_vote) {
//             if (currentQuestion.up_vote_count > 0) {
//                 updateData.up_vote_count = { decrement: 1 };
//             }
//         }

//         const updatedQuestion = await db.questions.update({
//             where: {
//                 id: question_id
//             },
//             data: updateData
//         });

//         const existingAction = await db.questionActions.findUnique({
//             where: {
//                 user_id_questions_id: {
//                     user_id: user_id,
//                     questions_id: question_id,
//                 },
//             },
//         });

//         if (existingAction) {
//             const updatedAction = await db.questionActions.update({
//                 where: {
//                     id: existingAction.id,
//                 },
//                 data: {
//                     did_up_vote: up_vote,
//                     did_down_vote: down_vote,
//                 },
//             });

//             return { data: updatedAction, message: 'Vote updated successfully.' };
//         } else {
//             const newAction = await db.questionActions.create({
//                 data: {
//                     user_id: user_id,
//                     questions_id: question_id,
//                     did_up_vote: up_vote,
//                     did_down_vote: down_vote,
//                 },
//             });

//             return { data: newAction, message: 'Vote created successfully.' };
//         }
//     } catch (err) {
//         console.log(err);
//         return { error: 'Failed to update vote.' };
//     }
// };
