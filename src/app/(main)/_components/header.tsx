"use client";
import { ActionIcon } from "@/components/ui/action-icon";
import NotificationDropdown from "@/components/dropdowns/notification-dropdown";
import Image from "next/image";
import BellIcon from "../../../../public/assets/icons/bell.svg";
import SettingsIcon from "../../../../public/assets/icons/setting.svg";
import Men from "../../../../public/assets/images/men.jpeg";
import SettingsDropdown from "@/components/dropdowns/settings-dropdown";
import UsersDropdown from "@/components/dropdowns/user-dropdown";
import Hamburger from "./hamburger";
import Navigation from "./navigation";
import useWindowScroll from "react-use/lib/useWindowScroll";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { cn } from "@/lib/utils";

const Header = () => {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between  px-4 py-4 backdrop-blur-xl bg-white  md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10",
        ((isMounted && windowScroll.y) as number) > 2 ? "card-shadow" : ""
      )}
    >
      <div className="flex w-full max-w-2xl items-center">
        <Hamburger view={<Navigation />} />
      </div>
      <div className="flex items-stretch gap-4">
        <SettingsDropdown>
          <ActionIcon
            aria-label="Notification"
            variant="text"
            className="relative h-10 w-10  p-2 shadow flex items-center justify-center backdrop-blur-md   rounded-xl"
          >
            <Image src={SettingsIcon} alt="Settings" />
          </ActionIcon>
        </SettingsDropdown>
        <NotificationDropdown>
          <ActionIcon
            aria-label="Notification"
            variant="text"
            className="relative h-10 w-10  p-2 shadow flex items-center justify-center backdrop-blur-md   rounded-xl"
          >
            <Image src={BellIcon} alt="Notification Bell" />
          </ActionIcon>
        </NotificationDropdown>
        <UsersDropdown>
          <ActionIcon
            aria-label="Notification"
            variant="text"
            className="relative h-10 w-10 shadow flex items-center justify-center p-0 overflow-hidden backdrop-blur-md   rounded-xl"
          >
            <Image className="object-contain	" src={Men} alt="User" />
          </ActionIcon>
        </UsersDropdown>
      </div>
    </header>
  );
};

export default Header;
