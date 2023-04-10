import React from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../organisms/sidebar";
import Topbar from "../organisms/topbar";
import {
  OnlineStoreSidebarLeft,
  OnlineStoreSidebarRight,
} from "../online-store/sidebar";
import { OnlineStoreHeader } from "../online-store/header";
import { EditCodeHeader } from "../online-store/edit-code/header";
import { EditCodeSidebarLeft } from "../online-store/edit-code/sidebar";
import { PollingProvider } from "../../constants/polling";

const OnlineStoreLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="inter-base-regular flex h-screen w-full flex-col text-grey-90">
      <Toaster
        containerStyle={{
          top: 74,
          left: 24,
          bottom: 24,
          right: 24,
        }}
      />
      <OnlineStoreHeader />
      <div className=" flex ">
        <OnlineStoreSidebarLeft />
        <PollingProvider>
          <div className="flex flex-1 flex-col">
            <div className="">
              <main className="">{children}</main>
            </div>
          </div>
        </PollingProvider>
        <OnlineStoreSidebarRight />
      </div>
    </div>
  );
};

export const OnlineStoreEditCodeLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="flex h-screen w-full flex-col">
      <Toaster
        containerStyle={{
          top: 74,
          left: 24,
          bottom: 24,
          right: 24,
        }}
      />
      <EditCodeHeader />
      <div className="flex h-full">{children}</div>
    </div>
  );
};

export default OnlineStoreLayout;
