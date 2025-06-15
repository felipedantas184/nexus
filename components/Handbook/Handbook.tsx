import styled from "styled-components";
import TextField from "./TextField";
import ObsList from "./ObsList";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";
import { useAuth } from "@/context/AuthContext";
import { Note } from "@/types/studentTypes";

type UserData = {
  name: string;
  type: string;
};

const Handbook = ({ notes, studentId }: { notes: Note[]; studentId: string }) => {
  const [allNotes, setAllNotes] = useState(notes);
  const [selectedNote, setSelectedNote] = useState(notes[0] || null);

  const { user } = useAuth(); // Firebase user
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return;

      try {
        const userRef = doc(fireDB, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData({ name: data.name, type: data.type }); // Ex: monitor, psychologist ou psychiatrist
        } else {
          console.warn("Usuário não encontrado na coleção 'users'.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleAddNote = () => {
    const tempExists = allNotes.some((note) => note.id.startsWith("temp-"));
    if (tempExists || !userData) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-BR");

    const newNote: any = {
      id: `temp-${Date.now()}`,
      text: "",
      studentId: studentId, // <-- Usando a prop diretamente
      authorType: userData.type,
      authorName: userData.name,
      timeStamp: formattedDate, // <-- Agora no formato "dd/mm/yyyy"
    };

    setAllNotes((prev: any) => [newNote, ...prev]);
    setSelectedNote(newNote);
  };


  const handleSaveNote = async (updatedText: string) => {
    const isNewNote = selectedNote.id.startsWith("temp-");
    if (!isNewNote) return;

    try {
      const newDocRef = await addDoc(collection(fireDB, "notes"), {
        text: updatedText,
        studentId: selectedNote.studentId,
        authorType: selectedNote.authorType,
        authorName: selectedNote.authorName,
        timeStamp: selectedNote.timeStamp,
      });

      const savedNote = {
        ...selectedNote,
        id: newDocRef.id,
        text: updatedText,
      };

      const updatedNotes = allNotes
        .filter((note) => !note.id.startsWith("temp-")) // Remove qualquer nota temporária
        .concat(savedNote); // Adiciona a salva

      setAllNotes(updatedNotes);
      setSelectedNote(savedNote);
      alert("Nota salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar nota:", error);
      alert("Erro ao salvar nota.");
    }
  };

  const handleCancelNote = () => {
    const filtered = allNotes.filter((n) => !n.id.startsWith("temp-"));
    setAllNotes(filtered);
    setSelectedNote(filtered[0] || null); // volta para a nota anterior ou nenhuma
  };

  const toggle = (note: any) => {
    // Se clicou na mesma nota, não faz nada
    if (note.id === selectedNote?.id) return;

    // Se há uma nota nova, descarta ao trocar para uma nota salva
    const tempExists = allNotes.some((n) => n.id.startsWith("temp-"));
    const isSwitchingToSaved = !note.id.startsWith("temp-");

    if (tempExists && isSwitchingToSaved) {
      const updatedNotes = allNotes.filter((n) => !n.id.startsWith("temp-"));
      setAllNotes(updatedNotes);
      setSelectedNote(note);
    } else {
      setSelectedNote(note);
    }
  };

  return (
    <Container>
      <h1></h1>
      <TextField
        note={selectedNote}
        isReadOnly={!selectedNote?.id.startsWith("temp-")}
        onAddNote={handleAddNote}
        onSaveNote={handleSaveNote}
        onCancelNote={handleCancelNote}
        userType={userData?.type}
      />
      <ObsList notes={allNotes} toggle={toggle} />
    </Container>
  );
};

export default Handbook;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  height: 100%;
  width: 100%;
  padding: 8px 12px;
`;
