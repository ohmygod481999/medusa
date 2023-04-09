import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  DataSourceProductListTable,
  ProductList,
} from "./datasource-product-table"
import { useProductListTableColumns } from "./use-product-list-columns"

const ProductTable = (props) => {
  const { refresh, data, handleSelect, seletectId } = props
  const [columns] = useProductListTableColumns()
  const [products, setProducts] = useState<ProductList[]>([])
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    const temp: ProductList[] = data.map((product) => {
      return {
        title: product.title,
        thumbnail: product.thumbnail,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
        id: product.id,
        selected: product.id == seletectId ? true : false,
      }
    })
    setProducts(temp)
    setCount(temp.length)
  }, [seletectId])
  return (
    <div>
      <DataSourceProductListTable
        selectedId={seletectId}
        isLoading={false}
        columns={columns}
        count={count}
        ProductLists={products || []}
        options={{
          enableSearch: true,
          filter: {},
        }}
        handleSelect={handleSelect}
      />
    </div>
  )
}

export default ProductTable
