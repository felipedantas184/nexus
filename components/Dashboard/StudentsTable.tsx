import { Student } from "@/types/studentTypes";
import Link from "next/link";
import styled from "styled-components";
import { useState, useMemo } from "react";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext";

const StudentsTable = ({ students }: { students: Student[] }) => {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);

  const { user } = useAuth(); // pega user atual do Firebase

  // Extrai valores únicos
  const grades = useMemo(() => [...new Set(students.map(s => s.grade))], [students]);
  const schools = useMemo(() => {
    return selectedGrade
      ? [...new Set(students.filter(s => s.grade === selectedGrade).map(s => s.school))]
      : [];
  }, [students, selectedGrade]);
  const origins = useMemo(() => {
    return selectedGrade && selectedSchool
      ? [...new Set(students
          .filter(s => s.grade === selectedGrade && s.school === selectedSchool)
          .map(s => s.origin)
        )]
      : [];
  }, [students, selectedGrade, selectedSchool]);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      return (
        (!selectedGrade || s.grade === selectedGrade) &&
        (!selectedSchool || s.school === selectedSchool) &&
        (!selectedOrigin || s.origin === selectedOrigin)
      );
    });
  }, [students, selectedGrade, selectedSchool, selectedOrigin]);

  function byName(a: Student, b: Student) {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
  }

  return (
    <Wrapper>
      <Filters>
        <Select onChange={e => {
          setSelectedGrade(e.target.value);
          setSelectedSchool(null);
          setSelectedOrigin(null);
        }}>
          <option value="">Filtrar por Série</option>
          {grades.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Select>

        {selectedGrade && (
          <Select onChange={e => {
            setSelectedSchool(e.target.value);
            setSelectedOrigin(null);
          }}>
            <option value="">Filtrar por Escola</option>
            {schools.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        )}

        {selectedGrade && selectedSchool && (
          <Select onChange={e => setSelectedOrigin(e.target.value)}>
            <option value="">Filtrar por Origem</option>
            {origins.map(o => (
              <option key={o} value={o}>{o === 'particular' ? 'Particular' : 'Fracta'}</option>
            ))}
          </Select>
        )}
      </Filters>

      <TableHeader>
        <Table cellPadding={4} cellSpacing={4} border={0}>
          <thead>
            <Tr>
              <Th style={{ flex: 2, textAlign: "left" }}>Nome</Th>
              <Th>Nascimento</Th>
              <Th>Série</Th>
              <Th>Escola</Th>
              <Th>Ação</Th>
            </Tr>
          </thead>
        </Table>
      </TableHeader>

      <TableContent>
        <Table cellPadding={0} cellSpacing={0} border={0}>
          <tbody>
            {filteredStudents.sort(byName).map((student: Student) => {
              const isAuthorized = student.authorizedProfessionals?.includes(user?.uid ?? "");

              return (
                <Tr key={student.id}>
                  <Td style={{ flex: 2, textAlign: "left" }}>{student.name}</Td>
                  <Td>{student.birthday}</Td>
                  <Td>{student.grade}</Td>
                  <Td>{student.school}</Td>
                  <Td>
                    {isAuthorized ? (
                      <Link href={`/handbook/${student.id}`}>
                        <BsFillArrowUpRightSquareFill size={16} />
                      </Link>
                    ) : (
                      <DisabledIcon>
                        <BsFillArrowUpRightSquareFill size={16} />
                      </DisabledIcon>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </TableContent>
    </Wrapper>
  );
};

export default StudentsTable;

const Wrapper = styled.div`
  width: 100%;
  padding: 0px 8px;

	display: flex;
	flex-direction: column;
	align-items: center;

  overflow: hidden;
`
const TableHeader = styled.div`
  border-bottom: 1px solid gray;
  border-radius: 10px;
`
const TableContent = styled.div`
  height: 100%;
  margin-top: 0px;
`
const Table = styled.table`
  width: 100%;
  table-layout: fixed;
`
const Tr = styled.tr`
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: lightgray;
  }
`
const Th = styled.th`
  padding: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  color: #13131A;
  text-transform: uppercase;

  flex: 1;
`
const Td = styled.td`
  padding: 12px;
  text-align: center;
  vertical-align: middle;
  font-weight: 400;
  font-size: 12px;
  color: #13131A;
  border-bottom: solid 1px rgba(255,255,255,0.1);

  flex: 1;
`
const Filters = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-self: flex-start;
`;

const Select = styled.select`
  padding: 6px 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const DisabledIcon = styled.div`
  opacity: 0.3;
  cursor: not-allowed;
`;