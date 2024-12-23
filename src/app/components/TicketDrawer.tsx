"use client";

import React from "react";
import {
  Tabs,
  Tab,
  Card,
  Avatar,
  Chip,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  AvatarGroup,
  TableCell,
  TableHeader,
  Table,
  TableColumn,
  TableBody,
  TableRow,
  Code,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { PencilSquareIcon, SignalIcon } from "@heroicons/react/24/outline";
import { StopCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Comment, Ticket } from "../interfaces";
import ticketsStatusHistory from "../db/ticket-status-history.json";
import ticketsComments from "../db/comments.json";

const taskStatusMap: { [key: number]: string } = {
  0: "Todo",
  1: "In Progress",
  2: "Done",
};

interface TicketDrawerProps {
  ticket: Ticket;
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export default function TicketDrawer({
  ticket,
  isOpen,
  isMobile,
  onClose,
}: TicketDrawerProps) {
  const statusHistory = ticketsStatusHistory.filter((h) => h.tid === ticket.id);
  const comments = ticketsComments.filter((c) => c.tid === ticket.id);

  return (
    <div>
      <Drawer isOpen={isOpen} size="2xl" onClose={onClose}>
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex items-center gap-1">
                {ticket.post_status === 0 && (
                  <PencilSquareIcon className="h-6 w-6 text-default-400" />
                )}
                {ticket.post_status === 1 && (
                  <StopCircleIcon className="h-6 w-6 text-warning" />
                )}
                {ticket.post_status === 3 && (
                  <CheckCircleIcon className="h-6 w-6 text-secondary" />
                )}
                <h2 className="font-bold">{ticket.title}</h2>
              </DrawerHeader>

              <DrawerBody>
                <div className="flex gap-4">
                  <div className={isMobile ? "w-full" : "w-4/6"}>
                    <p className="text-sm">{ticket.description}</p>
                  </div>

                  <Divider orientation="vertical" />

                  <div className={isMobile ? "w-full" : "w-2/6"}>
                    <Table
                      removeWrapper
                      hideHeader
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn>KEY</TableColumn>
                        <TableColumn>VALUE</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key="status">
                          <TableCell>Status</TableCell>
                          <TableCell>
                            <Chip
                              color={
                                ticket.task_status === 0
                                  ? "success"
                                  : ticket.task_status === 1
                                  ? "warning"
                                  : "secondary"
                              }
                              variant="dot"
                            >
                              <p className="text-sm">
                                {taskStatusMap[ticket.task_status]}
                              </p>
                            </Chip>
                          </TableCell>
                        </TableRow>
                        <TableRow key="estimate">
                          <TableCell>Estimate</TableCell>
                          <TableCell>
                            <Chip>
                              <p className="text-sm">{ticket.estimate}</p>
                            </Chip>
                          </TableCell>
                        </TableRow>
                        <TableRow key="start_date">
                          <TableCell>Start Date</TableCell>
                          <TableCell>
                            <Code>
                              {new Date(
                                ticket.start_date * 1000
                              ).toLocaleDateString()}
                            </Code>
                          </TableCell>
                        </TableRow>
                        <TableRow key="end_date">
                          <TableCell>End Date</TableCell>
                          <TableCell>
                            <Code>
                              {new Date(
                                ticket.end_date * 1000
                              ).toLocaleDateString()}
                            </Code>
                          </TableCell>
                        </TableRow>
                        <TableRow key="assignees">
                          <TableCell>Assignees</TableCell>
                          <TableCell>
                            <AvatarGroup isBordered>
                              {ticket.assignees.map((assignee) => (
                                <Avatar
                                  key={assignee}
                                  src={`https://i.pravatar.cc/150?u=a${assignee}`}
                                />
                              ))}
                            </AvatarGroup>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <Tabs aria-label="Ticket Details Tabs" className="mt-5">
                  <Tab key="comments" title="Comments">
                    <div className="mt-3">
                      {comments.length === 0 ? (
                        <Card className="mb-2">
                          <CardBody className="flex flex-row items-center gap-2 ">
                            <p className="text-sm">No comments</p>
                          </CardBody>
                        </Card>
                      ) : (
                        comments.map((comment: Comment) => (
                          <Card key={comment.id} className="max-w-full mt-3">
                            <CardHeader className="justify-between">
                              <div className="flex gap-5">
                                <Avatar
                                  isBordered
                                  radius="full"
                                  size="md"
                                  src={`https://nextui.org/avatars/avatar-${comment.commentor}.png`}
                                />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                  <h4 className="text-small font-semibold leading-none text-default-600">
                                    Zoey Lang
                                  </h4>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-default-400">
                              <p>{comment.description}</p>
                            </CardBody>
                            <CardFooter className="gap-3">
                              <div className="flex gap-1">
                                <Code className="text-sm">
                                  {new Date(
                                    comment.created_time * 1000
                                  ).toLocaleDateString()}
                                </Code>
                              </div>
                            </CardFooter>
                          </Card>
                        ))
                      )}
                    </div>
                  </Tab>
                  <Tab key="status-history" title="Activity feed">
                    <div className="mt-3">
                      {statusHistory.map((status) => (
                        <Card key={status.id} className="mb-2">
                          <CardBody className="flex flex-row items-center gap-2 ">
                            <SignalIcon className="h-5 w-5 text-blue-500" />
                            <p className="text-sm">
                              Status changed to
                              <strong className="font-extrabold text-blue-500">
                                {" "}
                                {taskStatusMap[status.status]}
                              </strong>
                            </p>
                            <Code className="text-sm ml-auto">
                              {new Date(
                                status.created_time * 1000
                              ).toLocaleDateString()}
                            </Code>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </Tab>
                </Tabs>
              </DrawerBody>

              <DrawerFooter></DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
