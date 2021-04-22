import React from "react";
import { CardDeck, Card} from "react-bootstrap";
import axios from "axios";
import Moment from 'moment';

export class ArticlesList extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			items: []
		}
	}

	componentDidMount() {
		let that = this;

		axios.get('http://drupal.afup.local/session/token')
			.then(tokenResponse => {
				axios
					.get(`http://drupal.afup.local/jsonapi/node/article`, {
						headers: {
							'X-CSRF-Token': tokenResponse.data,
							'Content-type': 'application/json'
						}
					})
					.then(response => {
						that.setState({
							items: response.data.data,
						})
					})
			})
	}

	render() {
		const { items } = this.state
		if (!items) {                                        // added this line
			return <div>Hold tight while items are being fetched...</div>;  // added this line
		}else{

			Moment.locale('fr');

			let articlesCards = items.map(function(item){
				return <Card key={item.id}>
					<Card.Body>
						<Card.Title>Hey</Card.Title>
						<Card.Text>
							{item.attributes.title}
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">{ Moment(item.attributes.changed).format('MMM YYYY') }</small>
					</Card.Footer>
				</Card>
			});

			return(
				<CardDeck>
					{ articlesCards }
				</CardDeck>
			)
		}

	}
}
