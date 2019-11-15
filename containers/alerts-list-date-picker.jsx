import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button, Popover, PopoverBody
} from 'reactstrap';
import { DateRange } from 'react-date-range';
import { PureComponent, PropTypes } from 'react';

import '../styles/alerts-list-date-picker/alerts-list-date-picker.scss';

export default class AlertsListDatePicker extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      datePickerOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      datePickerOpen: !prevState.datePickerOpen
    }));
  }

  render() {
    return (
      <div>
        <Button id="date-picker-button" type="button" onClick={this.toggle} >
          Pick date
        </Button>
        <Popover className="date-picker-popover" placement="bottom" isOpen={this.state.datePickerOpen} toggle={this.toggle} target="date-picker-button" >
          <PopoverBody>
            <DateRange onChange={this.props.handleDatePickerChange} />
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}
