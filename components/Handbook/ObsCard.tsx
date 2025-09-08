import styled from "styled-components";
import { Note } from "@/types/studentTypes";

const ObsCard = ({
  note,
  toggle,
  isSelected,
}: {
  note: Note;
  toggle: (note: Note) => void;
  isSelected: boolean;
}) => {
  return (
    <Container onClick={() => toggle(note)} $isSelected={isSelected}>
      <Title>{note.authorName}</Title>
      <Subtitle>
        {note.authorType?.charAt(0).toUpperCase() + note.authorType?.slice(1)}
      </Subtitle>
      <Subtitle>{note.timeStamp}</Subtitle>
    </Container>
  );
};

export default ObsCard;

const Container = styled.div<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#D6E4FF" : "#F6F6F6"}; // 🔹 Cor diferente
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 4px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const Title = styled.p`
  color: #13131a;
  font-size: 14px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #13131a;
  font-size: 12px;
  font-weight: 500;
`;