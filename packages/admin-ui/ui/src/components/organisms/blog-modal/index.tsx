import React, { useEffect, useRef, useState } from "react";
import Modal from "../../molecules/modal";
import BlogTable from "../../templates/online-store-table/datasource-blog-table";

type EditBlogModalProps = {
  blogs: any;
  selectedBlogId: string;
  keyValue: string;
  handleClose: () => void;
  handleElement: any;
};

const EditBlogModal: React.FC<EditBlogModalProps> = ({
  handleClose,
  blogs,
  keyValue,
  handleElement,
  selectedBlogId,
}) => {
  const [elements, setElements] = useState<any>(blogs);
  const [selected, setSelected] = useState<any>(selectedBlogId);
  return (
    <Modal handleClose={handleClose}>
      <Modal.Body>
        <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold">Change blog</span>
        </Modal.Header>
        <Modal.Content>
          <div className="h-96">
            {elements ? (
              <BlogTable
                handleSelect={setSelected}
                data={elements}
                seletectId={selected}
              />
            ) : (
              ""
            )}
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex w-full items-end justify-end gap-2">
            <button
              className="rounded border border-gray-200 px-2 py-1"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className="rounded border border-gray-200 bg-emerald-50 px-2 py-1 text-white transition-all hover:bg-emerald-40"
              onClick={() => {
                handleElement(selected, keyValue, "params", "datasource");
                handleClose();
              }}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default EditBlogModal;
