import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useBlogListTableColumns } from "./use-blog-list-columns"
import { BlogList } from "./datasource-blog-table"
import { DataSourceBlogListTable } from "./datasource-blog-table"

/**
 * Default filtering config for querying price lists endpoint.
 */
const DEFAULT_PAGE_SIZE = 15
const defaultQueryProps = {
  expand: "customer_groups,prices",
  offset: 0,
  limit: DEFAULT_PAGE_SIZE,
}

const BlogTable = (props) => {
  const { refresh, data, handleSelect, seletectId } = props
  const location = useLocation()
  const [columns] = useBlogListTableColumns()
  const [blogs, setBlogs] = useState<BlogList[]>([])
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    const temp: BlogList[] = data.map((blog) => {
      return {
        title: blog.fields.title,
        slug: blog.fields.slug,
        thumbnail: blog.fields.thumbnail.fields.file.url,
        createdAt: blog.sys.createdAt,
        updatedAt: blog.sys.updatedAt,
        id: blog.sys.id,
        selected: blog.sys.id == seletectId ? true : false,
      }
    })
    setBlogs(temp)
    setCount(temp.length)
  }, [seletectId])
  return (
    <div>
      <DataSourceBlogListTable
        selectedId={seletectId}
        isLoading={false}
        columns={columns}
        count={count}
        BlogLists={blogs || []}
        options={{
          enableSearch: true,
          filter: {},
        }}
        handleSelect={handleSelect}
      />
    </div>
  )
}

export default BlogTable
