import { useEffect, useState } from "react"
import useNotification from "../../../hooks/use-notification"
import { ReactSortable } from "react-sortablejs"
import EditBlockModal, { AddBlockModal } from "../../organisms/blocks-modal"
import { SelectImageModal } from "../../organisms/image-modal"
import axios from "axios"
import EditBlogModal from "../../organisms/blog-modal"
import EditProductModal from "../../organisms/online-store-modal/product-modal"

export const RenderBlocks = (props) => {
  const { elements, keyValue, handleElement } = props
  const [active, setActive] = useState<boolean>(false)
  const [blocks, setBlocks] = useState<any>(elements[keyValue].blocks)
  const [activeEditModal, setActiveEditModal] = useState<boolean>(false)
  const [activeAddModal, setActiveAddModal] = useState<boolean>(false)
  const [indexBlock, setIndexBlock] = useState<number>(0)
  const notification = useNotification()
  console.log("block", elements)
  useEffect(() => {
    handleElement(blocks, keyValue, "blocks", "blocks")
  }, [blocks])

  return (
    <li key={keyValue} className=" list-item list-none">
      <span
        className={`flex cursor-pointer select-none items-center justify-between rounded py-1 ${
          active ? "bg-green-50" : ""
        }`}
        onClick={() => {
          setActive(!active)
        }}
      >
        {keyValue}
        <svg
          width="16px"
          height="16px"
          className={` transition-all ${active ? "rotate-90" : ""}`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" fill="none" width="24" height="24" />
          <g>
            <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586" />
          </g>
        </svg>
      </span>
      <ul
        className={`${
          active ? "block" : "hidden"
        } border-l border-gray-300 transition-all`}
        style={{ paddingInlineStart: "20px" }}
      >
        <ReactSortable list={blocks} setList={setBlocks} handle=".handle">
          {blocks.map((block, index) => (
            <li
              key={index}
              className={`group flex cursor-pointer items-center  gap-1 py-1`}
            >
              <svg
                width="18px"
                height="18px"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 8.5V7.9H5.9V8.5H6.5ZM18.5 8.5H19.1V7.9H18.5V8.5ZM6.5 16.5H5.9V17.1H6.5V16.5ZM18.5 16.5V17.1H19.1V16.5H18.5ZM6.5 9.1H18.5V7.9H6.5V9.1ZM7.1 16.5V8.5H5.9V16.5H7.1ZM18.5 15.9H6.5V17.1H18.5V15.9ZM17.9 8.5V16.5H19.1V8.5H17.9ZM5 20.1H20V18.9H5V20.1ZM5 6.1H20V4.9H5V6.1Z"
                  fill="#121923"
                />
              </svg>
              <p
                className="w-[-webkit-fill-available]"
                onClick={() => {
                  setActiveEditModal(!activeEditModal)
                  setIndexBlock(index)
                }}
              >
                Block {index}
              </p>
              <span className="hidden gap-1 group-hover:flex">
                <svg
                  className="z-50"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    if (blocks.length > 1) {
                      setBlocks((prev) => {
                        let tempBlocks = [...prev]
                        tempBlocks.splice(index, 1)
                        console.log(tempBlocks)
                        return [...tempBlocks]
                      })
                    } else {
                      notification("Error", "", "error")
                    }
                  }}
                >
                  <g id="Interface / Trash_Full">
                    <path
                      id="Vector"
                      d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>
                <svg
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="handle"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 19H8V16H11V19Z" fill="#1F2328" />
                  <path d="M11 13.5H8V10.5H11V13.5Z" fill="#1F2328" />
                  <path d="M11 8H8V5H11V8Z" fill="#1F2328" />
                  <path d="M16 19H13V16H16V19Z" fill="#1F2328" />
                  <path d="M16 13.5H13V10.5H16V13.5Z" fill="#1F2328" />
                  <path d="M16 8H13V5H16V8Z" fill="#1F2328" />
                </svg>
              </span>
            </li>
          ))}
        </ReactSortable>
        <li
          className="flex cursor-pointer items-center gap-2 text-cyan-70"
          onClick={() => setActiveAddModal(true)}
        >
          <svg
            className="bg-orange-80"
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
              fill="#3276c3"
            />
          </svg>
          Add Blocks
        </li>
      </ul>
      {activeEditModal ? (
        <EditBlockModal
          indexValue={indexBlock}
          blocks={blocks}
          keyValue={keyValue}
          handleClose={() => {
            setActiveEditModal(false)
          }}
          handleSave={(blocks) => {
            setBlocks([...blocks])
            setActiveEditModal(false)
          }}
          handleElement={handleElement}
        />
      ) : (
        ""
      )}
      {activeAddModal ? (
        <AddBlockModal
          indexValue={indexBlock}
          blocks={blocks}
          keyValue={keyValue}
          handleClose={() => {
            setActiveAddModal(false)
          }}
          handleSave={(blocks) => {
            setBlocks([...blocks])
            setActiveAddModal(false)
          }}
          handleElement={handleElement}
        />
      ) : (
        ""
      )}
    </li>
  )
}
export const RenderImage = (props) => {
  const { elements, keyValue, handleElement } = props

  const [openSelectImageModal, setOpenSelectImageModal] =
    useState<boolean>(false)

  return (
    <>
      <div className="flex justify-between">
        {keyValue}
        {elements[keyValue].url ? (
          <p
            onClick={() => {
              setOpenSelectImageModal(true)
            }}
            className="cursor-pointer"
          >
            Change Image
          </p>
        ) : (
          ""
        )}
      </div>
      {elements[keyValue].url ? (
        <>
          <div className="flex w-full items-center justify-center rounded bg-gray-200 px-3 py-7">
            <img src={elements[keyValue].url} alt={elements[keyValue].name} />
          </div>
        </>
      ) : (
        <div className="flex w-full items-center justify-center rounded bg-gray-200 px-3 py-7">
          <button
            onClick={() => {
              setOpenSelectImageModal(true)
            }}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-center"
          >
            Select image
          </button>
        </div>
      )}
      {openSelectImageModal ? (
        <SelectImageModal
          title="Select Image"
          handleClose={() => {
            setOpenSelectImageModal(false)
          }}
          handleElement={handleElement}
          imageUrl={elements[keyValue].url}
          keyValue={keyValue}
        />
      ) : (
        ""
      )}
    </>
  )
}
export const RenderBlog = (props) => {
  const { id, keyValue, handleElement } = props

  const [blog, setBlog] = useState<any>()
  const [blogs, setBlogs] = useState<any>()
  const [openModalChangeBlog, setOpenModalChangeBlog] = useState<boolean>(false)
  useEffect(() => {
    axios
      .get("http://longvb.net/api-admin/datasource/blogs")
      .then(({ data }) => {
        setBlogs(data.value)
      })
  }, [])
  useEffect(() => {
    axios
      .get(`http://longvb.net/api-admin/datasource/blogs?id=${id}`)
      .then(({ data }) => {
        setBlog(data.value[0])
      })
  }, [id, blogs])
  return (
    <>
      <div className="flex justify-between">
        <p className="font-extrabold">Blog</p>{" "}
        <button onClick={() => setOpenModalChangeBlog(true)}>Change</button>
      </div>

      {blog ? (
        <div className="rounded bg-slate-100 px-1 py-2">
          {blog.fields.title}
          <img src={blog.fields.thumbnail.fields.file.url} alt="" />
        </div>
      ) : (
        <div className="flex h-16 items-center justify-center">
          <button
            className="h-fit rounded border bg-white px-2 py-1 hover:bg-slate-100"
            onClick={() => setOpenModalChangeBlog(true)}
          >
            Select Blog
          </button>
        </div>
      )}
      {openModalChangeBlog ? (
        <EditBlogModal
          keyValue={keyValue}
          blogs={blogs}
          handleClose={() => {
            setOpenModalChangeBlog(false)
          }}
          selectedBlogId={id}
          handleElement={handleElement}
        />
      ) : (
        ""
      )}
    </>
  )
}

export const RenderProduct = (props) => {
  const { id, keyValue, handleElement } = props

  const [product, setProduct] = useState<any>()
  const [products, setProducts] = useState<any>()
  const [openModalChangeProduct, setOpenModalChangeProduct] =
    useState<boolean>(false)
  useEffect(() => {
    axios
      .get("http://longvb.net/api-admin/datasource/products")
      .then(({ data }) => {
        setProducts(data.value)
      })
  }, [])
  useEffect(() => {
    axios
      .get(`http://longvb.net/api-admin/datasource/products?id=${id}`)
      .then(({ data }) => {
        setProduct(data.value[0])
      })
  }, [id])
  return (
    <>
      <div className="flex justify-between">
        <p className="font-extrabold">{keyValue}</p>
        <button onClick={() => setOpenModalChangeProduct(true)}>Change</button>
      </div>
      {product ? (
        <div className="rounded bg-slate-100 px-1 py-2">
          {product.title}
          <img src={product.thumbnail} alt={keyValue} />
        </div>
      ) : (
        <div className="flex h-16 items-center justify-center">
          <button
            className="h-fit rounded border bg-white px-2 py-1 hover:bg-slate-100"
            onClick={() => setOpenModalChangeProduct(true)}
          >
            Select Product
          </button>
        </div>
      )}
      {openModalChangeProduct ? (
        <EditProductModal
          products={products}
          selectedProductId={product?.id || null}
          keyValue={keyValue}
          handleClose={() => setOpenModalChangeProduct(false)}
          handleElement={handleElement}
        />
      ) : (
        ""
      )}
    </>
  )
}

export const renderElement = {
  button: {
    render: (elements, key, handleElement) => (
      <>
        {key}
        <input
          type="text"
          className="mb-1 w-full rounded-md border border-grey-20 bg-grey-5 p-2"
          value={elements[key].text}
          onChange={(e) => {
            handleElement(e, key, "text", "button")
          }}
        />
        <input
          type="text"
          className="w-full rounded-md border border-grey-20 bg-grey-5 p-2"
          value={elements[key].url}
          onChange={(e) => {
            handleElement(e, key, "url", "button")
          }}
        />
      </>
    ),
  },
  image: {
    render: (elements, key, handleElement) => (
      <>
        <RenderImage
          elements={elements}
          keyValue={key}
          handleElement={handleElement}
        />
      </>
    ),
  },
  blocks: {
    render: (elements, key, handleElement) => {
      return (
        <RenderBlocks
          elements={elements}
          keyValue={key}
          handleElement={handleElement}
        />
      )
    },
  },
  boolean: {
    render: (elements, key, handleElement) => (
      <div className="flex gap-3">
        {key}
        <input
          type="checkbox"
          defaultChecked={elements[key].value}
          onChange={(e) => {
            handleElement(e, key, "value", "boolean")
          }}
        />
      </div>
    ),
  },
  datasource: {
    render: (elements, key, handleElement) => {
      if (elements[key].source == "blog") {
        return (
          <RenderBlog
            id={elements[key].params.id}
            keyValue={key}
            handleElement={handleElement}
          />
        )
      } else if (elements[key].source == "product") {
        return (
          <RenderProduct
            id={elements[key].params.id}
            keyValue={key}
            handleElement={handleElement}
          />
        )
      }
    },
  },
}
