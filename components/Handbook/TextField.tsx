import { useEffect, useState } from "react";
import { BiAddToQueue, BiSave } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
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
  onSaveNote: (updatedText: string, formData?: any) => void;
  onCancelNote: () => void;
  userType: string | undefined;
}) => {
  const [text, setText] = useState(note?.text || "");

  // Campos do formulário objetivo
  const [participation, setParticipation] = useState("");
  const [attention, setAttention] = useState("");
  const [homework, setHomework] = useState("");
  const [mood, setMood] = useState("");

  useEffect(() => {
    setText(note?.text || "");
    if (note?.formData) {
      setParticipation(note.formData.participation || "");
      setAttention(note.formData.attention || "");
      setHomework(note.formData.homework || "");
      setMood(note.formData.mood || "");
    } else {
      setParticipation("");
      setAttention("");
      setHomework("");
      setMood("");
    }
  }, [note]);

  const handleSave = () => {
    const formData = { participation, attention, homework, mood };
    onSaveNote(text, formData);
  };

  return (
    <Container>
      <TextBold>
        # Observação de <span style={{ textTransform: "capitalize" }}>{userType}</span>
      </TextBold>

      {/* Campo livre */}
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={isReadOnly}
        placeholder="Digite a observação..."
      />

      {/* Formulário objetivo - só aparece quando editando/criando */}
      {!isReadOnly && (
        <FormSection>
          <Label>Nível de Energia</Label>
          <Select value={participation} onChange={(e) => setParticipation(e.target.value)} required>
            <option value="" disabled>Selecione</option>
            <option value="Muito Alto">Muito Alto</option>
            <option value="Alto">Alto</option>
            <option value="Regular">Regular</option>
            <option value="Baixo">Baixo</option>
            <option value="Muito Baixo">Muito Baixo</option>
          </Select>

          <Label>Nível de Atenção</Label>
          <Select value={attention} onChange={(e) => setAttention(e.target.value)} required>
            <option value="" disabled>Selecione</option>
            <option value="Muito Alto">Muito Alto</option>
            <option value="Alto">Alto</option>
            <option value="Regular">Regular</option>
            <option value="Baixo">Baixo</option>
            <option value="Muito Baixo">Muito Baixo</option>
          </Select>

          <Label>Participação em Aula</Label>
          <Select value={homework} onChange={(e) => setHomework(e.target.value)} required>
            <option value="" disabled>Selecione</option>
            <option value="Muito Alto">Muito Alto</option>
            <option value="Alto">Alto</option>
            <option value="Regular">Regular</option>
            <option value="Baixo">Baixo</option>
            <option value="Muito Baixo">Muito Baixo</option>
          </Select>

          <Label>Humor predominante</Label>
          <Select value={mood} onChange={(e) => setMood(e.target.value)} required>
            <option value="" disabled>Selecione</option>
            <option value="Muito Feliz">Muito Feliz</option>
            <option value="Feliz">Feliz</option>
            <option value="Regular">Regular</option>
            <option value="Triste">Triste</option>
            <option value="Muito Triste">Muito Triste</option>
          </Select>
        </FormSection>
      )}

      {/* Exibição das respostas quando só estiver lendo */}
      {isReadOnly && note?.formData && (
        <FormView>
          <ViewItem><strong>Nível de Energia:</strong> {participation}</ViewItem>
          <ViewItem><strong>Nível de Atenção:</strong> {attention}</ViewItem>
          <ViewItem><strong>Participação em Aula:</strong> {homework}</ViewItem>
          <ViewItem><strong>Humor predominante:</strong> {mood}</ViewItem>
        </FormView>
      )}

      <Menu>
        {!isReadOnly && (
          <>
            <BiSave
              size={24}
              color="#13131A"
              onClick={handleSave}
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

// ================== Styled ==================
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 8;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #13131a;
  height: 100%;
`;

const Textarea = styled.textarea`
  color: #13131a;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  min-height: 100px;
  resize: none;
  border: none;
  outline: none;
  flex: 1;
`;

const TextBold = styled.p`
  color: #13131a;
  font-size: 14px;
  font-weight: 600;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  gap: 8px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  background: #fafafa;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #13131a;
`;

const Select = styled.select`
  padding: 6px;
  border: 1px solid #aaa;
  border-radius: 6px;
  font-size: 13px;
`;

const FormView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  background: #f0f0f0;
  padding: 10px;
  border-radius: 6px;
`;

const ViewItem = styled.p`
  font-size: 13px;
  color: #13131a;
`;