import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PlusCircleIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function LeftNav() {
  const [open, setOpen] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [showList, setShowList] = useState(width > 426);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleNavToggle = () => {
    setShowNav(!showNav);
    if (width < 427) {
      setShowList(!showList);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setShowNav(width > 768);
    setShowList(width > 426);
  }, [width]);

  return (
    <Card
      className={`static ${
        showList ? "h-full" : "h-fit"
      } rounded-none w-fit max-w-[20rem] shadow-xl bg-gray-300 shadow-blue-gray-900/5`}
    >
      <div className={`w-fit ${showList ? "mb-2 p-4" : "m-1 p-1"}`}>
        <Typography variant="h5" color="blue-gray">
          <button
            className="p-2 mr-1 bg-blue-500 rounded text-white"
            onClick={handleNavToggle}
          >
            <BuildingStorefrontIcon className="h-5 w-5" />
          </button>
          {showNav && <span>Financial management</span>}
        </Typography>
      </div>

      {showList && (
        <List className="min-w-0">
          <Link to={"/seller"}>
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>

              {showNav && <span>Product management</span>}
            </ListItem>
          </Link>
          <Link to={"/seller/all-item"}>
            <ListItem>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>

              {showNav && <span>All item</span>}
            </ListItem>
          </Link>

          <Link to={"/seller/add-new-item"}>
            <ListItem>
              <ListItemPrefix>
                <PlusCircleIcon className="h-5 w-5" />
              </ListItemPrefix>

              {showNav && <span>Add new item</span>}
            </ListItem>
          </Link>
          <Link to={"/seller/review"}>
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>

              {showNav && <span>Seller review</span>}
              <ListItemSuffix className={showNav ? "ml-auto" : "ml-0"}>
                {/* <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              /> */}
              </ListItemSuffix>
            </ListItem>
          </Link>

          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>

            {showNav && <span>Profile</span>}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            {showNav && <span>Settings</span>}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>

            {showNav && <span>Log Out</span>}
          </ListItem>
        </List>
      )}
    </Card>
  );
}
