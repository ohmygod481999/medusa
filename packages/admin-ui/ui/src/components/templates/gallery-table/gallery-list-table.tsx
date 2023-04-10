import React, { useCallback, useEffect, useState } from "react";
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
} from "react-table";
import Table, { TableProps } from "../../molecules/table";
import TableContainer from "../../organisms/table-container";

export declare class GalleryList {
  name: string;
  url: string;
}

/* ******************************************** */
/* ************** TABLE ELEMENTS ************** */
/* ******************************************** */

type HeaderCellProps = {
  col: HeaderGroup<GalleryList> & UseSortByColumnProps<GalleryList>;
};

/*
 * Renders react-table cell for the Gallery lists table.
 */
function GalleryListTableHeaderCell(props: HeaderCellProps) {
  return (
    <Table.HeadCell
      className="w-[100px]"
      {...props.col.getHeaderProps(props.col.getSortByToggleProps())}
    >
      {props.col.render("Header")}
    </Table.HeadCell>
  );
}

type HeaderRowProps = {
  headerGroup: HeaderGroup<GalleryList>;
};

/*
 * Renders react-table header row for the Gallery list table.
 */
function GalleryListTableHeaderRow(props: HeaderRowProps) {
  return (
    <Table.HeadRow {...props.headerGroup.getHeaderGroupProps()}>
      {props.headerGroup.headers.map((col) => (
        <GalleryListTableHeaderCell key={col.id} col={col} />
      ))}
    </Table.HeadRow>
  );
}

type GalleryListTableRowProps = {
  row: Row<GalleryList>;
};

/*
 * Render react-table row for the Gallery lists table.
 */
function GalleryListTableRow(props: GalleryListTableRowProps) {
  const { row } = props;

  return (
    <Table.Row
      color={"inherit"}
      linkTo={`/a/gallery?img=${row.original.url}`}
      className="group"
      {...row.getRowProps()}
    >
      {row.cells.map((cell, index) => cell.render("Cell", { index }))}
    </Table.Row>
  );
}

/* ******************************************** */
/* ************* TABLE CONTAINERS ************* */
/* ******************************************** */

type GalleryListTableProps = {
  isLoading?: boolean;
  GalleryLists: GalleryList[];
  columns: Array<Column<GalleryList>>;
  count: number;
  options: Omit<TableProps, "filteringOptions"> & {
    filter: Pick<TableProps, "filteringOptions">;
  };
};

/*
 * Root component of the Gallery lists table.
 */
export function GalleryListTable(props: GalleryListTableProps) {
  const { GalleryLists, count, columns, options, isLoading } = props;
  const [pageIndex, setPageIndex] = useState<number>(1);
  const limit = 5;
  const pageCount = Math.ceil(count / limit);

  let offset = (pageIndex - 1) * limit;
  const [galleryList, setGalleryList] = useState<GalleryList[]>([]);
  useEffect(() => {
    const temp = GalleryLists.slice(offset, offset + limit);
    setGalleryList(temp);
  }, [pageIndex, GalleryLists]);
  const tableConfig: TableOptions<GalleryList> = {
    columns: columns,
    data: galleryList || [],
    manualPagination: true,
    autoResetPage: false,
    pageCount: pageCount,
  };

  const table = useTable(tableConfig, useSortBy, usePagination, useRowSelect);

  // ********* HANDLERS *********

  const handleNext = () => {
    if (!table.canNextPage) {
      return;
    }
    table.nextPage();
    setPageIndex(pageIndex + 1);
  };

  const handlePrev = () => {
    if (!table.canPreviousPage) {
      return;
    }
    table.previousPage();
    setPageIndex(pageIndex - 1);
  };

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
        title: "Gallery Lists",
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
            <GalleryListTableHeaderRow key={ind} headerGroup={headerGroup} />
          ))}
        </Table.Head>

        {/* BODY */}
        <Table.Body {...table.getTableBodyProps()}>
          {table.rows.map((row) => {
            table.prepareRow(row);
            return <GalleryListTableRow row={row} key={row.id} />;
          })}
        </Table.Body>
      </Table>
    </TableContainer>
  );
}
