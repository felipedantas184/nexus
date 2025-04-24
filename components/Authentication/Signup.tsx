import { useAuth } from "@/context/AuthContext";
import fireDB, { auth } from "@/firebase/initFirebase";
import { deleteUser, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react"
import styled from "styled-components";

type Category = 'student' | 'monitor' | 'psychologist' | 'psychiatrist'

const SingUp = () => {
  const { signup } = useAuth()
  const [data, setData] = useState<any>({})
  const [category, setCategory] = useState<Category>('student')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const authResult = await signup(data.email, data.password)
      const userId = authResult.user.uid

      const userData = {
        id: userId,
        name: data.name,
        email: data.email,
        birthday: data.birthday,
        cpf: data.cpf,
        phone: data.phone,
        ...(category === 'student' && {
          school: data.school,
          grade: data.grade,
        }),
        address: {
          zipCode: data.zipCode,
          district: data.district,
          street: data.street,
          number: data.number,
          complement: data.complement || '',
          city: data.city,
          state: data.state,
        }
      }

      const categoryCollectionMap: Record<Category, string> = {
        student: 'students',
        monitor: 'monitors',
        psychologist: 'psychologist',
        psychiatrist: 'psychiatrist',
      }

      const collectionName = categoryCollectionMap[category]

      await setDoc(doc(fireDB, collectionName, userId), userData)

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: data.name
        })
      }

      router.push('/')
    } catch (err: any) {
      if (auth.currentUser) {
        await deleteUser(auth.currentUser)
      }
  
      alert('Erro ao cadastrar usuário: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Heading>
          <Image src={'/assets/nexus_logo.png'} width={195} height={60} alt='Nexus' />
          <Title>Cadastro</Title>
        </Heading>
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }} >
          <Form>
            <IWrap>
              <Label>Nome Completo</Label>
              <Input type='text' name="name" placeholder="Nome completo" onChange={handleChange} required />
            </IWrap>
            <IWrap>
              <Label>E-mail</Label>
              <Input type='email' name="email" placeholder="Email" onChange={handleChange} required />
            </IWrap>
            <IWrap>
              <Label>Senha</Label>
              <Input type="password" name="password" placeholder="Senha" onChange={handleChange} required />
            </IWrap>
            <IWrap>
              <Label>Telefone</Label>
              <Input type="tel" name="phone" placeholder="Telefone" onChange={handleChange} />
            </IWrap>
            <IWrap>
              <Label>CPF</Label>
              <Input type="number" name="cpf" placeholder="CPF" onChange={handleChange} />
            </IWrap>
            <IWrap>
              <Label>Nascimento</Label>
              <Input type='date' name="birthday" placeholder="Aniversário" onChange={handleChange} required />
            </IWrap>

            <IWrap>
              <Label>CEP</Label>
              <Input type="text" name="zipCode" placeholder="CEP" onChange={handleChange} />
            </IWrap>
            <IWrap>
              <Label>Bairro</Label>
              <Input type="text" name="district" placeholder="Bairro" onChange={handleChange} />
            </IWrap>
            <IWrap>
              <Label>Rua/Avenida</Label>
              <Input type="text" name="street" placeholder="Rua" onChange={handleChange} />
            </IWrap>
            <IWrap>
              <Label>Número</Label>
              <Input type="number" name="number" placeholder="Número" onChange={handleChange} />
            </IWrap>
            <IWrap>
              <Label>Complemento</Label>
              <Input type="text" name="complement" placeholder="Complemento" onChange={handleChange} />
            </IWrap>
            <IWrap>
              <Label>Cidade</Label>
              <Input type="text" name="city" placeholder="Cidade" onChange={handleChange} />
            </IWrap>
            <IWrap>
              <Label>Estado</Label>
              <Input type="text" name="state" placeholder="Estado" onChange={handleChange} />
            </IWrap>

            <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
              <option value="student">Estudante</option>
              <option value="monitor">Monitor</option>
              <option value="psychologist">Psicólogo</option>
              <option value="psychiatrist">Psiquiatra</option>
            </select>

            {category === 'student' && (
              <>
                <IWrap>
                  <Label>Escola</Label>
                  <Input name="school" placeholder="Escola" onChange={handleChange} />
                </IWrap>
                <IWrap>
                  <Label>Série</Label>
                  <Input name="grade" placeholder="Série" onChange={handleChange} />
                </IWrap>
              </>
            )}

          </Form>

          <BWrap>
            <FButton type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </FButton>
            <FOption href={'/authentication/signin'}>Já possuo conta</FOption>
          </BWrap>
        </form>
      </Wrapper>
    </Container>
  );
}

export default SingUp;


const Container = styled.section`
  background-color: #0A3D62;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Poppins', sans-serif;
`
const Wrapper = styled.div`
  background-color: #FFFFFF;
  border-radius: 20px;
  min-width: 55vw;

  padding: 24px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: 768px) {
    margin: 16px;
  }
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
const Form = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 8px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(8, 1fr);
    gap: 12px;
  }
`
const IWrap = styled.div`
  width: 250px;
  
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media screen and (max-width: 768px) {
    width: 100%;
    gap: 0px;
  }
`
const Label = styled.label`
  color: #13131A;
  font-size: 14px;
  margin-left: 12px;
  margin-bottom: 4px;
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
const InputSplit = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: row;
  gap: 4px;
`
const InputSplitGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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