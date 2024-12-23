"use client";

import { useState, useEffect } from "react";
import tickets from "../db/tickets.json";
import { Ticket } from "../interfaces";
import TicketColumn from "./TicketColumn";

const statuses = ["Todo", "In Progress", "Done"];

export default function StatusBoard() {
  const isMobile = useMobileBreakpoint();

  if (isMobile) {
    return (
      <div className="gap-4 h-full">
        <TicketColumn
          key={1}
          group={"In Progress"}
          tasks={tickets.filter((ticket: Ticket) => ticket.task_status === 1)}
        />
        <TicketColumn
          key={0}
          group={"Todo"}
          tasks={tickets.filter((ticket: Ticket) => ticket.task_status === 0)}
        />
        <TicketColumn
          key={2}
          group={"Done"}
          tasks={tickets.filter((ticket: Ticket) => ticket.task_status === 2)}
        />
      </div>
    );
  }

  return (
    <div className="flex gap-4 h-full">
      <TicketColumn
        key={0}
        group={"Todo"}
        tasks={tickets.filter((ticket: Ticket) => ticket.task_status === 0)}
        scroll={true}
      />
      <TicketColumn
        key={1}
        group={"In Progress"}
        tasks={tickets.filter((ticket: Ticket) => ticket.task_status === 1)}
        scroll={true}
      />
      <TicketColumn
        key={2}
        group={"Done"}
        tasks={tickets.filter((ticket: Ticket) => ticket.task_status === 2)}
        scroll={true}
      />
    </div>
  );
}

function useMobileBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width < 640;
}
