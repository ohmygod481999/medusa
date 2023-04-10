import { ClaimTag } from "@medusajs/medusa";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/fundamentals/button";
import UploadIcon from "../../components/fundamentals/icons/upload-icon";
import BodyCard from "../../components/organisms/body-card";
import ImageModal from "../../components/organisms/image-modal";
import UploadImageModal from "../../components/organisms/upload-img-modal";
import useNotification from "../../hooks/use-notification";
import GalleryTable from "./gallery-table";

const GalleryIndex = () => {
  const location = useLocation();
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [imgPath, setImgPath] = useState<string>("");
  const [openUploadImgModal, setOpenUploadImgModal] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const notification = useNotification();

  const navigate = useNavigate();
  useEffect(() => {
    let index = location.search.indexOf("img=");
    console.log(index);
    if (index > -1) {
      setImgPath(location.search.substring(index + 4));
      setImageModal(!imageModal);
    }
  }, [location.search]);
  const CurrentAction = () => {
    return (
      <div className="flex space-x-2">
        <Button
          variant="secondary"
          size="small"
          onClick={() => {
            setOpenUploadImgModal(true);
          }}
        >
          <UploadIcon size={20} />
          Upload Image
        </Button>
      </div>
    );
  };
  const handleUploadFIle = (file: File[]) => {
    if (file.length > 0) {
      const formData = new FormData();
      formData.append("file", file[0]);
      axios
        .post("http://longvb.net/api-admin/gallery", formData)
        .then(() => {
          console.log("Success");
          setRefresh(!refresh);
          setOpenUploadImgModal(false);
          notification("Success", "Upload successful", "success");
        })
        .catch(() => {
          notification("Failed", "Failed to save", "error");
        });
    }
  };
  return (
    <>
      <div className="flex h-full grow flex-col">
        <div className="flex w-full grow flex-col">
          <BodyCard
            customActionable={CurrentAction()}
            forceDropdown={false}
            className="h-fit"
          >
            <GalleryTable refresh={refresh} />
          </BodyCard>
        </div>
      </div>
      {imageModal ? (
        <ImageModal
          imageUrl={imgPath}
          title="Image"
          handleClose={() => {
            setImageModal(!imageModal);
            navigate("/a/gallery");
          }}
        />
      ) : (
        ""
      )}
      {openUploadImgModal ? (
        <UploadImageModal
          title="Upload Image"
          handleClose={() => setOpenUploadImgModal(!openUploadImgModal)}
          handleUpload={handleUploadFIle}
        />
      ) : (
        ""
      )}
    </>
  );
};

const Gallery = () => {
  return (
    <Routes>
      <Route index element={<GalleryIndex />} />
    </Routes>
  );
};

export default Gallery;
