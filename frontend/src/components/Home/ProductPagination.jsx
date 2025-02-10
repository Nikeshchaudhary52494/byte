import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

const ProductPagination = ({ currentPage, totalPages }) => {
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        navigate(`?page=${page}`);
    };

    return (
        <Pagination>
            <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                )}

                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink
                                href="#"
                                isActive={pageNumber === currentPage}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {totalPages > 5 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default ProductPagination;
