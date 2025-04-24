import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential} from 'firebase/auth'
import { auth } from "../firebase/initFirebase";

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>
  signup: (email: string, password: string) => Promise<UserCredential>
  logout(): void;
  forgotPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  const forgotPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email)
  }

  return (
    <AuthContext.Provider value={{user, login, signup, logout, forgotPassword}} >{loading ? null : children}</AuthContext.Provider>
  )
}