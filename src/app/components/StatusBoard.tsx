import React from "react";
import {
  Card,
  Button,
  Avatar,
  Chip,
  AvatarGroup,
  CardHeader,
  CardBody,
  CardFooter,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@nextui-org/react";
import {
  CheckCircleIcon,
  PencilSquareIcon,
  PlusIcon,
  StopCircleIcon,
} from "@heroicons/react/24/outline";
import tickets from "../db/tickets.json";

const statuses = ["Todo", "In Progress", "Done"];

export default function StatusBoard() {
  const groupedTasks = statuses.map((status, index) => ({
    status,
    tasks: tickets.filter((ticket) => ticket.task_status === index),
  }));

  return (
    <div className="flex gap-4 h-full">
      {groupedTasks.map((group, index) => (
        <div
          key={index}
          className="flex-1 flex flex-col rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <Chip
              className="text-lg font-bold mb-4"
              color={
                group.status === "Todo"
                  ? "success"
                  : group.status === "In Progress"
                  ? "warning"
                  : "secondary"
              }
              variant="dot"
            >
              <p className="text-sm">{group.status} - 2</p>
            </Chip>

            <Button
              isIconOnly
              aria-label="more than 99 notifications"
              radius="full"
              variant="light"
            >
              <PlusIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 space-y-4">
            {group.tasks
              .filter((task) => task.post_status !== 2)
              .map((task) => {
                const cardBGColor =
                  task.post_status === 1
                    ? "border-warning"
                    : task.post_status === 3
                    ? "border-secondary"
                    : "";

                return (
                  <Card key={task.id} className="rounded-lg">
                    <CardHeader className="justify-between">
                      <div className="flex gap-5">
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h5 className="text-small tracking-tight text-default-400">
                            # {task.id}
                          </h5>
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {task.title}
                          </h4>
                        </div>
                      </div>

                      <AvatarGroup isBordered>
                        {task.assignees.map((assignee) => (
                          <Avatar
                            key={assignee}
                            src={`https://i.pravatar.cc/150?u=a${assignee}`}
                          />
                        ))}
                      </AvatarGroup>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-400">
                      {task.tags.map((tag) => (
                        <Chip
                          key={tag}
                          color={
                            tag === "research"
                              ? "success"
                              : tag === "campaign"
                              ? "danger"
                              : tag === "website"
                              ? "primary"
                              : "default"
                          }
                          variant="flat"
                        >
                          {tag}
                        </Chip>
                      ))}
                    </CardBody>
                    <CardFooter className="gap-3 items-center justify-between">
                      <Chip color="default" variant="bordered">
                        <p className="text-sm">P{task.priority}</p>
                      </Chip>

                      {task.post_status === 0 && (
                        <PencilSquareIcon className="h-6 w-6 text-default-400" />
                      )}
                      {task.post_status === 1 && (
                        <StopCircleIcon className="h-6 w-6 text-warning" />
                      )}
                      {task.post_status === 3 && (
                        <CheckCircleIcon className="h-6 w-6 text-secondary" />
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
          </div>

          <div className="mt-auto pt-4">
            <Button className="w-full" variant="light">
              <PlusIcon className="h-4 w-4" /> Add Task
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
