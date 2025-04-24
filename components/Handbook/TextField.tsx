import { Note } from "@/types/StudentTypes";
import { useEffect, useState } from "react";
import { BiAddToQueue, BiSave } from "react-icons/bi";
import { BsFileEarmarkLock2 } from "react-icons/bs";
import styled from "styled-components";

const TextField = ({
  note,
  isReadOnly,
  onAddNote,
  onSaveNote,
}: {
  note: any;
  isReadOnly: boolean;
  onAddNote: () => void;
  onSaveNote: (updatedText: string) => void;
}) => {
  const [text, setText] = useState(note.text || "");

  useEffect(() => {
    setText(note.text || "");
  }, [note]);

  return (
    <Container>
      <TextBold># Observação de {note.authorType || "Monitor"}</TextBold>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={isReadOnly}
        placeholder="Digite a observação..."
      />
      <Menu>
        <BsFileEarmarkLock2 size={24} color="#13131A" />
        {!isReadOnly && (
          <BiSave
            size={24}
            color="#13131A"
            onClick={() => onSaveNote(text)}
            style={{ cursor: "pointer" }}
          />
        )}
        <BiAddToQueue
          size={24}
          color="#13131A"
          onClick={onAddNote}
          style={{ cursor: "pointer" }}
        />
      </Menu>
    </Container>
  );
};

export default TextField;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 8;
  height: 100%;

  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #13131A;
`;
const Meta = styled.p`
  font-size: 12px;
  color: #666;
`;
const Textarea = styled.textarea`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  height: 250px;
  resize: none;
  border: none;
  outline: none;
`;
const TextBold = styled.p`
  color: #13131A;
  font-size: 14px;
  font-weight: 600;
`;
const Text = styled.p`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
  height: 100%;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  gap: 8px;
`;