import { isArray } from "lodash"
import React, { useMemo } from "react"
import { Column } from "react-table"
import { BlogList } from "./datasource-blog-table"
import Table from "../../../molecules/table"

export const useBlogListTableColumns = () => {
  const columns = useMemo<Column<BlogList>[]>(
    () => [
      {
        Header: "Id",
        accessor: "id",
        Cell: ({ cell: { value } }) => (
          <Table.Cell className="hidden">
            <span className="inter-small-regular hidden">{value}</span>
          </Table.Cell>
        ),
      },
      {
        Header: "",
        accessor: "selected",
        Cell: ({ cell: { value } }) => (
          <Table.Cell className="flex justify-center">
            <input type="checkbox" checked={value} />
          </Table.Cell>
        ),
      },
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ cell: { value } }) => (
          <Table.Cell>
            <span className="inter-small-regular">{value}</span>
          </Table.Cell>
        ),
      },
      {
        Header: "Slug",
        accessor: "slug",
        Cell: ({ cell: { value } }) => (
          <Table.Cell>
            <span className="inter-small-regular">{value}</span>
          </Table.Cell>
        ),
      },
      {
        Header: "Thumbnail",
        accessor: "thumbnail",
        Cell: ({ cell: { value } }) => (
          <Table.Cell>
            <div className="h-28 w-40">
              <img
                src={value}
                className="h-full w-full rounded-soft object-cover py-2 px-1"
              />
            </div>
          </Table.Cell>
        ),
      },
      {
        Header: "CreatAt",
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => (
          <Table.Cell>
            <span className="inter-small-regular">{value}</span>
          </Table.Cell>
        ),
      },
      {
        Header: "UpdatedAt",
        accessor: "updatedAt",
        Cell: ({ cell: { value } }) => (
          <Table.Cell>
            <span className="inter-small-regular">{value}</span>
          </Table.Cell>
        ),
      },
    ],
    []
  )

  return [columns] as const
}
