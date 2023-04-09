import axios from "axios"
import React, { createContext, ReactNode, useEffect, useState } from "react"

type OnlineStoreContextType = {
  edited: boolean
  setEdited: (value: any) => void
  fileValue: string
  setFileValue: (value: any) => void
  selectedFile: {}
  setSelectedFile: (value: any) => void
  selectedFiles: any[]
  setSelectedFiles: (value: any) => void
  currentSections: any[]
  setCurrentSections: (value: any) => void
  sectionId: string
  setSectionId: (value: string) => void
  typeView: string
  setTypeView: (value: string) => void
  isLoading: boolean
  setLoading: (status: boolean) => void
  inputValue: {}
  setInputValue: (value: {}) => void
  iframeDocument: HTMLElement | null
  setIframeDocument: (value: HTMLElement | null) => void
  iframeWindow: Window | null
  setIframeWindow: (value: Window | null) => void
  iframe: HTMLIFrameElement | null
  setIframe: (value: HTMLIFrameElement | null) => void
  currentPage: {
    path: string
    name: string
    id: string
  }
  setCurrentPage: (value: { path: string; name: string; id: string }) => void
  pages: any[]
}

const OnlineStoreContext = createContext<OnlineStoreContextType>({
  edited: false,
  setEdited: () => {},
  setFileValue: () => {},
  fileValue: "",
  selectedFile: {},
  setSelectedFile: () => {},
  selectedFiles: [],
  setSelectedFiles: () => {},
  currentSections: [],
  setCurrentSections: () => {},
  sectionId: "",
  setSectionId: () => {},
  typeView: "desktop",
  setTypeView: () => {},
  isLoading: true,
  setLoading: () => {},
  inputValue: {},
  setInputValue: () => {},
  iframeDocument: null,
  setIframeDocument: () => {},
  iframeWindow: null,
  setIframeWindow: () => {},
  iframe: null,
  setIframe: () => {},
  currentPage: {
    path: "/",
    name: "Home",
    id: "index",
  },
  setCurrentPage: () => {},
  pages: [],
})

type Props = {
  children?: ReactNode
}

function htmlToElement(html: string) {
  var template = document.createElement("template")
  html = html.trim() // Never return a text node of whitespace as the result
  template.innerHTML = html
  return template.content.firstChild
}

function getElementByEcomId(iframeDoc: HTMLElement, ecomid: string) {
  return iframeDoc.querySelector(`[ecom-id="${ecomid}"]`)
}
const updateSections = (
  inputValue: any,
  currentPage: { path: string; name: string; id: string },
  iframeDocument: HTMLElement | null,
  iframeWindow: Window | null
) => {
  console.log("--bug", inputValue)
  if (inputValue && iframeDocument) {
    axios
      .post(`http://longvb.net/api-admin/pages/${currentPage.id}/preview`, {
        page_settings: {
          sections: [...inputValue],
        },
      })
      .then(({ data }) => {
        const { page } = data
        console.log("bug", page, "--", currentPage.id)
        const { content_for_layout, script } = page
        const content_page = iframeDocument.querySelector("#content_for_layout")
        if (content_page) {
          content_page.innerHTML = content_for_layout
        }

        if (script) {
          ;(iframeWindow as any).eval(script)
        }
      })
  }
}
const updateSection = (
  sectionId: string,
  inputValue: any,
  iframeDocument: HTMLElement | null,
  iframeWindow: Window | null
) => {
  if (iframeDocument && sectionId) {
    // get element which has attribute ecom-id=sectionId
    const element = iframeDocument.querySelector(`[ecom-id=${sectionId}]`)
    if (element && inputValue) {
      axios
        .post(`http://longvb.net/api-admin/sections/${sectionId}/preview`, {
          section_settings: {
            ...inputValue,
          },
        })
        .then(({ data }) => {
          const { sections } = data
          const { html, script } = sections[sectionId]
          Object.keys(sections).forEach((_sectionId) => {
            const section = getElementByEcomId(iframeDocument, _sectionId)
            const replacedElement = htmlToElement(html)
            if (section && replacedElement) {
              section.parentNode?.replaceChild(replacedElement, section)
            }
          })
          if (script) {
            ;(iframeWindow as any).eval(script)
          }
        })
    }
  }
}

const OnlineStoreProvider = ({ children }: Props) => {
  const [edited, setEdited] = useState<boolean>(false)
  const [fileValue, setFileValue] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<any>({})
  const [selectedFiles, setSelectedFiles] = useState<any[]>([])
  const [currentSections, setCurrentSections] = useState<any>([])
  const [sectionId, setSectionId] = useState<string>("")
  const [typeView, setTypeView] = useState<string>("desktop")
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState<any>({})
  const [iframeDocument, setIframeDocument] = useState<HTMLElement | null>(null)
  const [iframeWindow, setIframeWindow] = useState<Window | null>(null)
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null)
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState({
    path: "/",
    name: "Home",
    id: "index",
  })
  useEffect(() => {
    axios.get("http://longvb.net/api-admin/pages").then(({ data }) => {
      setPages(data.pages)
      setIsLoading(false)
    })
  }, [])
  useEffect(() => {
    if (iframeDocument && iframeWindow) {
      updateSection(sectionId, inputValue, iframeDocument, iframeWindow)
    }
  }, [inputValue])
  useEffect(() => {
    updateSections(currentSections, currentPage, iframeDocument, iframeWindow)
  }, [currentSections])
  useEffect(() => {
    if (iframe) {
      iframe.src = `http://longvb.net${currentPage.path}`
    }
  }, [currentPage, iframe])
  return (
    <OnlineStoreContext.Provider
      value={{
        edited,
        setEdited,
        fileValue,
        setFileValue,
        selectedFile,
        setSelectedFile,
        selectedFiles: selectedFiles,
        setSelectedFiles: setSelectedFiles,
        currentSections: currentSections,
        setCurrentSections: setCurrentSections,
        sectionId: sectionId,
        setSectionId: setSectionId,
        typeView: typeView,
        setTypeView: setTypeView,
        isLoading: isLoading,
        setLoading: setIsLoading,
        inputValue: inputValue,
        setInputValue: setInputValue,
        iframeDocument: iframeDocument,
        setIframeDocument: setIframeDocument,
        iframeWindow: iframeWindow,
        setIframeWindow: setIframeWindow,
        iframe: iframe,
        setIframe: setIframe,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        pages: pages,
      }}
    >
      {children}
    </OnlineStoreContext.Provider>
  )
}

export default OnlineStoreProvider

export const useOnlineStore = () => {
  const {
    edited,
    setEdited,
    fileValue,
    setFileValue,
    selectedFile,
    setSelectedFile,
    selectedFiles,
    setSelectedFiles,
    currentSections,
    setCurrentSections,
    sectionId,
    setSectionId,
    typeView,
    setTypeView,
    isLoading,
    setLoading,
    inputValue,
    setInputValue,
    iframeDocument,
    setIframeDocument,
    iframeWindow,
    setIframeWindow,
    iframe,
    setIframe,
    currentPage,
    setCurrentPage,
    pages,
  } = React.useContext(OnlineStoreContext)

  return {
    edited,
    setEdited,
    fileValue,
    setFileValue,
    selectedFile,
    setSelectedFile,
    selectedFiles,
    setSelectedFiles,
    currentSections,
    setCurrentSections,
    sectionId,
    setSectionId,
    typeView,
    setTypeView,
    isLoading,
    setLoading,
    inputValue,
    setInputValue,
    iframeDocument,
    setIframeDocument,
    iframeWindow,
    setIframeWindow,
    iframe,
    setIframe,
    currentPage,
    setCurrentPage,
    pages,
  }
}
