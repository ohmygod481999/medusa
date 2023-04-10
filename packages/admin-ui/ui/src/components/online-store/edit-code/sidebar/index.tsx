import axios from "axios";
import { useEffect, useState } from "react";
import { useOnlineStore } from "../../../../constants/online-store";
import { fileIcon } from "./icon";
import { getFileType } from "../code-editor";
import { useDebounce } from "../../../../hooks/use-debounce";
import async from "react-select/dist/declarations/src/async/index";

export const EditCodeSidebarLeft = (props: {}) => {
  const { setSelectedFiles, setSelectedFile, selectedFile, selectedFiles } =
    useOnlineStore();
  const [fileTree, setFileTree] = useState<any>({});
  const [searchFile, setSearchFile] = useState<any>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [activeLists, setActiveList] = useState<any[]>([]);

  const deboundSearch = useDebounce(searchValue, 1000);
  useEffect(() => {
    axios
      .get(`http://longvb.net/api-admin/code-editor/file-tree`)
      .then(({ data }) => {
        setFileTree(data.fileTree);
      });
  }, []);
  useEffect(() => {
    setSearchFile(findKeyByPath(fileTree, deboundSearch));
  }, [deboundSearch]);
  const getFileContent = (fileName: string, filePath: string) => {
    axios
      .get(
        `http://longvb.net/api-admin/code-editor/file/${encodeURIComponent(
          filePath
        )}`
      )
      .then(({ data }) => {
        setSelectedFiles((prev) => [
          ...prev,
          {
            filePath: filePath,
            fileName: fileName,
            fileContent: data.fileContent,
          },
        ]);
      });
  };
  const renderObject = (obj) => {
    return Object.keys(obj).map((key) => {
      if (typeof obj[key] === "object") {
        return (
          <li key={key} className=" list-item list-none">
            <span
              className="flex cursor-pointer select-none items-center"
              onClick={() => {
                if (activeLists.includes(key)) {
                  const temp = [...activeLists];
                  temp.splice(activeLists.indexOf(key), 1);
                  setActiveList(temp);
                } else {
                  setActiveList((prev) => [...prev, key]);
                }
              }}
            >
              <svg
                width="16px"
                height="16px"
                className={`mr-1 transition-all ${
                  activeLists.indexOf(key) >= 0 ? "rotate-90" : ""
                }`}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0" fill="none" width="24" height="24" />

                <g>
                  <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586" />
                </g>
              </svg>
              {key}
            </span>
            <ul
              className={`${
                activeLists.indexOf(key) >= 0 ? "block" : "hidden"
              } border-l border-gray-300 transition-all`}
              style={{ paddingInlineStart: "20px" }}
            >
              {renderObject(obj[key])}
            </ul>
          </li>
        );
      }
      return (
        <li
          key={key}
          className={`flex cursor-pointer items-center gap-1 ${
            selectedFile["filePath"] == obj[key] ? "bg-slate-300" : ""
          }`}
          onClick={() => {
            let index = 0;
            if (selectedFiles.length > 0) {
              for (let i = 0; i < selectedFiles.length; i++) {
                if (selectedFiles[i].filePath == obj[key]) {
                  index = 1;
                  break;
                }
              }
            }
            if (!index) {
              getFileContent(key, obj[key]);
            }
            setSelectedFile({
              filePath: obj[key],
              fileName: key,
            });
          }}
        >
          {fileIcon[getFileType(key)]
            ? fileIcon[getFileType(key)]
            : fileIcon["unknown"]}

          {key}
        </li>
      );
    });
  };

  const findKeyByPath = (json, path) => {
    if (path) {
      const pathArr = path.split("/");
      let current = json;
      for (let i = 1; i < pathArr.length; i++) {
        const key = pathArr[i];
        if (current.hasOwnProperty(key)) {
          if (i == pathArr.length - 1) {
            current = {
              [key]: current[key],
            };
          } else {
            current = current[key];
          }
        } else {
          return null;
        }
      }
      return current;
    } else {
      return null;
    }
  };

  return (
    <div className="h-[calc(100%-3.25rem)] w-80 py-3">
      <div className="h-full overflow-y-scroll">
        <input
          className=" mx-2 w-[calc(100%-1rem)] rounded border border-gray-200 px-2 py-2 text-sm outline-none"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          type={"text"}
          placeholder="Search file"
        />
        <div className=" h-full pl-1">
          {renderObject(searchFile ? searchFile : fileTree)}
        </div>
      </div>
    </div>
  );
};
