import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import useNotification from "../../../../hooks/use-notification";
import { useOnlineStore } from "../../../../constants/online-store";
import { ECOM_BACKEND_URL } from "../../../../constants/ecom-backend-url";

export const EditCodeHeader = () => {
  const { fileValue, selectedFile, selectedFiles, edited, setEdited } =
    useOnlineStore();

  const notification = useNotification();
  // const notification = useNotification()
  const save = () => {
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        axios.put(
          `${ECOM_BACKEND_URL}/api-admin/code-editor/file/${encodeURIComponent(
            selectedFiles[i].filePath
          )}`,
          {
            fileContent: selectedFiles[i].fileContent,
          }
        );
      }
      notification("Success", "Save successful", "success");
      setEdited(false);
    } catch (error) {
      notification("Failed", "Failed to save", "error");
    }
  };

  return (
    <div className="flex w-full items-center justify-between border p-2 min-w-[3.25rem]">
      <div className="flex items-center gap-4">
        <NavLink to={"/online-store"}>Back</NavLink>
        <p>Dawn</p>
        <div className="dropdown group relative mx-4 inline-block">
          <button className="inline-flex h-5 w-5 items-center">...</button>
          <div className="absolute z-50 hidden group-hover:block ">
            <ul className="flex flex-col  overflow-hidden rounded pt-1 text-gray-700 ">
              <li className="w-max cursor-pointer border bg-white px-4 py-2 hover:bg-grey-5">
                <NavLink to={"/online-store/edit-code"}>Edit code</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="btn btn-secondary btn-small"
          disabled={edited ? false : true}
          onClick={() => save()}
        >
          <span className="mr-xsmall last:mr-0">SAVE</span>
        </button>
      </div>
    </div>
  );
};
