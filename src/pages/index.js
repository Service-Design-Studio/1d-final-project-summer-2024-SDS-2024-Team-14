import Head from 'next/head';
import Homepage from "../components/homepage/homepage.jsx";
import "../styles/globals.css";
import { redirect } from 'next/navigation'
import { getSession, SessionProvider} from "next-auth/react";
// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       session,
//     },
//   };
// }

export default function Home({ session }) {
  return (
    // <SessionProvider session={session}>
    <main className="flex flex-col align-middle min-w-minContent min-h-screen my-0 mx-0 bg-white transition-all-500">
      <Homepage />
      </main>
    // </SessionProvider>
  );
}