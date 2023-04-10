import { useAdminPriceLists } from "medusa-react";
import useSetSearchParams from "../../hooks/use-set-search-params";
import { usePriceListTableColumns } from "../../components/templates/price-list-table/use-price-list-columns";
import { usePriceListFilters } from "../../components/templates/price-list-table/use-price-list-filters";
import { PriceListTable } from "../../components/templates/price-list-table/price-list-table";
import PriceListsFilter from "../../components/templates/price-list-table/price-list-filters";
import { useLocation } from "react-router-dom";
import {
  GalleryList,
  GalleryListTable,
} from "../../components/templates/gallery-table/gallery-list-table";
import { useGalleryListTableColumns } from "../../components/templates/gallery-table/use-gallery-list-columns";
import { useEffect, useState } from "react";
import axios from "axios";
import { ECOM_BACKEND_URL } from "../../constants/ecom-backend-url";

/**
 * Default filtering config for querying price lists endpoint.
 */
const DEFAULT_PAGE_SIZE = 15;
const defaultQueryProps = {
  expand: "customer_groups,prices",
  offset: 0,
  limit: DEFAULT_PAGE_SIZE,
};

const GalleryTable = (props: any) => {
  const { refresh } = props;
  const location = useLocation();
  const [columns] = useGalleryListTableColumns();
  const [gallery, setGallery] = useState<GalleryList[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    axios.get(`${ECOM_BACKEND_URL}/api-admin/gallery`).then(({ data }) => {
      setGallery(data.gallery);
      setCount(data.gallery.length);
    });
  }, [refresh]);
  return (
    <div>
      <GalleryListTable
        isLoading={false}
        columns={columns}
        count={count}
        GalleryLists={gallery || []}
        options={{
          enableSearch: true,
          filter: {},
        }}
      />
    </div>
  );
};

export default GalleryTable;
