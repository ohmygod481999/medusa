import React, { useEffect, useRef, useState } from "react";
import Modal from "../../molecules/modal";
import { renderElement } from "../../online-store/sidebar/render-element";

type EditBlockModalProps = {
  indexValue: number;
  blocks: any;
  keyValue: string;
  handleClose: () => void;
  handleElement: any;
  handleSave: (blocks: any) => void;
};

const EditBlockModal: React.FC<EditBlockModalProps> = ({
  handleClose,
  blocks,
  indexValue,
  keyValue,
  handleElement,
  handleSave,
}) => {
  const [elements, setElements] = useState<any>(blocks[indexValue]);
  const handleElementModal = (e, key, keyValue, type) => {
    if (type == "boolean") {
      setElements((prev) => {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            [keyValue]: e.target.checked,
          },
        };
      });
    } else if (type == "image") {
      setElements((prev) => {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            [keyValue]: e,
          },
        };
      });
    } else {
      setElements((prev) => {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            [keyValue]: e.target.value,
          },
        };
      });
    }
  };

  return (
    <Modal handleClose={handleClose}>
      <Modal.Body>
        <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold">Edit block</span>
        </Modal.Header>
        <Modal.Content>
          <div className="h-96">
            {elements
              ? Object.keys(elements).map((key, index) => {
                  return (
                    <li
                      key={key}
                      className="flex flex-col px-4 py-1 capitalize"
                    >
                      {renderElement[elements[key].type]?.render(
                        elements,
                        key,
                        handleElementModal
                      )}
                    </li>
                  );
                })
              : ""}
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex w-full items-end justify-end gap-2">
            <button className="rounded border border-gray-200 px-2 py-1">
              Cancel
            </button>
            <button
              className="rounded border border-gray-200 bg-emerald-50 px-2 py-1 text-white transition-all hover:bg-emerald-40"
              onClick={() => {
                const tempBlocks = [...blocks];
                tempBlocks[indexValue] = { ...elements };
                handleSave([...tempBlocks]);
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

export default EditBlockModal;

const initBlock = {
  btn1: {
    type: "button",
    url: "",
    text: "",
  },
  image1: {
    type: "image",
    url: "",
  },
  isLeft: {
    type: "boolean",
    value: true,
  },
};

export const AddBlockModal: React.FC<EditBlockModalProps> = ({
  handleClose,
  blocks,
  indexValue,
  keyValue,
  handleElement,
  handleSave,
}) => {
  const [elements, setElements] = useState<any>(initBlock);
  const handleElementModal = (e, key, keyValue, type) => {
    if (type == "boolean") {
      setElements((prev) => {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            [keyValue]: e.target.checked,
          },
        };
      });
    } else if (type == "image") {
      setElements((prev) => {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            [keyValue]: e,
          },
        };
      });
    } else {
      setElements((prev) => {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            [keyValue]: e.target.value,
          },
        };
      });
    }
  };

  return (
    <Modal handleClose={handleClose}>
      <Modal.Body>
        <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold">Add block</span>
        </Modal.Header>
        <Modal.Content>
          <div className="h-96">
            {elements
              ? Object.keys(elements).map((key, index) => {
                  return (
                    <li
                      key={key}
                      className="flex flex-col px-4 py-1 capitalize"
                    >
                      {renderElement[elements[key].type]?.render(
                        elements,
                        key,
                        handleElementModal
                      )}
                    </li>
                  );
                })
              : ""}
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex w-full items-end justify-end gap-2">
            <button className="rounded border border-gray-200 px-2 py-1">
              Cancel
            </button>
            <button
              className="rounded border border-gray-200 bg-emerald-50 px-2 py-1 text-white transition-all hover:bg-emerald-40"
              onClick={() => {
                const tempBlocks = [...blocks];
                tempBlocks.push({ ...elements });
                handleSave([...tempBlocks]);
              }}
            >
              Add
            </button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};
