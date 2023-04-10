import { isArray } from "lodash"
import React, { useMemo } from "react"
import { Column } from "react-table"
import Actionables from "../../molecules/actionables"
import Table from "../../molecules/table"
import { GalleryList } from "./gallery-list-table"

export const useGalleryListTableColumns = () => {
  const columns = useMemo<Column<GalleryList>[]>(
    () => [
      {
        Header: "Image",
        accessor: "url",
        Cell: ({ cell: { value } }) => (
          <Table.Cell>
            <div className="w-40 h-28">
              <img src={value} className="h-full rounded-soft object-cover py-2 px-1 w-full" />
            </div>
          </Table.Cell>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
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
