import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { StreamLanguage } from "@codemirror/language";
// import { javascript } from '@codemirror/legacy-modes/mode/javascript'

import { useEffect, useState } from "react";
import { CodeEditorHeader } from "./header";
import { useOnlineStore } from "../../../../constants/online-store";
import { useDebounce } from "../../../../hooks/use-debounce";
import { javascript } from "@codemirror/legacy-modes/mode/javascript";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/legacy-modes/mode/css";

export const getFileType = (fileName: string) => {
  if (fileName) {
    const arrFileName = fileName.split(".");
    return arrFileName[arrFileName.length - 1];
  }
  return fileName;
};
export const CodeEditor = () => {
  const {
    selectedFile,
    setFileValue,
    selectedFiles,
    setSelectedFiles,
    setEdited,
    edited,
  } = useOnlineStore();
  const [codeValue, setCodeValue] = useState<string>("");
  const deboundSave = useDebounce(codeValue, 1000);
  const fileType = {
    css: [StreamLanguage.define(css)],
    js: [StreamLanguage.define(javascript)],
    tsx: "tsx",
    liquid: [html({ autoCloseTags: true })],
    yaml: [StreamLanguage.define(yaml)],
  };

  useEffect(() => {
    if (selectedFile["filePath"]) {
      const codeValue = selectedFiles.filter(
        (item) => item.filePath == selectedFile["filePath"]
      );
      if (codeValue.length > 0) {
        setCodeValue(codeValue[0].fileContent);
      }
    } else {
      setCodeValue("");
    }
  }, [selectedFile, selectedFiles]);
  useEffect(() => {
    setFileValue(deboundSave);
    const newselectedFiles = selectedFiles.map((file) => {
      if (file.filePath == selectedFile["filePath"]) {
        return {
          filePath: file.filePath,
          fileName: file.fileName,
          fileContent: deboundSave,
        };
      }
      return file;
    });
    setSelectedFiles([...newselectedFiles]);
  }, [deboundSave]);
  return (
    <div className="h-full w-[calc(100%-20rem)] bg-slate-100 pt-2 pl-4 pr-2 pb-3">
      {selectedFile["fileName"] ? (
        <>
          <CodeEditorHeader />
          <CodeMirror
            height="100%"
            width="100%"
            maxWidth="100%"
            theme={dracula}
            value={codeValue}
            extensions={fileType[getFileType(selectedFile["filePath"])]}
            onChange={(value, viewUpdate) => {
              if (!edited) {
                setEdited(true);
              }
              setCodeValue(value);
            }}
          />
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p>Choose a file to start editing</p>
        </div>
      )}
    </div>
  );
};
