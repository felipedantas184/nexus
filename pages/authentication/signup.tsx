import SingUp from "@/components/Authentication/Signup";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react"

const SignUpPage = () => {
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
        <title>Nexus - Cadastro</title>
        <meta name="description" content="Nexus - Cadastro" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="Nexus - Cadastro" />
        <meta property="og:description" content="Nexus - Cadastro" />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:site_name" content="Nexus - Cadastro" />

        <meta property="twitter:title" content="Nexus - Cadastro" />
        <meta property="twitter:description" content="Nexus - Cadastro" />
        <meta property="twitter:image" content="/apple-touch-icon.png" />
      </Head>
      <SingUp />
    </>
   );
}
 
export default SignUpPage;