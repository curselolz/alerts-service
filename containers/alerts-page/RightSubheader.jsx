import {
    Input,
} from 'reactstrap';
import { PropTypes } from 'react';
import AlertsListDatePicker from '../alerts-list-date-picker';
import { Link } from 'react-router';

const RightSubheader = ({ handleSearchInput, handleDatePickerChange }) => (
    <div className="d-flex justify-content-end">
        <div className="d-flex justify-content-around">
            <AlertsListDatePicker
                handleDatePickerChange={handleDatePickerChange}
            />
            <Input
                id="search"
                className="search"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchInput}
            />
        </div>
        <Link
            className="btn btn-info w-35 ml-3"
            to={{ pathname: '/alerts-escalation' }}
        >
            Open alert escalation settings
        </Link>
    </div>
)

RightSubheader.propTypes = {
    handleSearchInput: PropTypes.func.isRequired,
};

export default RightSubheader;
