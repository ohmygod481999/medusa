import React, { useCallback, useEffect, useState } from "react"
import {
  Column,
  HeaderGroup,
  Row,
  TableOptions,
  usePagination,
  useRowSelect,
  useSortBy,
  UseSortByColumnProps,
  useTable,
} from "react-table"
import Table, { TableProps } from "../../../molecules/table"
import TableContainer from "../../../organisms/table-container"

export declare class ProductList {
  title: string
  slug: string
  thumbnail: string
  createdAt: string
  updatedAt: string
  id: string
  selected: boolean
}

/* ******************************************** */
/* ************** TABLE ELEMENTS ************** */
/* ******************************************** */

type HeaderCellProps = {
  col: HeaderGroup<ProductList> & UseSortByColumnProps<ProductList>
}

/*
 * Renders react-table cell for the Gallery lists table.
 */
function ProductListTableHeaderCell(props: HeaderCellProps) {
  return (
    <Table.HeadCell
      className={`w-[100px] ${props.col.Header == "Id" ? "hidden" : ""}`}
      {...props.col.getHeaderProps(props.col.getSortByToggleProps())}
    >
      {props.col.render("Header")}
    </Table.HeadCell>
  )
}

type HeaderRowProps = {
  headerGroup: HeaderGroup<ProductList>
}

/*
 * Renders react-table header row for the Gallery list table.
 */
function ProductListTableHeaderRow(props: HeaderRowProps) {
  return (
    <Table.HeadRow {...props.headerGroup.getHeaderGroupProps()}>
      {props.headerGroup.headers.map((col) => (
        <ProductListTableHeaderCell key={col.id} col={col} />
      ))}
    </Table.HeadRow>
  )
}

type ProductListTableRowProps = {
  row: Row<ProductList>
  handleSelect: any
}

/*
 * Render react-table row for the Gallery lists table.
 */
function ProductListTableRow(props: ProductListTableRowProps) {
  const { row, handleSelect } = props
  return (
    <Table.Row
      color={"inherit"}
      className="group cursor-pointer hover:bg-slate-100"
      {...row.getRowProps()}
      onClick={() => handleSelect()}
    >
      {row.cells.map((cell, index) => cell.render("Cell", { index }))}
    </Table.Row>
  )
}

/* ******************************************** */
/* ************* TABLE CONTAINERS ************* */
/* ******************************************** */

type DataSourceProductListTableProps = {
  isLoading?: boolean
  handleSelect: any
  ProductLists: ProductList[]
  columns: Array<Column<ProductList>>
  count: number
  options: Omit<TableProps, "filteringOptions"> & {
    filter: Pick<TableProps, "filteringOptions">
  }
  selectedId: string
}

/*
 * Root component of the Gallery lists table.
 */
export function DataSourceProductListTable(
  props: DataSourceProductListTableProps
) {
  const {
    ProductLists,
    count,
    columns,
    options,
    isLoading,
    handleSelect,
    selectedId,
  } = props
  const [pageIndex, setPageIndex] = useState<number>(1)
  const limit = 5
  const pageCount = Math.ceil(count / limit)

  let offset = (pageIndex - 1) * limit
  const [productList, setProductList] = useState<ProductList[]>([])
  useEffect(() => {
    const temp = ProductLists.slice(offset, offset + limit)
    setProductList(temp)
  }, [pageIndex, ProductLists])
  const tableConfig: TableOptions<ProductList> = {
    columns: columns,
    data: productList || [],
    manualPagination: true,
    autoResetPage: false,
    pageCount: pageCount,
  }

  const table = useTable(tableConfig, useSortBy, usePagination, useRowSelect)

  // ********* HANDLERS *********

  const handleNext = () => {
    if (!table.canNextPage) {
      return
    }
    table.nextPage()
    setPageIndex(pageIndex + 1)
  }

  const handlePrev = () => {
    if (!table.canPreviousPage) {
      return
    }
    table.previousPage()
    setPageIndex(pageIndex - 1)
  }

  // const debouncedSearch = React.useMemo(() => debounce(handleSearch, 300), [])

  // ********* RENDER *********

  return (
    <TableContainer
      isLoading={isLoading}
      hasPagination
      pagingState={{
        count: count!,
        offset: offset,
        pageSize: offset + limit > count ? count : offset + limit,
        title: "Product Lists",
        currentPage: table.state.pageIndex + 1,
        pageCount: table.pageCount,
        nextPage: handleNext,
        prevPage: handlePrev,
        hasNext: table.canNextPage,
        hasPrev: table.canPreviousPage,
      }}
    >
      <Table
        {...table.getTableProps()}
        {...options}
        enableSearch={options.enableSearch}
        searchValue=""
        handleSearch={() => {}}
      >
        {/* HEAD */}
        <Table.Head>
          {table.headerGroups?.map((headerGroup, ind) => (
            <ProductListTableHeaderRow key={ind} headerGroup={headerGroup} />
          ))}
        </Table.Head>

        {/* BODY */}
        <Table.Body {...table.getTableBodyProps()}>
          {table.rows.map((row) => {
            table.prepareRow(row)
            return (
              <ProductListTableRow
                row={row}
                key={row.id}
                handleSelect={() => {
                  if (row.values.id == selectedId) {
                    handleSelect(null)
                  } else {
                    handleSelect(row.values.id)
                  }
                }}
              />
            )
          })}
        </Table.Body>
      </Table>
    </TableContainer>
  )
}
