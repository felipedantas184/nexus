import SearchBar from "@/components/Dashboard/SearchBar";
import StudentsTable from "@/components/Dashboard/StudentsTable";
import fireDB from "@/firebase/initFirebase";
import Layout from "@/layout";
import { Student } from "@/types/studentTypes";
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";

export async function getServerSideProps() {
  const DBStudents = await getDocs(collection(fireDB, "students"));
  const students: any = []
  DBStudents.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data()
    }

    students.push(obj)
  });

  return {
    props: {
      students
    }
  }
}

export default function HomePage({ students }: { students: Student[] }) {
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
        <SearchBar />
        <StudentsTable students={students} />
      </Layout>
    </>
  );
}