import React, { useState } from "react"
import Button from "../../fundamentals/button"
import Modal from "../../molecules/modal"

type ImageModalProps = {
  handleClose: () => void
  handleUpload: (value: any)=> void
  onSubmit?: () => void
  loading?: boolean
  title: string
}

const UploadImageModal: React.FC<ImageModalProps> = ({
  handleClose,
  handleUpload,
  title,
  loading,
  onSubmit,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const images = Array.from(files).filter((file) => file.type.startsWith('image/'));
      setSelectedFiles(images);
    }
  }
  const handleUploadFile = ()=>{
    handleUpload(selectedFiles)
    setSelectedFiles([])
  }
  return (
    <Modal handleClose={handleClose}>
      <Modal.Body>
        <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold text-center">{title}</span>
        </Modal.Header>
        <Modal.Content>
          {selectedFiles.length > 0 ? (
            selectedFiles.map((file) => (
              <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} />
            ))
          ) : (
            <div className="inter-small-regular mb-4 flex items-center justify-center text-grey-50">
              <div className="max-w-2xl rounded-lg bg-gray-50 shadow-xl">
                <div className="m-4">
                  <label className="mb-2 inline-block text-gray-500">
                    File Upload
                  </label>
                  <div className="flex w-full items-center justify-center">
                    <label className="flex h-32 w-full flex-col border-4 border-dashed border-blue-200 hover:border-gray-300 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-gray-400 group-hover:text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          Attach a file
                        </p>
                      </div>
                      <input
                        type="file"
                        className="opacity-0"
                        accept="image/*"
                        
                        onChange={(e) => handleFileChange(e)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Content>
        <Modal.Footer>
          <div className="flex w-full items-center justify-center">
            <Button
              variant="ghost"
              size="small"
              onClick={()=>handleUploadFile()}
              className="mr-2 bg-emerald-600 hover:bg-emerald-500 rounded-md text-white"
            >
              Upload
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default UploadImageModal
