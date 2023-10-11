import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import DarkModeSwitcher from "~/components/buttons/darkmode-switcher";

export default function HeaderNavbar() {
  const router = useRouter();
  return (
    <Navbar isBordered position="sticky" maxWidth="lg">
      <NavbarContent justify="center">
        <NavbarBrand className="mr-4">
          <p className="header-font hidden text-xl font-bold text-inherit sm:block">
            {" "}
            Refined{" "}
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-5 sm:flex">
          <NavbarItem>
            <Link
              className="header-font hover:text-primary"
              color="foreground"
              href="/"
            >
              首页 | Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="header-font hover:text-primary"
              color="foreground"
              href="/archive"
            >
              归档 | Archive
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="header-font hover:text-primary"
              color="foreground"
              href="/about"
            >
              关于 | About
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10 ml-5",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="搜索……"
          size="sm"
          startContent={<></>}
          type="search"
        />
        <DarkModeSwitcher />
        <AvatarDropdownMenu />
      </NavbarContent>
    </Navbar>
  );
}

// 头像菜单
const AvatarDropdownMenu = () => {
  const { data: sessionData } = useSession();
  const baseUser = sessionData?.user ?? undefined;
  const { data: detailUser } = api.user.getById.useQuery(
    baseUser?.id ?? "guest",
  );
  const isAdmin = detailUser?.role === "ADMIN" ?? false;
  const isLogged = baseUser?.name !== undefined;
  const router = useRouter();
  return isLogged ? (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <div className="py-2">
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name={baseUser?.name ?? "访客"}
            src={baseUser?.image ?? "not-set"}
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        className="bg-white"
        aria-label="Profile Actions"
        variant="flat"
      >
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{"已登录"}</p>
          <p className="font-semibold">{baseUser?.name ?? "访客"}</p>
        </DropdownItem>
        <DropdownItem
          key="write"
          color="primary"
          onClick={() => void router.push("/article/create")}
        >
          写作
        </DropdownItem>
        <DropdownItem key="settings">设置</DropdownItem>
        <DropdownItem key="analytics">统计数据</DropdownItem>
        {isAdmin ? <DropdownItem key="system">管理后台</DropdownItem> : <></>}
        <DropdownItem
          key="logout"
          color="danger"
          onClick={() => void signOut()}
        >
          退出
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <div className="py-2">
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name={"G"}
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        className="bg-white"
        aria-label="Profile Actions"
        variant="flat"
      >
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{"未登录"}</p>
          <p className="font-semibold">{"访客"}</p>
        </DropdownItem>
        <DropdownItem
          key="login"
          color="secondary"
          onClick={() => void signIn()}
        >
          登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
