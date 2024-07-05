import Head from 'next/head';
import Homepage from "../components/homepage/homepage.js";
import "../styles/globals.css";
import { redirect } from 'next/navigation'
import { getSession, SessionProvider} from "next-auth/react";
import "../hooks/useAuth"
import useAuth from "@/hooks/useAuth";
// import {ReactNotifications} from "react-notifications-component";

export default function Home({ session }) {
    useAuth();
  return (
    // <SessionProvider session={session}>
    <main className="flex flex-col align-middle min-h-screen my-0 mx-0 bg-white transition-all-500">
      <Homepage />
      </main>
    // </SessionProvider>
  );
}
