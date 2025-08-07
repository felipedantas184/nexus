import { addDoc, collection } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";
import { useState } from "react";

const TestePage = () => {
  const [loading, setLoading] = useState(false);

  const handleAddFakeStudents = async () => {
    setLoading(true);

    const students = [
  {
    name: 'João Pereira da Silva',
    imageUrl: '',
    email: 'joao@gmail.com',
    birthday: '14/01/2003',
    cpf: '12345678910',
    phone: '86995185050',
    school: 'Instituto Dom Barreto',
    grade: '1º Ano E.M.',
    origin: 'fracta',
    diagnosis: ['TDAH'],
    medicalInfo: {
      medications: ['Ritalina 10mg'],
      observations: 'Necessita de acompanhamento semanal com psicólogo.',
    },
    address: {
      zipCode: '64091250',
      district: 'Gurupi',
      street: 'Rua Zaira Freire',
      number: '647',
      complement: '',
      city: 'Teresina',
      state: 'PI',
    },
  },
  {
    name: 'Maria Clara Souza',
    imageUrl: '',
    email: 'maria.clara@gmail.com',
    birthday: '02/06/2004',
    cpf: '11122233344',
    phone: '86999887766',
    school: 'Instituto Dom Barreto',
    grade: '2º Ano E.M.',
    origin: 'particular',
    diagnosis: ['Ansiedade'],
    medicalInfo: {
      medications: ['Sertralina 50mg'],
      observations: '',
    },
    address: {
      zipCode: '64000000',
      district: 'Centro',
      street: 'Rua das Flores',
      number: '123',
      complement: '',
      city: 'Teresina',
      state: 'PI',
    },
  },
  {
    name: 'Lucas Andrade Lima',
    imageUrl: '',
    email: 'lucas.andrade@gmail.com',
    birthday: '10/03/2005',
    cpf: '22233344455',
    phone: '86991234567',
    school: 'CEV',
    grade: '1º Ano E.M.',
    origin: 'fracta',
    diagnosis: ['Dislexia'],
    medicalInfo: {
      medications: [],
      observations: 'Dificuldade na leitura. Usa fonte ampliada.',
    },
    address: {
      zipCode: '64002000',
      district: 'Ilhotas',
      street: 'Rua Frei Serafim',
      number: '450',
      complement: 'Ap 101',
      city: 'Teresina',
      state: 'PI',
    },
  },
  {
    name: 'Ana Júlia Mendes',
    imageUrl: '',
    email: 'ana.julia@gmail.com',
    birthday: '25/08/2003',
    cpf: '33344455566',
    phone: '86998765432',
    school: 'Diocesano',
    grade: '3º Ano E.M.',
    origin: 'particular',
    diagnosis: ['TDAH', 'Ansiedade'],
    medicalInfo: {
      medications: ['Venvanse 30mg', 'Escitalopram 10mg'],
      observations: 'Melhora com acompanhamento psicopedagógico.',
    },
    address: {
      zipCode: '64010000',
      district: 'Mocambinho',
      street: 'Av. União',
      number: '880',
      complement: '',
      city: 'Teresina',
      state: 'PI',
    },
  },
  {
    name: 'Pedro Henrique Castro',
    imageUrl: '',
    email: 'pedro.castro@gmail.com',
    birthday: '12/11/2005',
    cpf: '44455566677',
    phone: '86991122334',
    school: 'CEV',
    grade: '2º Ano E.M.',
    origin: 'fracta',
    diagnosis: [],
    medicalInfo: {
      medications: [],
      observations: '',
    },
    address: {
      zipCode: '64025000',
      district: 'Dirceu',
      street: 'Rua Bela Vista',
      number: '92',
      complement: '',
      city: 'Teresina',
      state: 'PI',
    },
  },
  {
    name: 'Isabela Rocha Lima',
    imageUrl: '',
    email: 'isabela.rocha@gmail.com',
    birthday: '01/09/2004',
    cpf: '55566677788',
    phone: '86999881234',
    school: 'Instituto Dom Barreto',
    grade: '3º Ano E.M.',
    origin: 'particular',
    diagnosis: ['Depressão'],
    medicalInfo: {
      medications: ['Fluoxetina 20mg'],
      observations: 'Retorno psiquiátrico a cada 30 dias.',
    },
    address: {
      zipCode: '64037000',
      district: 'Santa Isabel',
      street: 'Av. João XXIII',
      number: '1320',
      complement: '',
      city: 'Teresina',
      state: 'PI',
    },
  },
  {
    name: 'Rafael Oliveira Moura',
    imageUrl: '',
    email: 'rafael.moura@gmail.com',
    birthday: '18/05/2003',
    cpf: '66677788899',
    phone: '86993456789',
    school: 'Diocesano',
    grade: '2º Ano E.M.',
    origin: 'fracta',
    diagnosis: ['TDAH'],
    medicalInfo: {
      medications: ['Ritalina LA 20mg'],
      observations: '',
    },
    address: {
      zipCode: '64018000',
      district: 'Vermelha',
      street: 'Rua Projetada 102',
      number: '100',
      complement: '',
      city: 'Teresina',
      state: 'PI',
    },
  },
  {
    name: 'Carla Beatriz Silva',
    imageUrl: '',
    email: 'carla.beatriz@gmail.com',
    birthday: '30/04/2005',
    cpf: '77788899900',
    phone: '86995678901',
    school: 'CEV',
    grade: '1º Ano E.M.',
    origin: 'particular',
    diagnosis: [],
    medicalInfo: {
      medications: [],
      observations: '',
    },
    address: {
      zipCode: '64030000',
      district: 'Ininga',
      street: 'Rua São Pedro',
      number: '400',
      complement: '',
      city: 'Teresina',
      state: 'PI',
    },
  },
  {
    name: 'Vinícius Araújo Martins',
    imageUrl: '',
    email: 'vinicius.martins@gmail.com',
    birthday: '22/02/2003',
    cpf: '88899900011',
    phone: '86998781234',
    school: 'Diocesano',
    grade: '3º Ano E.M.',
    origin: 'fracta',
    diagnosis: ['Discalculia'],
    medicalInfo: {
      medications: [],
      observations: 'Necessita reforço específico em matemática.',
    },
    address: {
      zipCode: '64028000',
      district: 'Piçarreira',
      street: 'Rua dos Cravos',
      number: '56',
      complement: '',
      city: 'Teresina',
      state: 'PI',
    },
  },
  {
    name: 'Laura Cristina Mendes',
    imageUrl: '',
    email: 'laura.mendes@gmail.com',
    birthday: '17/07/2004',
    cpf: '99900011122',
    phone: '86998112233',
    school: 'Instituto Dom Barreto',
    grade: '2º Ano E.M.',
    origin: 'particular',
    diagnosis: ['Ansiedade', 'Depressão'],
    medicalInfo: {
      medications: ['Escitalopram 10mg'],
      observations: 'Atendimento psicológico semanal.',
    },
    address: {
      zipCode: '64050000',
      district: 'Monte Castelo',
      street: 'Rua dos Lírios',
      number: '232',
      complement: '',
      city: 'Teresina',
      state: 'PI',
    },
  },
];


    try {
      const batch = students.map((student) =>
        addDoc(collection(fireDB, "students"), student)
      );
      await Promise.all(batch);
      alert("Estudantes adicionados com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar estudantes:", error);
      alert("Erro ao adicionar estudantes.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Teste: Popular Students</h1>
      <button
        onClick={handleAddFakeStudents}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#13131A",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? "Adicionando..." : "Popular Students"}
      </button>
    </div>
  );
};

export default TestePage;
