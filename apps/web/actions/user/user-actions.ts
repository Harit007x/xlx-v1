'use server'
import { InputTypeRegisterUser, ReturnTypeRegisterUser } from './types'
import { hash } from 'bcrypt'
import { db } from '@repo/xlx'

export const getUserDetails = async (username?: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    })
    return { data: user, message: 'User fetched.' }
  } catch (e) {
    console.log(e)
  }
}

export const createUser = async (data: InputTypeRegisterUser): Promise<ReturnTypeRegisterUser> => {
  try {
    const userExists = await db.user.findUnique({
      where: {
        username: data.username,
      },
    })

    if (userExists) {
      return { error: 'Username is already taken.' }
    }

    const { username, password, first_name, last_name } = data
    const hashedPassword = await hash(password, 10)

    const user = await db.user.create({
      data: {
        username,
        first_name,
        last_name,
        password: hashedPassword,
        email: username,
      },
    })

    return { data: user, message: 'Signed up successfully.' }
  } catch (err) {
    console.log(err)
    return { error: 'Failed to signup.' }
  }
}
