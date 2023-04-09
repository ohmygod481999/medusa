import { useOnlineStore } from "../../../../../constants/online-store";

export const CodeEditorHeader = () => {
  const { selectedFiles, setSelectedFiles, selectedFile, setSelectedFile } =
    useOnlineStore();
  const deleteTabFile = (file: any) => {
    const index = selectedFiles.indexOf(file);
    if (index >= 0) {
      if (index > 0) {
        if (file.filePath == selectedFile["filePath"]) {
          setSelectedFile({
            ...selectedFiles[index - 1],
          });
        }
      } else if (index == 0 && selectedFiles.length > 1) {
        if (file.filePath == selectedFile["filePath"]) {
          setSelectedFile({
            ...selectedFiles[index + 1],
          });
        }
      } else {
        setSelectedFile({});
      }
      setSelectedFiles((prev) => {
        const index = prev.indexOf(file);
        if (index >= 0) {
          prev.splice(index, 1);
        }
        return [...prev];
      });
    }
  };
  return (
    <div className="flex min-h-[36px] w-full rounded border border-gray-200 bg-white overflow-x-scroll">
      {selectedFiles.map((file) => (
        <div
          key={file["fileName"]}
          className={`flex cursor-pointer items-center min-w-max justify-center gap-5 border-b-2 px-2 py-1 ${
            file["filePath"] == selectedFile["filePath"]
              ? "border-blue-80"
              : "border-transparent"
          } `}
        >
          <p onClick={() => setSelectedFile(file)}>{file["fileName"]}</p>{" "}
          <span
            className="cursor-pointer rounded text-xs font-extrabold hover:bg-slate-100"
            onClick={() => deleteTabFile(file)}
          >
            <svg
              fill="#000000"
              width="16px"
              height="16px"
              viewBox="-8.5 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>close</title>
              <path d="M8.48 16l5.84-5.84c0.32-0.32 0.32-0.84 0-1.2-0.32-0.32-0.84-0.32-1.2 0l-5.84 5.84-5.84-5.84c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.84 5.84-5.84 5.84c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l5.84-5.84 5.84 5.84c0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24 0.32-0.32 0.32-0.84 0-1.2l-5.84-5.84z"></path>
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
};
