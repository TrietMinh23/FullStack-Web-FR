import React from "react";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <React.Fragment>
      <div className="DUMP"></div>
      <header className="header sticky top-0 z-20 shadow-model-9 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            {/* <!-- Nut mo, dong --> */}
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            >
              <span className="relative block bg-red-400 h-5 w-5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full bg-white">
                  <span
                    className={`relative top-0 left-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white !w-full`}
                  ></span>
                  <span
                    className={`relative top-0 left-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white !w-full`}
                  ></span>
                  <span
                    className={`relative top-0 left-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white !w-full`}
                  ></span>
                </span>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}
          </div>
          <div className={"sm:block"}>
            <img
              className="h-16 w-16"
              src={process.env.PUBLIC_URL + "/logo-banner.png"}
              alt="Logo"
            />
          </div>

          <div className="flex items-center gap-3 2xsm:gap-7">
            {/* <!-- User Area --> */}
            {/* <DropdownUser /> */}
            {/* <!-- User Area --> */}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
