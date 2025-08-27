import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const Login = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      await login(data.email, data.password)
      router.push('/')
    } catch (err) {
      setLoading(false)
      console.log(err)
      alert('Email ou senha incorretos!')
    }
  }

  return (
    <Container>
      <Wrapper>
        <LBox>
          <Heading>
            <Image src={'/assets/nexus_logo.png'} width={195} height={60} alt='Nexus' />
            <Title>Login</Title>
          </Heading>
          <Form onSubmit={handleLogin}>
            <IWrap>
              <Label>E-mail</Label>
              <Input type={'email'} placeholder="Digite seu e-mail" required
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                value={data.email}
              />
            </IWrap>
            <IWrap>
              <Label>Senha</Label>
              <Input type={'password'} placeholder="Digite sua senha" required
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                value={data.password}
              />
            </IWrap>
            <FButton type="submit" >Entrar</FButton>
          </Form>
          {/**<BWrap>  
            <FOption href={'/reset'} >Esqueci minha senha</FOption>
            <FOption href={'/authentication/signup'}>Cadastre-se</FOption>
          </BWrap>*/}
        </LBox>
        <RBox>
          <RTitle>Bem-Vindo de Volta!</RTitle>
          <RSubtitle>Falta pouco para acessar a plataforma!</RSubtitle>
        </RBox>
      </Wrapper>
    </Container>
  );
}

export default Login;


const Container = styled.section`
  background-color: #0A3D62;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Poppins', sans-serif;
`
const Wrapper = styled.div`
  border-radius: 20px;
  padding: 32px;
  
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    margin: 16px;
  }
`
const LBox = styled.div`
  flex: 5;
  background-color: #FFFFFF;
  border-radius: 20px 0 0 20px;

  padding: 48px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`
const Title = styled.h1`
  color: #13131A;
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`
const IWrap = styled.div`
  width: 300px;
  
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const Label = styled.label`
  color: #13131A;
  font-size: 14px;
  margin-left: 12px;
`
const Input = styled.input`
  background-color: #F1F1F1;
  color: #33333A;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;

  padding: 8px 12px; 
  width: 100%;
  max-width: 300px;
  border: none;
  border-radius: 8px;
  outline: none;
`
const BWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`
const FButton = styled.button`
  background-color: #0A3D62;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
  font-family: 'Poppins', sans-serif;

  height: 40px;
  width: 200px;
  border-radius: 8px;
  border: 0;

  transition: 0.5s;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:focus {
    box-shadow: inset 200px 0 0 0 #13131A;
  }
`
const FOption = styled(Link)`
  color: #22222A;
  font-size: 14px;
`
const RBox = styled.div`
  flex: 3;
  background-color: #4F4F4F;
  padding: 16px;
  border-radius: 0 20px 20px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (max-width: 720px) {
    display: none;
    border-radius: 20px 20px 0 0; 
  }
`
const RTitle = styled.h3`
  color: #F1F1F1;
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;

  max-width: 300px;
  margin-bottom: 16px;
`
const RSubtitle = styled.h5`
  color: #F1F1F1;
  font-size: 14px;
  font-weight: 400;

  max-width: 350px;
`