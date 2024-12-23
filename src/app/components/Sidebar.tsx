import {
  UserIcon,
  DocumentMagnifyingGlassIcon,
  FlagIcon,
  ClockIcon,
  ChartBarIcon,
  CakeIcon,
  GlobeAltIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { Button, Divider, Link } from "@nextui-org/react";
import { Logo } from "./Logo";

const SidebarMenu = [
  {
    label: "All tickets",
    href: "#",
    icon: <DocumentMagnifyingGlassIcon className="h-6 w-6" />,
  },
  {
    label: "Assigned to me",
    href: "#",
    icon: <UserIcon className="h-6 w-6" />,
  },
  {
    label: "Reported by me",
    href: "#",
    icon: <FlagIcon className="h-6 w-6" />,
  },
  { label: "Due today", href: "#", icon: <ClockIcon className="h-6 w-6" /> },
];

const TagMenu = [
  { label: "Research", href: "#", icon: <ChartBarIcon className="h-6 w-6" /> },
  { label: "Campaign", href: "#", icon: <CakeIcon className="h-6 w-6" /> },
  { label: "Website", href: "#", icon: <GlobeAltIcon className="h-6 w-6" /> },
];

type SidebarProps = {
  isMobile?: boolean;
};

export default function Sidebar({ isMobile }: SidebarProps) {
  return (
    <aside
      className={
        "inset-y-0 left-0 w-56 text-white flex flex-col shadow-lg" +
          !isMobile && " border-r border-gray-800"
      }
    >
      <div className="flex items-center justify-center h-16">
        <Logo />
        <p className="hidden sm:block font-bold text-inherit">Donezo</p>
      </div>
      <nav className="flex-1 p-4">
        {SidebarMenu.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        <Divider className="my-3" />
        {TagMenu.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="flex p-4">
        <Button
          isIconOnly
          aria-label="more than 99 notifications"
          radius="full"
          variant="light"
        >
          <Cog8ToothIcon className="h-6 w-6" />
        </Button>
      </div>
    </aside>
  );
}
