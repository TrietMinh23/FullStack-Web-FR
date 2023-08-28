import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Notification from "./Notification";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Example() {
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div className="absolute right-[-4px] bg-red-500 px-[8px] py-[1px] text-white rounded-full text-[10px] font-bold">
          99+
        </div>
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md hover:bg-slate-200 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <NotificationsIcon />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-96 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => <div className="py-3 pl-4">Notification</div>}
            </Menu.Item>
            <div className="box-notification h-[27.5rem] overflow-y-scroll">
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
