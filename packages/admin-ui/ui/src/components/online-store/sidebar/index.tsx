import React, { IframeHTMLAttributes, useEffect, useState } from "react";
import { renderElement } from "./render-element";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";
import { useOnlineStore } from "../../../constants/online-store";
import { ECOM_BACKEND_URL } from "../../../constants/ecom-backend-url";
import AddSectionModal from "../../organisms/online-store-modal/add-section-modal";

export const OnlineStoreSidebarLeft = (props: {}) => {
  const { currentPage, setSectionId, setCurrentSections, currentSections } =
    useOnlineStore();
  const [sections, setSections] = useState<any>([]);
  const [sectionActive, setSectionactive] = useState<string>("");
  const [openAddModalSection, setOpenAddModalSections] = useState<boolean>(false)
  useEffect(() => {
    axios
      .get(`${ECOM_BACKEND_URL}/api-admin/pages/${currentPage.id}`)
      .then(({ data }) => {
        const sectionsData: [] = data.page["settings"].sections;
        setCurrentSections(sectionsData);
      });
  }, [currentPage.id]);
  const scrollToSection = (ecomId: string) => {
    setSectionactive(ecomId);
    setSectionId(ecomId);
    const iframe = document.querySelector("#iframe") as HTMLIFrameElement;
    const iframeDoc = iframe.contentDocument;
    const iframeWindow = iframe.contentWindow;

    if (iframeDoc && iframeWindow) {
      const targetElement = iframeDoc.querySelector(
        `[ecom-id="${ecomId}"]`
      ) as HTMLElement;
      iframeWindow.scrollTo({
        top: targetElement?.offsetTop - 20,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-80">
      <div className="w-full border bg-white px-2 py-3 text-lg font-bold">
        {currentPage.name}
      </div>
      <div>
        <p className="px-4 py-4 text-sm uppercase">sections</p>
        <ul className="overflow-y-scroll pl-1">
          <ReactSortable
            list={currentSections}
            setList={setCurrentSections}
            handle=".handle"
          >
            {currentSections.map((section) => (
              <li
                key={section.id}
                className={`flex cursor-pointer justify-between px-4 py-1 capitalize ${
                  sectionActive == section.id
                    ? "rounded-sm border-l-4 border-l-blue-600 bg-green-50"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
              >
                {section?.id}
                <svg
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="handle"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 19H8V16H11V19Z" fill="#1F2328" />
                  <path d="M11 13.5H8V10.5H11V13.5Z" fill="#1F2328" />
                  <path d="M11 8H8V5H11V8Z" fill="#1F2328" />
                  <path d="M16 19H13V16H16V19Z" fill="#1F2328" />
                  <path d="M16 13.5H13V10.5H16V13.5Z" fill="#1F2328" />
                  <path d="M16 8H13V5H16V8Z" fill="#1F2328" />
                </svg>
              </li>
            ))}
          </ReactSortable>
          <li
          className="flex cursor-pointer items-center gap-2 px-4 hover:text-cyan-60 text-cyan-70"
          onClick={() => setOpenAddModalSections(true)}
        >
          <svg
            className="bg-orange-80"
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
              fill="#3276c3"
            />
          </svg>
          Add Section
        </li>
        </ul>
      </div>
      {
        openAddModalSection?<AddSectionModal currentPageId={currentPage.id} keyValue="dfasf" handleClose={()=>setOpenAddModalSections(false)} handleElement={setCurrentSections} />:''
      }
    </div>
  );
};

export const OnlineStoreSidebarRight = (props: {}) => {
  const {
    setInputValue,
    currentPage,
    sectionId,
    setCurrentSections,
    inputValue,
    currentSections,
  } = useOnlineStore();

  const [elements, setElements] = useState({});
  useEffect(() => {
    if (sectionId) {
      const section: any = currentSections.filter(
        (section: any) => section.id == sectionId
      )[0];
      setElements(section.settings["elements"]);
    }
  }, [sectionId, currentSections]);
  useEffect(() => {
    setInputValue({ elements });
    setCurrentSections((prev:any) => {
      if (prev && prev.length >= 1) {
        const index = prev.findIndex((section: any) => section.id === sectionId);
        if (index !== -1) {
          console.log("2222", prev[index]);
          prev[index] = {
            id: sectionId,
            settings: { ...prev[index].settings, elements: elements },
          };
          console.log("33333", prev[index]);
        }
        return prev;
      }
      return prev;
    });
  }, [elements]);
  const handleElement = (e: any, key:any, keyValue:any, type:any) => {
    if (type == "blocks") {
      setElements((prev:any) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [keyValue]: [...e],
        },
      }));
    } else if (type == "image") {
      setElements((prev:any) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [keyValue]: e,
        },
      }));
    } else if (type == "datasource") {
      setElements((prev:any) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [keyValue]: { id: e },
        },
      }));
    } else {
      setElements((prev:any) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [keyValue]: e.target.value,
        },
      }));
    }
  };
  return (
    <div className="h-[calc(100vh-56px)] w-80">
      <div className="w-full border bg-white px-2 py-3 text-lg font-bold">
        {currentPage.name}
      </div>
      <div className="h-full">
        <p className="px-4 py-4 text-sm uppercase">Featured Collection</p>
        <ul className="h-[calc(100%-52px)] overflow-y-scroll pl-1">
          {Object.keys(elements).map((key, index) => {
            return (
              <li key={key} className="flex flex-col px-4 py-1 capitalize">
                {renderElement[elements[key].type]?.render(
                  elements,
                  key,
                  handleElement
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
