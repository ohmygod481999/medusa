import React, { useEffect, useRef, useState } from "react"
import { AnyRender } from "@tanstack/react-table"
import Modal from "../../../molecules/modal"
import axios from "axios"

type addSectionModalProps = {
  keyValue: string
  handleClose: () => void
  handleElement: any
  currentPageId: string
}

const AddSectionModal: React.FC<addSectionModalProps> = ({
  handleClose,
  keyValue,
  handleElement,
  currentPageId
}) => {
  const [sections, setSection] = useState<any>()
  const [selectSection,setSelectSection] = useState<any>()
  useEffect(()=>{
    axios.get(`http://longvb.net/api-admin/pages/${currentPageId}/sections`).then(({data})=>{
      setSection(data)
      console.log(data)
    })
  },[])
  return (
    <Modal handleClose={handleClose}>
      <Modal.Body>
        <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold">Change Product</span>
        </Modal.Header>
        <Modal.Content>
          <div className="flex max-w-full flex-wrap gap-[1%] overflow-y-scroll">
            {
              sections?sections.map((section:any)=>(
                <div onClick={()=>{
                  setSelectSection(section)
                }} className="mb-3 basis-[32.666666%] items-center rounded border cursor-pointer overflow-hidden hover:bg-slate-50 relative">
                  <iframe src={`http://longvb.net/api-admin/sections/${section.id}/preview-ui`} className="max-w-full pointer-events-none overflow-hidden"/>
                  <p className="text-center py-1">{section.id}</p>
                  <input
                    type="checkbox"
                    className="absolute top-3 left-3"
                   checked={selectSection?.id == section.id ? true : false}
                   defaultChecked={false}
                  />
                </div>
              )):''
            }
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
                handleElement((prev:any)=>
                  [
                    ...prev,
                    selectSection
                  ]
                )
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

export default AddSectionModal
