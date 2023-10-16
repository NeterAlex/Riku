import React, { useState } from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import DarkModeSwitcher from "~/components/buttons/darkmode-switcher";
import SearchButton from "~/components/buttons/search-button";
import SearchModal from "~/components/modal/search-modal";

export default function HeaderNavbar() {
  const [isMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Navbar isBordered position="sticky" maxWidth="lg">
      <NavbarContent justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
          className="sm:hidden"
        />
        <NavbarBrand className="mr-4">
          <p className="header-font hidden text-xl font-bold text-inherit sm:block">
            Refined
          </p>
        </NavbarBrand>
        <NavbarContent className="flex gap-5">
          <NavbarItem>
            <Link
              className="header-font hidden hover:text-secondary dark:hover:text-primary sm:block"
              color="foreground"
              href="/"
            >
              首页
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="header-font hidden hover:text-secondary dark:hover:text-primary sm:block"
              color="foreground"
              href="/article"
            >
              文章
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="header-font hidden hover:text-secondary dark:hover:text-primary sm:block"
              color="foreground"
              href="/archive"
            >
              归档
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="header-font hidden hover:text-secondary dark:hover:text-primary sm:block"
              color="foreground"
              href="/about"
            >
              关于
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <SearchButton onClick={onOpen} />
        <DarkModeSwitcher />
        <AvatarDropdownMenu />
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem key={`home`}>
          <Link
            color="foreground"
            className="header-font w-full py-2"
            href="/"
            size="lg"
          >
            首页 | Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key={`article`}>
          <Link
            color="foreground"
            className="header-font w-full py-2"
            href="/article"
            size="lg"
          >
            文章 | Article
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key={`archive`}>
          <Link
            color="foreground"
            className="header-font w-full py-2"
            href="/archive"
            size="lg"
          >
            归档 | Archive
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem key={`about`}>
          <Link
            color="foreground"
            className="header-font w-full py-2"
            href="/about"
            size="lg"
          >
            关于 | About
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
      <SearchModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </Navbar>
  );
}

// 头像菜单
const AvatarDropdownMenu = () => {
  const { data: sessionData } = useSession();
  const baseUser = sessionData?.user ?? undefined;
  const isAdmin = baseUser?.role === "ADMIN" ?? false;
  const isLogged = baseUser?.name !== undefined;
  const router = useRouter();
  return isLogged ? (
    <Dropdown placement="bottom-end" className="bg-[#efefef] dark:bg-[#202022]">
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
        className="bg-[#efefef] dark:bg-[#202022]"
        aria-label="Profile Actions"
        variant="flat"
      >
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{"已登录"}</p>
          <p className="font-semibold">{baseUser?.name ?? "访客"}</p>
        </DropdownItem>
        <DropdownItem
          key="write"
          color="secondary"
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
        className="bg-[#efefef] dark:bg-[#202022]"
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
