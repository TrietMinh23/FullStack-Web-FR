import React from "react";


import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function LeftNav({ sideBarProp }) {
  return (
    // <Card
    //   className={`-translate-x-full ${
    //     sideBarProp ? "-translate-x-0" : "-translate-x-full"
    //   } top-0 left-0 transition-transform xl:translate-x-0 z-40 sticky h-screen rounded-none w-64 shadow-xl bg-gray-300 shadow-blue-gray-900/5`}
    // >
    //   <List className="min-w-0">
    //     <Link to={"/seller"}>
    //       <ListItem>
    //         <ListItemPrefix>
    //           <PresentationChartBarIcon className="h-5 w-5" />
    //         </ListItemPrefix>

    //         <span>Product management</span>
    //       </ListItem>
    //     </Link>
    //     <Link to={"/seller/all-item"}>
    //       <ListItem>
    //         <ListItemPrefix>
    //           <ShoppingBagIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <span>All item</span>
    //       </ListItem>
    //     </Link>

    //     <Link to={"/seller/add-new-item"}>
    //       <ListItem>
    //         <ListItemPrefix>
    //           <PlusCircleIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <span>Add new item</span>
    //       </ListItem>
    //     </Link>
    //     <Link to={"/seller/review"}>
    //       <ListItem>
    //         <ListItemPrefix>
    //           <InboxIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <span>Seller review</span>
    //       </ListItem>
    //     </Link>

    //     <ListItem>
    //       <ListItemPrefix>
    //         <UserCircleIcon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       <span>Profile</span>
    //     </ListItem>
    //     <ListItem>
    //       <ListItemPrefix>
    //         <Cog6ToothIcon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       <span>Settings</span>
    //     </ListItem>
    //     <ListItem>
    //       <ListItemPrefix>
    //         <PowerIcon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       <span>Log Out</span>
    //     </ListItem>
    //   </List>
    // </Card>
    <div>hi</div>
  );
}
