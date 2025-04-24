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
        email: 'joao@gmail.com',
        birthday: '14/01/2003',
        cpf: '12345678910',
        phone: '86995185050',
        school: 'Instituto Dom Barreto',
        grade: '1º Ano E.M.',
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
        email: 'maria.clara@gmail.com',
        birthday: '02/06/2004',
        cpf: '11122233344',
        phone: '86999887766',
        school: 'Instituto Dom Barreto',
        grade: '2º Ano E.M.',
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
        name: 'Pedro Henrique Lima',
        email: 'pedro.lima@gmail.com',
        birthday: '15/08/2005',
        cpf: '55566677788',
        phone: '86991234567',
        school: 'Instituto Dom Barreto',
        grade: '3º Ano E.M.',
        address: {
          zipCode: '64010000',
          district: 'Ilhotas',
          street: 'Av. Frei Serafim',
          number: '2000',
          complement: '',
          city: 'Teresina',
          state: 'PI',
        },
      },
      {
        name: 'Larissa Matos Almeida',
        email: 'larissa.almeida@gmail.com',
        birthday: '23/03/2004',
        cpf: '99988877766',
        phone: '86993456789',
        school: 'Instituto Dom Barreto',
        grade: '1º Ano E.M.',
        address: {
          zipCode: '64030000',
          district: 'São Cristóvão',
          street: 'Rua Principal',
          number: '1111',
          complement: '',
          city: 'Teresina',
          state: 'PI',
        },
      },
      {
        name: 'Lucas Ferreira Rocha',
        email: 'lucas.rocha@gmail.com',
        birthday: '10/11/2003',
        cpf: '12312312312',
        phone: '86997654321',
        school: 'Instituto Dom Barreto',
        grade: '2º Ano E.M.',
        address: {
          zipCode: '64040000',
          district: 'Vermelha',
          street: 'Rua do Sol',
          number: '56',
          complement: '',
          city: 'Teresina',
          state: 'PI',
        },
      },
      {
        name: 'Isabela Cruz',
        email: 'isabela.cruz@gmail.com',
        birthday: '01/02/2005',
        cpf: '32132132132',
        phone: '86998765432',
        school: 'Instituto Dom Barreto',
        grade: '3º Ano E.M.',
        address: {
          zipCode: '64050000',
          district: 'Horto',
          street: 'Rua das Acácias',
          number: '789',
          complement: '',
          city: 'Teresina',
          state: 'PI',
        },
      },
      {
        name: 'Renan Santos',
        email: 'renan.santos@gmail.com',
        birthday: '17/09/2004',
        cpf: '87654321098',
        phone: '86998887744',
        school: 'Instituto Dom Barreto',
        grade: '2º Ano E.M.',
        address: {
          zipCode: '64060000',
          district: 'Cristo Rei',
          street: 'Rua São Pedro',
          number: '15',
          complement: '',
          city: 'Teresina',
          state: 'PI',
        },
      },
      {
        name: 'Camila Ribeiro',
        email: 'camila.ribeiro@gmail.com',
        birthday: '09/04/2003',
        cpf: '56789012345',
        phone: '86996543210',
        school: 'Instituto Dom Barreto',
        grade: '1º Ano E.M.',
        address: {
          zipCode: '64070000',
          district: 'Piçarra',
          street: 'Rua Primavera',
          number: '321',
          complement: '',
          city: 'Teresina',
          state: 'PI',
        },
      },
      {
        name: 'Thiago Oliveira',
        email: 'thiago.oliveira@gmail.com',
        birthday: '20/12/2005',
        cpf: '99911122233',
        phone: '86990123456',
        school: 'Instituto Dom Barreto',
        grade: '3º Ano E.M.',
        address: {
          zipCode: '64080000',
          district: 'Acarape',
          street: 'Rua das Mangueiras',
          number: '88',
          complement: '',
          city: 'Teresina',
          state: 'PI',
        },
      },
      {
        name: 'Aline Martins',
        email: 'aline.martins@gmail.com',
        birthday: '06/07/2004',
        cpf: '22233344455',
        phone: '86992345678',
        school: 'Instituto Dom Barreto',
        grade: '2º Ano E.M.',
        address: {
          zipCode: '64090000',
          district: 'Morada Nova',
          street: 'Rua das Palmeiras',
          number: '455',
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
