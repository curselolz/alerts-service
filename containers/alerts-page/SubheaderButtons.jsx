import {
    Input,
    Label,
} from 'reactstrap';
import { PropTypes } from 'react';

const SubheaderButtons = ({ statusCheckboxes, handleStatusCheckbox }) => {
    const arr = [
        { id: 1, value: 'new', name: 'New' },
        { id: 2, value: 'inHand', name: 'In hand' },
        { id: 3, value: 'resolved', name: 'Resolved' },
        { id: 4, value: 'declined', name: 'Declined' }
    ];
    return (
        <div className="d-flex align-items-center">
            <span className="mr-3">Status</span>
            {
                arr.map(el => (
                    <div className="checkbox-wrapper" key={el.id}>
                        <Input
                            id={el.value}
                            name={el.value}
                            type="checkbox"
                            checked={statusCheckboxes[el.value]}
                            onChange={e => handleStatusCheckbox(e)}
                        />
                        <Label
                            for={el.value}
                            htmlFor={el.value}
                            className="d-block mr-4 mb-0"
                        >
                            {el.name}
                        </Label>
                    </div>
                ))
            }
        </div>
    )
};

SubheaderButtons.propTypes = {
    statusCheckboxes: PropTypes.object.isRequired,
    handleStatusCheckbox:PropTypes.func.isRequired,
};

export default SubheaderButtons;