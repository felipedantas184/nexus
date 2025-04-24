import styled from "styled-components";
import { Note } from "@/types/StudentTypes";

const ObsCard = ({ note, toggle }: { note: Note, toggle: (note: Note) => void }) => {
  return (
    <Container onClick={() => toggle(note)}>
      <Title>{note.authorName}</Title>
      <Subtitle>{note.authorType?.charAt(0).toUpperCase() + note.authorType?.slice(1)}</Subtitle>
      <Subtitle>{note.timeStamp}</Subtitle>
    </Container>
  );
};

export default ObsCard;

const Container = styled.div`
  background-color: #F6F6F6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 4px;
  border-radius: 10px;
  cursor: pointer;
`;

const Title = styled.p`
  color: #13131A;
  font-size: 14px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #13131A;
  font-size: 12px;
  font-weight: 500;
`;
