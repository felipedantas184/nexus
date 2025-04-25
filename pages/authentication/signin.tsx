import Login from "@/components/Authentication/Login";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react"

const LoginPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [router, user])

  return (
    <>
      <Head>
        <title>Nexus - Login</title>
        <meta name="description" content="Nexus - Login" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="Nexus - Login" />
        <meta property="og:description" content="Nexus - Login" />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:site_name" content="Nexus - Login" />

        <meta property="twitter:title" content="Nexus - Login" />
        <meta property="twitter:description" content="Nexus - Login" />
        <meta property="twitter:image" content="/apple-touch-icon.png" />
      </Head>
      <Login />
    </>
  );
}

export default LoginPage;