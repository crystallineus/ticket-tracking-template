import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  ScrollShadow,
} from "@nextui-org/react";
import { Fragment, useState } from "react";
import TicketDrawer from "./TicketDrawer";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { StopCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Ticket } from "../interfaces";

interface TicketColumnProps {
  group: string;
  tasks: Ticket[];
  scroll?: boolean;
}

export default function TicketColumn({
  group,
  tasks,
  scroll,
}: TicketColumnProps) {
  const [openTicketID, setOpenTicketID] = useState<number | undefined>();

  const handleOpenDrawer = (ticket: Ticket) => {
    setOpenTicketID(ticket.id);
  };

  const handleCloseDrawer = () => {
    setOpenTicketID(undefined);
  };

  const content = tasks
    .filter((task) => task.post_status !== 2)
    .sort((a, b) => a.priority - b.priority)
    .map((task) => {
      return (
        <Fragment key={task.id}>
          <Card
            className="rounded-lg w-full mt-3"
            isPressable
            onPress={() => {
              handleOpenDrawer(task);
            }}
          >
            <CardHeader className="justify-between">
              <div className="flex flex-wrap items-center gap-5">
                <h5 className="text-small tracking-tight text-default-400">
                  # {task.id}
                </h5>
                <h4 className="text-small text-left font-semibold leading-none text-default-600">
                  {task.title}
                </h4>
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
            <CardBody className="flex flex-row gap-2 px-3 py-0 text-small text-default-400">
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
          <TicketDrawer
            isMobile={true}
            ticket={task}
            isOpen={openTicketID === task.id}
            onClose={handleCloseDrawer}
          />
        </Fragment>
      );
    });

  return (
    <div key={group} className="flex-1 flex flex-col rounded-lg shadow-lg mx-2">
      <div className="flex items-center justify-between">
        <Chip
          className="text-lg font-bold mb-4"
          color={
            group === "Todo"
              ? "success"
              : group === "In Progress"
              ? "warning"
              : "secondary"
          }
          variant="dot"
        >
          <p className="text-sm">
            {group}: {tasks.length}
          </p>
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
        {scroll ? (
          <ScrollShadow className="w-full h-[60vh]" orientation="horizontal">
            {content}
          </ScrollShadow>
        ) : (
          content
        )}
      </div>

      <div className="mt-auto pt-4">
        <Button className="w-full" variant="light">
          <PlusIcon className="h-4 w-4" /> Add Task
        </Button>
      </div>
    </div>
  );
}
