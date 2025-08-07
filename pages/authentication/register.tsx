// pages/students/register.tsx
import { useState } from 'react';
import styled from 'styled-components';
import { collection, addDoc } from 'firebase/firestore';
import fireDB from '@/firebase/initFirebase';

const RegisterStudent = () => {
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
    }
  });

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'diagnosis' | 'medications') => {
    const updated = [...(field === 'diagnosis' ? student.diagnosis : student.medicalInfo.medications || [])];
    updated[index] = e.target.value;

    if (field === 'diagnosis') {
      setStudent(prev => ({ ...prev, diagnosis: updated }));
    } else {
      setStudent(prev => ({
        ...prev,
        medicalInfo: { ...prev.medicalInfo, medications: updated }
      }));
    }
  };

  const addField = (field: 'diagnosis' | 'medications') => {
    if (field === 'diagnosis') {
      setStudent(prev => ({ ...prev, diagnosis: [...(prev.diagnosis || []), ''] }));
    } else {
      setStudent(prev => ({
        ...prev,
        medicalInfo: { ...prev.medicalInfo, medications: [...(prev.medicalInfo.medications || []), ''] }
      }));
    }
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

        <label>Mãe/Pai</label>
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

          <option value="Particular">Particular</option>
          <option value="Fracta">Fracta</option>
        </select>

        {/**
        <label>Diagnóstico*(s)</label>
        {student.diagnosis.map((item, idx) => (
          <input
            key={idx}
            value={item}
            onChange={e => handleArrayChange(e, idx, 'diagnosis')}
            placeholder={`Diagnóstico ${idx + 1}`}
          />
        ))}
        <button type="button" onClick={() => addField('diagnosis')}>+ Diagnóstico</button>

        <label>Medicações*</label>
        {student.medicalInfo.medications?.map((item, idx) => (
          <input
            key={idx}
            value={item}
            onChange={e => handleArrayChange(e, idx, 'medications')}
            placeholder={`Medicação ${idx + 1}`}
          />
        ))}
        <button type="button" onClick={() => addField('medications')}>+ Medicação</button>

        <label>Observações* Médicas</label>
        <textarea name="observations" value={student.medicalInfo.observations} onChange={handleChange} />

        <h3>Endereço</h3>
        <label>CEP*</label>
        <input name="address.zipCode" value={student.address?.zipCode} onChange={handleChange} />
        <label>Bairro*</label>
        <input name="address.district" value={student.address?.district} onChange={handleChange} />
        <label>Rua*</label>
        <input name="address.street" value={student.address?.street} onChange={handleChange} />
        <label>Número*</label>
        <input name="address.number" value={student.address?.number} onChange={handleChange} />
        <label>Complemento*</label>
        <input name="address.complement" value={student.address?.complement} onChange={handleChange} />
        <label>Cidade*</label>
        <input name="address.city" value={student.address?.city} onChange={handleChange} />
        <label>Estado*</label>
        <input name="address.state" value={student.address?.state} onChange={handleChange} />
        */}
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

  button {
    margin-top: 0.5rem;
    width: fit-content;
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
