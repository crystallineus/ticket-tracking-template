"use client";
import CustomizeNavbar from "./components/CustomizeNavbar";
import Sidebar from "./components/Sidebar";
import StatusBoard from "./components/StatusBoard";
import tickets from "./db/tickets.json";
import React from "react";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 ml-56 flex flex-col p-10">
        <CustomizeNavbar />
        <main className="flex-1">
          <StatusBoard />
        </main>
      </div>
    </div>
  );
}
