import React, { Component } from "react";
import "./index.css";
import DatePicker from "react-datepicker";
import moment from "moment";

import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";

class DatesForm extends Component {
	state = {
		frequency: null,
		amount: null,
		startDate: null,
		endDate: null
	};

	_updateValue(type, value) {
		this.setState({
			[type]: value.target.value
		});
	}

	render() {
		return (
			<div>
				<h1>Bitcoin DCA</h1>

				<input
					placeholder="How much?"
					type="number"
					onChange={e => this._updateValue("amount", e)}
				/>
				<DatePicker
					selected={this.state.startDate}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

export default DatesForm;
