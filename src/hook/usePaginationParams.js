import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function usePaginationParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const hasCurrent = searchParams.has("current");
    const hasPageSize = searchParams.has("pageSize");

    if (!hasCurrent || !hasPageSize) {
      setSearchParams({
        current: searchParams.get("current") || 1,
        pageSize: searchParams.get("pageSize") || 20,
      });
    }
  }, [searchParams, setSearchParams]);

  const pageSize = parseInt(searchParams.get("pageSize")) || 20;
  const currentPage = parseInt(searchParams.get("current")) || 1;

  const handleTableChange = (pagination) => {
    setSearchParams({
      pageSize: pagination.pageSize,
      current: pagination.current,
    });
  };

  return { currentPage, pageSize, handleTableChange };
}

export default usePaginationParams;
