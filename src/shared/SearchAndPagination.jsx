import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SearchAndPagination = ({
  children,
  label,
  searchQuery,
  setSearchQuery,
  searchParams,
  setSearchParams,
  search,
  pageNumber,
  page,
}) => {
  const onPreviousPageClick = () => {
    if (pageNumber > 0) {
      setSearchParams((prev) => {
        return {
          ...Object.fromEntries(prev),
          page: parseInt(pageNumber) - 1,
        };
      });
    }
  };
  const onNextPageClick = () => {
    if (pageNumber < page.totalPages - 1)
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: parseInt(pageNumber) + 1,
      });
  };
  const onPageClick = (newPageNum) => {
    if (newPageNum < page.totalPages && newPageNum >= 0) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: newPageNum,
      });
    }
  };

  const onSizeChange = (newValue) => {
    if (isNaN(newValue))
      setSearchParams({ size: 1, ...Object.fromEntries(searchParams) });
    if (newValue >= 0) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        size: newValue,
      });
    }
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      search(e.target.value);
    }
  };
  return (
    <>
      <div className="flex space-x-2">
        <Input
          className="flex-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleInput}
        />
        <Label className="mx-4">{label}</Label>
        <Input
          className="flex-1"
          type={"number"}
          value={
            // !isNaN
            parseInt(searchParams.get("size"))
            // ? parseInt(searchParams.get("size"))
            // : 1
          }
          onChange={(e) => onSizeChange(e.target.value)}
        />
        <div className="">{children}</div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={onPreviousPageClick}
              disabled={parseInt(pageNumber) == 0}
            />
          </PaginationItem>
          {pageNumber > 0 ? (
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageClick(parseInt(pageNumber) - 1)}
              >
                {pageNumber - 1}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <div></div>
          )}
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageClick(parseInt(pageNumber))}
              isActive
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
          {parseInt(pageNumber) < page.totalPages - 1 ? (
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageClick(parseInt(pageNumber) + 1)}
              >
                {pageNumber + 1}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <></>
          )}
          {parseInt(pageNumber) < page.totalPages - 2 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <></>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={onNextPageClick}
              disabled={pageNumber == page.totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default SearchAndPagination;
