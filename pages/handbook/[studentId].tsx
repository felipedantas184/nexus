import Handbook from "@/components/Handbook/Handbook";
import StudentInfo from "@/components/Handbook/StudentInfo";
import fireDB from "@/firebase/initFirebase";
import Layout from "@/layout";
import { Note, Student } from "@/types/studentTypes";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { BiArrowToRight } from "react-icons/bi";
import { RxArrowTopRight } from "react-icons/rx";

export const getServerSideProps = async (context: any) => {
  const id = context.params.studentId;

  // Busca dados do aluno
  const studentDoc = await getDoc(doc(fireDB, "students", id));
  const studentData = studentDoc.data();

  if (!studentData) {
    return {
      notFound: true,
    };
  }

  const student: any = {
    ...studentData,
    id,
  };

  // Busca as notas desse aluno
  const notesQuery = query(
    collection(fireDB, "notes"),
    where("studentId", "==", id)
  );
  const notesSnapshot = await getDocs(notesQuery);

  const notes: Note[] = notesSnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      text: data.text || "",
      timeStamp: data.timeStamp || null,
      studentId: data.studentId,
      psychologistId: data.psychologistId || null,
      psychiatristId: data.psychiatristId || null,
      monitorId: data.monitorId || null,
      authorType: data.authorType || "monitor",
      authorName: data.authorName || "Desconhecido",
    };
  });

  return {
    props: {
      student,
      notes,
    },
  };
};

export default function DetailPage({
  student,
  notes,
}: {
  student: Student;
  notes: Note[];
}) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Se o aluno tiver campo authorizedProfessionals, verificamos se uid está incluso
        const allowed = student.authorizedProfessionals?.includes(user.uid);
        setAuthorized(!!allowed);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [student]);

  if (loading) {
    return <Layout><p>Carregando...</p></Layout>;
  }

  if (!authorized) {
    return (
      <Layout>
        <div style={{padding: 8, display: "flex", flexDirection: 'column', gap: 8}}>
          <h3>Você não tem permissão para visualizar este aluno.</h3>
          <Link style={{display: 'flex', gap: 4}} href={'/'}>Clique para voltar à página inicial <RxArrowTopRight /></Link>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Nexus</title>
        <meta name="description" content="Simples, rápido e eficiente. Crie sua loja online e conquiste mais clientes!" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="Nexus" />
        <meta property="og:description" content="Simples, rápido e eficiente. Crie sua loja online e conquiste mais clientes!" />
        <meta property="og:image" content="https://easyshopbrasil.vercel.app/assets/images/logo/logo-og.jpg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:site_name" content="Nexus" />

        <meta property="twitter:title" content="Nexus" />
        <meta property="twitter:description" content="Simples, rápido e eficiente. Crie sua loja online e conquiste mais clientes!" />
        <meta property="twitter:image" content="https://easyshopbrasil.vercel.app/assets/images/logo/logo-og.jpg" />
      </Head>

      <Layout>
        <StudentInfo student={student} />
        <Handbook notes={notes} studentId={student.id} />
      </Layout>
    </>
  );
}