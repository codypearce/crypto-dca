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

	_toggleMenu(state) {
		this.setState({
			isOpen: state ? state : !this.state.isOpen
		});
	}

	render() {
		const { isOpen, selected } = this.state;
		return (
			<div className="dropdown">
				<button onClick={() => this._toggleMenu()}>
					{selected ? selected : "Frequency"}
				</button>
				<div
					className={`dropdown_menu ${
						isOpen ? "dropdown_menu--open" : ""
					}`}
				>
					<div
						className="dropdown_menu_item"
						onClick={() => this._updateValue("Everyday")}
					>
						Everyday
					</div>
					<div
						className="dropdown_menu_item"
						onClick={() => this._updateValue("Every Other Day")}
					>
						Every Other day
					</div>
					<div
						className="dropdown_menu_item"
						onClick={() => this._updateValue("Every Week")}
					>
						Every Week
					</div>
					<div
						className="dropdown_menu_item"
						onClick={() => this._updateValue("Every Two Weeks")}
					>
						Every Two Weeks
					</div>
					<div
						className="dropdown_menu_item"
						onClick={() => this._updateValue("Every Month")}
					>
						Every Month
					</div>
				</div>
			</div>
		);
	}
}
