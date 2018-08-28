import React, { Component } from "react";
import "./index.css";

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
					placeholder="How frequent?"
					type="number"
					onChange={e => this._updateValue("frequency", e)}
				/>
				<input
					placeholder="How much?"
					type="number"
					onChange={e => this._updateValue("amount", e)}
				/>
			</div>
		);
	}
}

export default DatesForm;
