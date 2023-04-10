import React, { useEffect, useRef, useState } from "react"
import { AnyRender } from "@tanstack/react-table"
import Modal from "../../../molecules/modal"
import ProductTable from "../../../templates/online-store-table/datasource-product-table"

type EditProductModalProps = {
  products: any
  selectedProductId: string
  keyValue: string
  handleClose: () => void
  handleElement: any
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  handleClose,
  products,
  keyValue,
  handleElement,
  selectedProductId,
}) => {
  const [elements, setElements] = useState<any>(products)
  const [selected, setSelected] = useState<any>(selectedProductId)
  return (
    <Modal handleClose={handleClose}>
      <Modal.Body>
        <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold">Change Product</span>
        </Modal.Header>
        <Modal.Content>
          <div className="h-96">
            {elements ? (
              <ProductTable
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
                handleElement(selected, keyValue, "params", "datasource")
                handleClose()
              }}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default EditProductModal
