// pages/students/register.tsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import fireDB from '@/firebase/initFirebase';

type Professional = {
  id: string;
  name: string;
};

const RegisterStudent = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [student, setStudent] = useState({
    name: '',
    parent: '',
    email: '',
    birthday: '',
    cpf: '',
    phone: '',
    school: '',
    grade: '',
    origin: 'particular',
    diagnosis: [''],
    medicalInfo: {
      medications: [''],
      observations: ''
    },
    address: {
      zipCode: '',
      district: '',
      street: '',
      number: '',
      complement: '',
      city: '',
      state: ''
    },
    authorizedProfessionals: [] as string[]
  });

  // Buscar profissionais cadastrados
  useEffect(() => {
    const fetchProfessionals = async () => {
      const snapshot = await getDocs(collection(fireDB, 'users'));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as { name: string })
      }));
      setProfessionals(list);
    };
    fetchProfessionals();
  }, []);

  const handleProfessionalSelect = (profId: string, checked: boolean) => {
    setStudent((prev) => {
      let updated = [...prev.authorizedProfessionals];

      if (checked) {
        // Adiciona se não existir
        if (!updated.includes(profId)) {
          updated.push(profId);
        }
      } else {
        // Remove se existir
        updated = updated.filter((id) => id !== profId);
      }

      return { ...prev, authorizedProfessionals: updated };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setStudent(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else if (name === 'observations') {
      setStudent(prev => ({
        ...prev,
        medicalInfo: { ...prev.medicalInfo, observations: value }
      }));
    } else {
      setStudent(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(fireDB, 'students'), student);
      alert('Estudante cadastrado com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar estudante');
    }
  };

  return (
    <Container>
      <h1>Cadastrar Estudante</h1>
      <Form onSubmit={handleSubmit}>
        <label>Nome*</label>
        <input name="name" value={student.name} onChange={handleChange} required />

        <label>Mãe/Pai*</label>
        <input name="parent" value={student.parent} onChange={handleChange} required />

        <label>Escola*</label>
        <select name="school" value={student.school} onChange={handleChange} required>
          <option value="" hidden>Selecione</option>
          <option value="Dom Barreto">Dom Barreto</option>
          <option value="Bright Bee">Bright Bee</option>
          <option value="Lerote">Lerote</option>
          <option value="Great">Great</option>
          <option value="CSCJ">CSCJ</option>
          <option value="CEV">CEV</option>
          <option value="ESMG">ESMG</option>
          <option value="Equação Certa">Equação Certa</option>
          <option value="São José">São José</option>
        </select>

        <label>Série*</label>
        <select name="grade" value={student.grade} onChange={handleChange} required>
          <option value="" hidden>Selecione</option>
          <option value="3º Ano E.M.">3º Ano E.M.</option>
          <option value="2º Ano E.M.">2º Ano E.M.</option>
          <option value="1º Ano E.M.">1º Ano E.M.</option>
          <option value="9º Ano E.F.">9º Ano E.F.</option>
          <option value="8º Ano E.F.">8º Ano E.F.</option>
        </select>

        <label>Origem*</label>
        <select name="origin" value={student.origin} onChange={handleChange} required>
          <option value="" hidden>Selecione</option>
          <option value="particular">Particular</option>
          <option value="fracta">Fracta</option>
        </select>

        <label>Profissionais autorizados*</label>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {professionals.map((prof) => (
            <label
              key={prof.id}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 13 }}
            >
              <input
                type="checkbox"
                value={prof.id}
                checked={student.authorizedProfessionals.includes(prof.id)}
                onChange={(e) =>
                  handleProfessionalSelect(prof.id, e.target.checked)
                }
              />
              {prof.name}
            </label>
          ))}
        </div>

        <SubmitButton type="submit">Salvar Estudante</SubmitButton>
      </Form>
    </Container>
  );
};

export default RegisterStudent;

const Container = styled.div`
  background-color: #F6F6F6;
  border-radius: 10px;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-top: 1rem;
    font-weight: bold;
  }

  input, select, textarea {
    margin-top: 0.3rem;
    padding: 0.5rem;
    font-size: 1rem;
    border: 0.5px solid #4A4A4A;
    border-radius: 5px;
  }

  textarea {
    min-height: 80px;
  }
`;

const SubmitButton = styled.button`
  margin-top: 2rem;
  background-color: #0070f3;
  color: white;
  padding: 0.75rem;
  border: none;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #005ac1;
  }
`;
