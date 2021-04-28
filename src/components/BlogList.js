import React from "react";
import {Col,Container, Row, Card, Dropdown} from "react-bootstrap";
import axios from "axios";
import Moment from 'moment';

export class BlogList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('Le nom a été soumis : ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<h1>Liste des blogs</h1>
		);
	}
}
