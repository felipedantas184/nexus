import { Student } from "@/types/studentTypes";
import Link from "next/link";
import styled from "styled-components";

const StudentsTable = ({ students }: { students: Student[] }) => {
  return (
    <Wrapper>
      <TableHeader>
        <Table cellPadding={4} cellSpacing={4} border={0}>
          <thead>
            <Tr>
              <Th style={{flex: 2, textAlign: 'left'}}>Nome</Th>
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
            {(students.map((student: Student) => (
              <Tr key={student.id}>
                <Td style={{ flex: 2, textAlign: 'left' }}>{student.name}</Td>
                <Td>{student.birthday}</Td>
                <Td>{student.grade}</Td>
                <Td>{student.school}</Td>
                <Td><Link href={`/handbook/${student.id}`} >Ação</Link></Td>
              </Tr>
            )))}
          </tbody>
        </Table>
      </TableContent>
    </Wrapper>
  );
}

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