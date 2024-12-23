"use client";

import tickets from "../db/tickets.json";
import { Ticket } from "../interfaces";
import TicketColumn from "./TicketColumn";
import { useMobileBreakpoint } from "../hooks";

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
