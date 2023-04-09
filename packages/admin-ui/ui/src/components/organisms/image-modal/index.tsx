import React, { useEffect, useState } from "react";
import Button from "../../fundamentals/button";
import Modal from "../../molecules/modal";
import axios from "axios";
import { GalleryList } from "../../templates/gallery-table/gallery-list-table";
import useNotification from "../../../hooks/use-notification";

type ImageModalProps = {
  handleClose: () => void;
  onSubmit?: () => void;
  loading?: boolean;
  title: string;
  imageUrl?: string;
  handleElement?: (e: any, key, keyValue, type) => void;
  keyValue?: string;
};

const ImageModal: React.FC<ImageModalProps> = ({
  handleClose,
  title,
  imageUrl,
}) => {
  return (
    <Modal handleClose={handleClose}>
      <Modal.Body>
        <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold text-center">{title}</span>
        </Modal.Header>
        <Modal.Content>
          <div className="inter-small-regular mb-4 flex items-center justify-center text-grey-50">
            <img src={imageUrl} alt="image name" className="object-cover" />
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex w-full items-center justify-center">
            <Button
              variant="ghost"
              size="small"
              onClick={handleClose}
              className="mr-2"
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;

export const SelectImageModal: React.FC<ImageModalProps> = ({
  handleClose,
  handleElement,
  title,
  imageUrl,
  keyValue,
}) => {
  const [listImage, setListImage] = useState<GalleryList[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(imageUrl);
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    axios.get("http://longvb.net/api-admin/gallery").then(({ data }) => {
      setListImage(data.gallery);
    });
  }, [imageUrl, refresh]);
  const notification = useNotification();
  const handleUploadFIle = (file: File[]) => {
    if (file.length > 0) {
      const formData = new FormData();
      formData.append("file", file[0]);
      axios
        .post("http://longvb.net/api-admin/gallery", formData)
        .then(({ data }) => {
          setRefresh(!refresh);
          setSelectedImage(data.file.url);
          notification("Success", "Upload successful", "success");
        })
        .catch(() => {
          notification("Failed", "Failed to save", "error");
        });
    }
  };
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const images = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (images) {
        handleUploadFIle(images);
      }
    }
  }

  return (
    <Modal handleClose={handleClose}>
      <Modal.Body>
        <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold text-center">{title}</span>
        </Modal.Header>
        <Modal.Content>
          <div className="inter-small-regular mb-4 flex  flex-col items-center justify-center text-grey-50">
            <div className="mb-5 flex h-40  w-full items-center justify-center rounded border-2 border-dashed">
              <label>
                <div className="cursor-pointer rounded bg-cyan-10 px-3 py-1 font-extrabold text-blue-70">
                  Add image
                </div>
                <input
                  type="file"
                  className="block h-0 w-0 opacity-0"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e)}
                />
              </label>
            </div>
            <div className="flex max-w-full flex-wrap gap-[1%] overflow-y-scroll">
              {listImage.map((image) => (
                <div
                  className="relative mb-3 flex aspect-square basis-[15.833333%] items-center rounded border"
                  onClick={() => {
                    setSelectedImage(image.url);
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="object-fill"
                  />
                  <input
                    type="checkbox"
                    className="absolute top-3 left-3"
                    checked={selectedImage == image.url ? true : false}
                  />
                </div>
              ))}
            </div>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex w-full items-center justify-center">
            <Button
              variant="ghost"
              size="small"
              onClick={handleClose}
              className="mr-2"
            >
              Close
            </Button>
            <Button
              variant="ghost"
              size="small"
              onClick={() => {
                handleElement!(selectedImage, keyValue, "url", "image");
                handleClose();
              }}
              className="mr-2"
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};
