"use client";

import CustomizeNavbar from "./components/CustomizeNavbar";
import Sidebar from "./components/Sidebar";
import StatusBoard from "./components/StatusBoard";
import React, { useState } from "react";
import { Drawer, DrawerContent } from "@nextui-org/react";
import { useMobileBreakpoint } from "./hooks";
import Loading from "./components/Loading";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobileBreakpoint();
  const handleOpen = () => {
    console.log("called handleOpen");
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex h-screen dark">
      {isMobile === "pending" ? (
        <Loading />
      ) : isMobile ? (
        <>
          <Drawer isOpen={isOpen} placement="left" onClose={handleClose}>
            <DrawerContent>
              <Sidebar isMobile={true} />
            </DrawerContent>
          </Drawer>
          <div className="flex-1 flex flex-col p-10">
            <CustomizeNavbar isMobile={true} handleOpen={handleOpen} />
            <main className="flex-1">
              <StatusBoard isMobile={true} />
            </main>
          </div>
        </>
      ) : (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col p-10">
            <CustomizeNavbar />
            <main className="flex-1">
              <StatusBoard />
            </main>
          </div>
        </>
      )}
    </div>
  );
}
