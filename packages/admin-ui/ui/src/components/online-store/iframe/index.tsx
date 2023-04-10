import React, { useEffect, useRef } from "react";
import { ECOM_BACKEND_URL } from "../../../constants/ecom-backend-url";
import { useOnlineStore } from "../../../constants/online-store";

const OnlineStoreIframe = () => {
  const ref = useRef<HTMLIFrameElement>(null);
  const { setIframeDocument, setIframeWindow, setIframe, typeView } =
    useOnlineStore();

  const handleLoad = () => {
    const iframe = ref.current;

    const sectionId = "free-offer";

    if (iframe) {
      iframe.onload = () => {
        console.log("iframe loaded");
        const doc = iframe?.contentDocument?.documentElement;
        const iframeWindow = iframe?.contentWindow;
        console.log(iframeWindow?.location.pathname);
        setIframeDocument(doc || null);
        setIframeWindow(iframeWindow || null);
        setIframe(iframe || null);
      };
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div
      style={{
        height: "calc(100vh - 56px)",
        width: `${typeView == "desktop" ? "100%" : "400px"}`,
      }}
    >
      <iframe
        id="iframe"
        ref={ref}
        style={{
          height: "100%",
        }}
        src={ECOM_BACKEND_URL}
        title="YouTube video player"
        frameBorder="0"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
};

export default OnlineStoreIframe;
