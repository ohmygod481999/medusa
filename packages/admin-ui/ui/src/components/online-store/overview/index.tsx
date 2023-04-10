import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ECOM_BACKEND_URL } from "../../../constants/ecom-backend-url";
import useNotification from "../../../hooks/use-notification";

const OnlineStoreOverview = () => {
  const [currentTemplate, setCurrentTemplate] = useState<any>(null);
  const [templates, setTemplates] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(true);
  const notification = useNotification();
  useEffect(() => {
    axios
      .get(`${ECOM_BACKEND_URL}/api-admin/themes/my-templates`)
      .then(({ data }) => {
        setCurrentTemplate(data.current_template);
        setTemplates(data.templates);
      });
  }, [refresh]);
  const changeCurrentTheme = (id: string) => {
    axios
      .post(`${ECOM_BACKEND_URL}/api-admin/themes/use-template`, {
        template_id: id,
      })
      .then(() => {
        setRefresh(!refresh);
        notification("Success", "Publish successful", "success");
      })
      .catch(() => {
        notification("Failed", "Failed to Publish", "error");
      });
  };
  return (
    <div className="w-full h-full">
      {currentTemplate ? (
        <div className="mb-4 flex w-full items-center rounded bg-white p-3 border">
          <img
            className="mr-3 h-20 w-20 rounded"
            src={currentTemplate?.thumbnail}
            alt="image"
          />
          <div className="mr-auto">
            <div className="flex gap-3 font-bold capitalize">
              {currentTemplate?.name}{" "}
              <div className=" rounded-full bg-emerald-20 px-3 font-thin min-w-max">
                Current theme
              </div>
            </div>
            <p>Last saved: {currentTemplate?.updated_at}</p>
            <p>Version : 1.0</p>
          </div>
          <div className="flex gap-3">
            <div className="cursor-pointer rounded border border-gray-300 p-3 hover:bg-gray-200">
              <svg
                fill="#000000"
                width="16px"
                height="16px"
                viewBox="0 0 32 32"
                enable-background="new 0 0 32 32"
                id="Glyph"
                version="1.1"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z"
                  id="XMLID_287_"
                />
                <path
                  d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z"
                  id="XMLID_289_"
                />
                <path
                  d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z"
                  id="XMLID_291_"
                />
              </svg>
            </div>
            <NavLink
              className={
                "cursor-pointer rounded bg-emerald-700 px-4 py-2 text-white transition-all hover:bg-emerald-600"
              }
              to={"/online-store/custom-theme"}
            >
              Customize
            </NavLink>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full rounded bg-white ">
        <div className="p-3">
          <h3 className="font-bold">Theme Library</h3>
          <p className="font-extralight">
            These themes are only visible to you
          </p>
        </div>
        {templates.map((template) => (
          <div
            className="flex w-full items-center rounded border border-gray-200 bg-white p-3"
            key={template.code_path}
          >
            <img
              className="mr-3 h-20 w-20 rounded"
              src={template?.thumbnail}
              alt="image"
            />
            <div className="mr-auto">
              <div className="flex gap-3 font-bold capitalize">
                {template?.name}
                {template.name == currentTemplate.name ? (
                  <div className=" rounded-full bg-emerald-20 px-3 font-thin min-w-max">
                    Current theme
                  </div>
                ) : (
                  ""
                )}
              </div>
              <p>Last saved: {template?.updated_at}</p>
              <p>Version : 1.0</p>
            </div>
            <div className="flex gap-3">
              {template.name == currentTemplate.name ? (
                <div className="group relative cursor-pointer rounded border border-gray-300 p-3 transition-all hover:bg-gray-200">
                  <svg
                    fill="#000000"
                    width="16px"
                    height="16px"
                    viewBox="0 0 32 32"
                    enable-background="new 0 0 32 32"
                    id="Glyph"
                    version="1.1"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z"
                      id="XMLID_287_"
                    />
                    <path
                      d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z"
                      id="XMLID_289_"
                    />
                    <path
                      d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z"
                      id="XMLID_291_"
                    />
                  </svg>
                  <div className="absolute z-50 top-[30px] right-0 w-full bg-transparent h-5"></div>
                  <div className="absolute z-50 top-[50px] right-0 hidden group-hover:block shadow">
                    <ul className="flex flex-col overflow-hidden rounded pt-1 text-gray-700 ">
                      <li className="cursor-pointer min-w-max border bg-white px-4 py-2 hover:bg-grey-5 ">
                        Rename
                      </li>
                      <li className="cursor-pointer  min-w-max border  bg-white px-4 py-2 hover:bg-grey-5 ">
                        Edit code
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div
                className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-black transition-all hover:bg-gray-200"
                onClick={() => changeCurrentTheme(template.id)}
              >
                Publish
              </div>
              {template.name == currentTemplate.name ? (
                <NavLink
                  className={
                    "cursor-pointer rounded border border-gray-300 px-4 py-2 text-black transition-all hover:bg-gray-200"
                  }
                  to={"/online-store/custom-theme"}
                >
                  Customize
                </NavLink>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OnlineStoreOverview;
