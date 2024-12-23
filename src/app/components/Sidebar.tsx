import {
  UserIcon,
  DocumentMagnifyingGlassIcon,
  FlagIcon,
  ClockIcon,
  ChartBarIcon,
  CakeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { Button, Link } from "@nextui-org/react";

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
  { label: "Research", href: "#", icon: <ChartBarIcon className="h-6 w-6" /> },
  { label: "Campaign", href: "#", icon: <CakeIcon className="h-6 w-6" /> },
  { label: "Website", href: "#", icon: <GlobeAltIcon className="h-6 w-6" /> },
];

export const DonezoLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-56 text-white flex flex-col shadow-lg border-r border-gray-800">
      <div className="flex items-center justify-center h-16">
        {/* <h1 className="text-lg font-bold"></h1> */}
        <DonezoLogo />
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
      </nav>
    </aside>
  );
}
