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
        <title>Login ADUFPI | Apartamentos</title>
        <meta name="description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="Login ADUFPI | Apartamentos" />
        <meta property="og:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:site_name" content="Login ADUFPI | Apartamentos" />

        <meta property="twitter:title" content="Login ADUFPI | Apartamentos" />
        <meta property="twitter:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="twitter:image" content="/apple-touch-icon.png" />
      </Head>
      <Login />
    </>
  );
}

export default LoginPage;