import React, { IframeHTMLAttributes, useEffect, useState } from "react";

import { renderElement } from "./render-element";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";
import { useOnlineStore } from "../../../constants/online-store";

export const OnlineStoreSidebarLeft = (props: {}) => {
  const { currentPage, setSectionId, setCurrentSections, currentSections } =
    useOnlineStore();
  const [sections, setSections] = useState<any>([]);
  const [sectionActive, setSectionactive] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://longvb.net/api-admin/pages/${currentPage.id}`)
      .then(({ data }) => {
        const sectionsData: [] = data.page["settings"].sections;
        setCurrentSections(sectionsData);
      });
  }, [currentPage.id]);

  const scrollToSection = (ecomId) => {
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
        </ul>
      </div>
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
    console.log(1111, elements);
    setInputValue({ elements });
    setCurrentSections((prev) => {
      if (prev && prev.length >= 1) {
        const index = prev.findIndex((section) => section.id === sectionId);
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
  const handleElement = (e: any, key, keyValue, type) => {
    if (type == "blocks") {
      setElements((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [keyValue]: [...e],
        },
      }));
    } else if (type == "image") {
      setElements((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [keyValue]: e,
        },
      }));
    } else if (type == "datasource") {
      setElements((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [keyValue]: { id: e },
        },
      }));
    } else {
      setElements((prev) => ({
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
