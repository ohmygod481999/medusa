import React, { useEffect } from "react";
import PageDescription from "../../components/atoms/page-description";
import OnlineStoreIframe from "../../components/online-store/iframe";
import { useOnlineStore } from "../../constants/online-store";

const CustomTheme = () => {
  const { isLoading, setLoading } = useOnlineStore();

  return (
    <>
      <div className="flex h-full grow flex-col pb-xlarge items-center">
        <OnlineStoreIframe />
      </div>
    </>
  );
};

export default CustomTheme;
