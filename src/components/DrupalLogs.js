import React from "react";
import {Col,Container, Row, Card, Table } from "react-bootstrap";
import axios from "axios";
import Moment from 'moment';

export class DrupalLogs extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			token: null,
			images: [],
			articles: []
		}

	}

	loadArticles(order, tagName= null) {

		let apiUrl = 'http://drupal.afup.local/api/logs?_format=json';

		axios
			.get(apiUrl, {
				headers: {
					'X-CSRF-Token': this.state.token,
					'Content-type': 'application/json'
				}
			})
			.then(response => {
				console.log(response)
				this.setState({
					articles: response.data
				})
			})
	}

	componentDidMount() {

		axios.get('http://drupal.afup.local/session/token')
			.then(tokenResponse => {
				this.setState({
					token : tokenResponse.data
				})
				this.loadArticles(this.state.dateOrder)
			})
	}

	render() {
		const { articles } = this.state
		if (!articles) {                                        // added this line
			return <div>Hold tight while items are being fetched...</div>;  // added this line
		}else{

			let logsTable = articles.map((item) =>{
				return (<tr>
					<td>1</td>
					<td>{item.type}</td>
					<td>{item.timestamp}</td>
					<td dangerouslySetInnerHTML={{__html: item.message}} />
				</tr>)
			})
			return(
				<Container>
					<Row className={'my-3'}>
						<Col>

							<Table striped bordered hover>
								<thead>
								<tr>
									<th>#</th>
									<th>Type</th>
									<th>Date</th>
									<th>Message</th>
								</tr>
								</thead>
								<tbody>
								{logsTable}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
			)
		}

	}
}
