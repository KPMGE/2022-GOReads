import React, { createContext, useState, useEffect } from "react"
import { User } from "../@types/User";
import { api } from "../api"
import { alertError } from "../utils";

type Props = {
  children: JSX.Element;
};

interface ValueTypes {
  user?: User
  login: (email: string, password: string) => Promise<void>
}

const defaultObject: ValueTypes = {
  user: undefined,
  login: async () => {}
}

export const UserContext = createContext<ValueTypes>(defaultObject)

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>()

  const getUser = async () => {
    const token = localStorage.getItem('token')
    const response = await api.get('user/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const user: User = response.data
    return user
  }

  const login = async (email: string, password: string) => {
    const data = {
      email,
      password
    }
    try {
      const response = await api.post('auth/signin', data)
      localStorage.setItem('token', response.data.access_token)
      const user = await getUser()
      setUser(user)
    } catch (error: any) {
      await alertError('Invalid credentials! Try again')
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser()
        setUser(user)
      } catch (error) {
        await alertError('Something went wrong, please try again')
        console.log(error)
      }
    })()
  }, [])

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  )
}
