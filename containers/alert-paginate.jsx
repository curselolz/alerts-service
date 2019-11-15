import ReactPaginate from 'react-paginate';
import { PropTypes } from 'react';

const AlertPaginate = ({ pageCount, handlePageChange}) => {
    return (
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={(page) => handlePageChange(page)}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            activeClassName={'active'}
        />
    )
}

AlertPaginate.propTypes = {
    pageCount: PropTypes.number.isRequired,
    handlePageChange:PropTypes.func.isRequired,
};

export default AlertPaginate;