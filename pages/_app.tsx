import { AuthContextProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/context/ProtectedRoutes";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

const noAuthRequired = ['/', '/authentication/signin', '/authentication/signup']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  )
}
