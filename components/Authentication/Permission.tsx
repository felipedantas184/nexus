// components/Permission.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";

type Student = {
  id: string;
  name: string;
  authorizedProfessionals: string[];
};

type Professional = {
  id: string;
  name: string;
};

const Permission = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [editingStudent, setEditingStudent] = useState<string | null>(null);

  // Buscar alunos
  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(fireDB, "students"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Student, "id">),
      }));
      setStudents(list);
    };
    fetchStudents();
  }, []);

  // Buscar profissionais
  useEffect(() => {
    const fetchProfessionals = async () => {
      const snapshot = await getDocs(collection(fireDB, "users"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { name: string }),
      }));
      setProfessionals(list);
    };
    fetchProfessionals();
  }, []);

  const toggleProfessional = async (studentId: string, profId: string, checked: boolean) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    let updated = [...student.authorizedProfessionals];
    if (checked) {
      if (!updated.includes(profId)) updated.push(profId);
    } else {
      updated = updated.filter((id) => id !== profId);
    }

    // Atualiza no Firestore
    await updateDoc(doc(fireDB, "students", studentId), {
      authorizedProfessionals: updated,
    });

    // Atualiza localmente
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, authorizedProfessionals: updated } : s))
    );
  };

  return (
    <Container>
      <h1>Gerenciar Permissões</h1>
      {students.map((student) => (
        <StudentRow key={student.id}>
          <span>{student.name}</span>
          <FiSettings
            style={{ cursor: "pointer" }}
            onClick={() => setEditingStudent(editingStudent === student.id ? null : student.id)}
          />

          {editingStudent === student.id && (
            <CheckboxContainer>
              {professionals.map((prof) => (
                <label key={prof.id}>
                  <input
                    type="checkbox"
                    checked={student.authorizedProfessionals?.includes(prof.id) || false}
                    onChange={(e) => toggleProfessional(student.id, prof.id, e.target.checked)}
                  />
                  {prof.name}
                </label>
              ))}
            </CheckboxContainer>
          )}
        </StudentRow>
      ))}
      <Link href={'/'} style={{alignSelf: 'center'}} >
        <FButton>Voltar ao início</FButton>
      </Link>
    </Container>
  );
};

export default Permission;

// Styled components
const Container = styled.div`
  background-color: #f6f6f6;
  border-radius: 10px;
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 1.5rem;
  }
`;

const StudentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  margin-bottom: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    margin: 0.2rem 0;
  }
`;
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