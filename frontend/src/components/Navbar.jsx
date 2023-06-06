import React from "react";
import { Link } from "react-router-dom";
import { Navbar, MobileNav, Typography, Button, MenuItem, Avatar, IconButton } from "@material-tailwind/react";
import { BookOpenIcon, UserIcon, BanknotesIcon, BuildingStorefrontIcon, BriefcaseIcon, Bars2Icon } from "@heroicons/react/24/outline";

function ProfileMenu() {
  return (
    <Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 px-2 lg:ml-auto">
      <Avatar
        variant="circular"
        size="sm"
        alt="candice wu"
        className="border border-blue-500 p-0.5"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      />
    </Button>
  );
}

// nav list component
const navListItems = [
  {
    label: "Book",
    icon: BookOpenIcon,
    link: "/book",
  },
  {
    label: "Customer",
    icon: UserIcon,
    link: "/customer",
  },
  {
    label: "Purchase",
    icon: BanknotesIcon,
    link: "/purchase",
  },
  {
    label: "Staff",
    icon: BriefcaseIcon,
    link: "/staff",
  },
  {
    label: "Store",
    icon: BuildingStorefrontIcon,
    link: "/store",
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, link }, key) => (
        <Link to={link}>
          <Typography key={label} variant="small" color="blue-gray" className="font-normal">
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })} {label}
            </MenuItem>
          </Typography>
        </Link>
      ))}
    </ul>
  );
}

export function CustomNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setIsNavOpen(false));
  }, []);

  return (
    <Navbar className=" sticky inset-5 z-10 h-max mx-auto max-w-[1280px] p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Link to="/">
          <Typography color="blue-gray" className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
            AfixVega
          </Typography>
        </Link>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton size="sm" color="blue-gray" variant="text" onClick={toggleIsNavOpen} className="ml-auto mr-2 lg:hidden">
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}
