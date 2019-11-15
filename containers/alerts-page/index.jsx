import BreadCrumbs from '../breadCrumb';
import AlertBodyTable from '../../containers/alert-body-table';
import AlertPaginate from '../../containers/alert-paginate';
import SubheaderButtons from './SubheaderButtons';
import RightSubheader from './RightSubheader';
import { Layout } from 'cvo-ui/containers';
import {
    Table,
} from 'reactstrap';
import { PropTypes } from 'react';

const AlertsPageContainer = ({
    statusCheckboxes,
    handleStatusCheckbox,
    paginatedAlerts,
    pageCount,
    handlePageChange,
    handleTableHeaderClick,
    detectOrderHeader,
    handleDatePickerChange,
    handleSearchInput
}) => {
    const dataHeader = [
        { name: 'Name', value: 'name' },
        { name: 'Time', value: 'createdTime' },
        { name: 'Status', value: 'status' },
        { name: 'Contact Manager', value: 'contactManager' },
        { name: 'Action', value: 'action' }
    ];

    return (
        <Layout
            breadcrumbs={<BreadCrumbs text="Alerts Dashboard" />}
            subheaderDescription={
                <SubheaderButtons
                    statusCheckboxes={statusCheckboxes}
                    handleStatusCheckbox={handleStatusCheckbox}
                />
            }
            subheaderControls={
                <RightSubheader 
                    handleSearchInput={handleSearchInput}
                    handleDatePickerChange={handleDatePickerChange}
                />
            }
        >
            <Table className="table-borderless">
                <thead>
                    <tr>
                        {
                            dataHeader.map(el => <th key={el.name} onClick={e => handleTableHeaderClick(e)} data-sort={el.value}>
                                {el.name} {detectOrderHeader(el)}
                            </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedAlerts.map(el => (
                            <AlertBodyTable key={el.uid} element={el} />
                        ))
                    }
                </tbody>
            </Table>
            {pageCount > 1 && <div className="d-flex justify-content-end">
                <AlertPaginate
                    pageCount={pageCount}
                    handlePageChange={handlePageChange} />
            </div>
            }
        </Layout>
    )
}

AlertsPageContainer.propTypes = {
    statusCheckboxes: PropTypes.object.isRequired,
    handleStatusCheckbox: PropTypes.func.isRequired,
    paginatedAlerts:PropTypes.array.isRequired,
    pageCount: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    handleTableHeaderClick:PropTypes.func.isRequired,
    detectOrderHeader: PropTypes.func.isRequired,
    handleSearchInput:PropTypes.func.isRequired,
};

export default AlertsPageContainer;

