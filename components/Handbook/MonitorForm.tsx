import { useState, useEffect } from "react";
import styled from "styled-components";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";
import { useAuth } from "@/context/AuthContext";

type UserData = {
  name: string;
  type: string;
};

const MonitorForm = ({ studentId }: { studentId: string }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  // Campos do formulário (exemplo baseado no Google Forms)
  const [participation, setParticipation] = useState("");
  const [attention, setAttention] = useState("");
  const [homework, setHomework] = useState("");
  const [mood, setMood] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return;
      const userRef = doc(fireDB, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData({ name: data.name, type: data.type });
      }
    };
    fetchUserData();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData || userData.type !== "monitor") {
      alert("Apenas monitores podem preencher este formulário.");
      return;
    }

    try {
      await addDoc(collection(fireDB, "monitorForms"), {
        studentId,
        monitorId: user?.uid,
        monitorName: userData.name,
        date: new Date().toLocaleDateString("pt-BR"),
        answers: {
          participation,
          attention,
          homework,
          mood,
        },
        createdAt: serverTimestamp(),
      });

      alert("Formulário enviado com sucesso!");
      // Reset
      setParticipation("");
      setAttention("");
      setHomework("");
      setMood("");
    } catch (error) {
      console.error("Erro ao salvar formulário:", error);
      alert("Erro ao salvar formulário.");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>Formulário do Monitor</h3>

      <Label>Participação do aluno</Label>
      <Select value={participation} onChange={(e) => setParticipation(e.target.value)} required>
        <option value="">Selecione</option>
        <option value="Sim">Sim</option>
        <option value="Não">Não</option>
      </Select>

      <Label>Atenção durante a aula</Label>
      <Select value={attention} onChange={(e) => setAttention(e.target.value)} required>
        <option value="">Selecione</option>
        <option value="Boa">Boa</option>
        <option value="Regular">Regular</option>
        <option value="Baixa">Baixa</option>
      </Select>

      <Label>Tarefa de casa</Label>
      <Select value={homework} onChange={(e) => setHomework(e.target.value)} required>
        <option value="">Selecione</option>
        <option value="Fez">Fez</option>
        <option value="Não fez">Não fez</option>
      </Select>

      <Label>Humor do aluno</Label>
      <Select value={mood} onChange={(e) => setMood(e.target.value)} required>
        <option value="">Selecione</option>
        <option value="Tranquilo">Tranquilo</option>
        <option value="Ansioso">Ansioso</option>
        <option value="Agitado">Agitado</option>
      </Select>

      <Button type="submit">Salvar Formulário</Button>
    </FormContainer>
  );
};

export default MonitorForm;

// ================== Styled ==================
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fafafa;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #13131a;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #aaa;
  border-radius: 8px;
  font-size: 14px;
`;

const Button = styled.button`
  background: #13131a;
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 0.9;
  }
`;