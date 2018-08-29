import React, { Component } from "react";
import "./index.css";

export default class ButtonDropdown extends Component {
	state = {
		isOpen: false,
		selected: null
	};

	_updateValue(value) {
		this.setState({
			selected: value
		});
	}

	render() {
		const { selected } = this.state;
		return (
			<div>
				<button>{selected ? selected : "Frequency"}</button>
				<div>
					<div onClick={() => this._updateValue("Everyday")}>
						Everyday
					</div>
					<div onClick={() => this._updateValue("Every Other Day")}>
						Every Other day
					</div>
					<div onClick={() => this._updateValue("Every Week")}>
						Every Week
					</div>
					<div onClick={() => this._updateValue("Every Two Weeks")}>
						Every Two Weeks
					</div>
					<div onClick={() => this._updateValue("Every Month")}>
						Every Month
					</div>
				</div>
			</div>
		);
	}
}
