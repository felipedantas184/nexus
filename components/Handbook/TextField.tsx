import { useEffect, useState } from "react";
import { BiAddToQueue, BiSave } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai"; // ← Novo ícone
import styled from "styled-components";

const TextField = ({
  note,
  isReadOnly,
  onAddNote,
  onSaveNote,
  onCancelNote, 
  userType,
}: {
  note: any;
  isReadOnly: boolean;
  onAddNote: () => void;
  onSaveNote: (updatedText: string) => void;
  onCancelNote: () => void;
  userType: string | undefined;
}) => {
  const [text, setText] = useState(note?.text || "");

  useEffect(() => {
    setText(note?.text || "");
  }, [note]);

  return (
    <Container>
      <TextBold># Observação de <span style={{textTransform: 'capitalize'}}>{userType}</span></TextBold>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={isReadOnly}
        placeholder="Digite a observação..."
      />
      <Menu>
        {!isReadOnly && (
          <>
            <BiSave
              size={24}
              color="#13131A"
              onClick={() => onSaveNote(text)}
              style={{ cursor: "pointer" }}
              title="Salvar nota"
            />
            <AiOutlineClose
              size={24}
              color="#ff4d4f"
              onClick={onCancelNote}
              style={{ cursor: "pointer" }}
              title="Cancelar nota"
            />
          </>
        )}
        <BiAddToQueue
          size={24}
          color="#13131A"
          onClick={onAddNote}
          style={{ cursor: "pointer" }}
          title="Nova nota"
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
  height: 100%;
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