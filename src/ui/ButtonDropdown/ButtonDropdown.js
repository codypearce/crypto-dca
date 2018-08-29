import React, { Component } from "react";
import "./index.css";

export default class ButtonDropdown extends Component {
	state = {
		isOpen: false,
		selected: null
	};

	_updateValue(value) {
		this.setState({
			selected: value.target.value
		});
	}

	render() {
		const {value} = this.state;
		return (
			<div>
				<button>{value ? value : {'Frequency'}</button>
				<div>
					<div onClick={() => this._updateValue('Everyday') }>Everyday</div>
					<div onClick={() => this._updateValue('Everyday') }>Every Other day</div>
					<div onClick={() => this._updateValue('Everyday') }>Every Week</div>
					<div onClick={() => this._updateValue('Everyday') }>Every Two Weeks</div>
					<div onClick={() => this._updateValue('Everyday') }>Every Month</div>
				</div>
			</div>
		);
	}
}
