import React from "react";
import { Link } from "react-router-dom";
import { Navbar, MobileNav, Typography, MenuItem, Avatar, IconButton } from "@material-tailwind/react";
import { BookOpenIcon, UserIcon, BanknotesIcon, BuildingStorefrontIcon, BriefcaseIcon, Bars2Icon } from "@heroicons/react/24/outline";
import profile from "../img/afix.jpg";
import { Collapse, ListItem, Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { ChevronDownIcon, FolderIcon, RocketLaunchIcon, PencilIcon} from "@heroicons/react/24/outline";

const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};

const navListMenuItems = [
  {
    color: "teal",
    icon: BookOpenIcon,
    title: "Book",
    description: "Set of beautiful icons that you can use.",
    path: '/book'
  },
  {
    color: "blue",
    icon: PencilIcon,
    title: "Author",
    description: "All the stuff that we dan from legal made us add.",
    path: '/book/author'
  },
  {
    color: "purple",
    icon: RocketLaunchIcon,
    title: "Publisher",
    description: "Checkout our products that helps a startup.",
    path: '/book/publisher'
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ icon, title, description, color, path }, key) => (
    <Link to={path} key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <div className={`rounded-lg p-5 ${colors[color]}`}>
          {React.createElement(icon, {
            strokeWidth: 2,
            className: "h-6 w-6",
          })}
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="flex items-center text-sm">
            {title}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {description}
          </Typography>
        </div>
      </MenuItem>
    </Link>
  ));

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} offset={{ mainAxis: 20 }} placement="bottom" allowHover={true}>
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem className="flex items-center gap-2 py-2 pr-4" selected={isMenuOpen || isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((cur) => !cur)}>
              <BookOpenIcon className="h-[18px] w-[18px]" />
              Books
              <ChevronDownIcon strokeWidth={2.5} className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""}`} />
              <ChevronDownIcon strokeWidth={2.5} className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""}`} />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-[820px] rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function ProfileMenu() {
  return (
    <div className="flex items-center gap-1 rounded-full py-0.5 pr-4 lg:ml-auto">
      <Avatar variant="circular" size="sm" alt="candice wu" className="border border-blue-500 p-0.5" src={profile} />
    </div>
  );
}

// nav list component
const navListItems = [
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
      <NavListMenu />
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
            GRB
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
