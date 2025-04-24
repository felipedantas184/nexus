import styled from "styled-components";
import ObsCard from "./ObsCard";
import { Note } from "@/types/studentTypes";

const ObsList = ({ notes, toggle }: { notes: Note[], toggle: (note: Note) => void }) => {
  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // Ordena as notas do mais recente para o mais antigo
  const sortedNotes = [...notes].sort((a, b) => {
    const dateA = parseDate(a.timeStamp);
    const dateB = parseDate(b.timeStamp);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <Container>
      {sortedNotes.map((note) => (
        <ObsCard key={note.id} note={note} toggle={toggle} />
      ))}
    </Container>
  );
};

export default ObsList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 2;
  height: 100%;
`;
