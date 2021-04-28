import React from "react";
import {Col,Container, Row, Card, Dropdown} from "react-bootstrap";
import axios from "axios";
import Moment from 'moment';

export class ArticlesList extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			token: null,
			images: [],
			articles: [],
			dateOrder: 'DESC'
		}

	}

	loadArticles(order, tagName= null) {

		let apiUrl = 'http://drupal.afup.local/jsonapi/node/article?include=field_image,field_tags&sort[sort-date][path]=created&sort[sort-date][direction]='+order;

		if (tagName){
			apiUrl += '&filter[taxonomy_term--tags][condition][path]=field_tags.name&filter[taxonomy_term--tags][condition][operator]=IN&filter[taxonomy_term--tags][condition][value][]='+tagName
		}

		axios
			.get(apiUrl, {
				headers: {
					'X-CSRF-Token': this.state.token,
					'Content-type': 'application/json'
				}
			})
			.then(response => {
				this.setState({
					articles: response.data.data,
					images: response.data.included
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
		const { articles, images } = this.state
		if (!articles && !images) {                                        // added this line
			return <div>Hold tight while items are being fetched...</div>;  // added this line
		}else{

			let articlesTags = images.filter(element => element.type.startsWith('taxonomy_term'));

			articles.map(function(item, index){

				item.tags = item.relationships.field_tags.data.map((tag) => {
					return articlesTags.filter(el => el.id === tag.id );
				});
				return item;
			})

			let that = this;

			let articlesCards = articles.map(function(item, index){

				let articleLinks = item.tags.map((tag) => {
						return <Card.Link onClick={() =>{ that.loadArticles('DESC', tag[0].attributes.name) } } key={ 'tag' + tag[0].id + item.id}>{ tag[0].attributes.name }</Card.Link>
				});

				let articleImg;

				if (images[index].hasOwnProperty('attributes') && images[index].attributes.hasOwnProperty('uri')){
					articleImg = <Card.Img variant="top" src= { 'http://drupal.afup.local'+images[index].attributes.uri.url } />
				}

				return <Col key={item.id}>
					<Card>
						{ articleImg }
						<Card.Body key={'body-text'+item.id}>
							<Card.Title>{item.attributes.title}</Card.Title>
							<Card.Text>
								{item.attributes.body.summary}
							</Card.Text>
						</Card.Body>
						<Card.Body key={'body-links'+item.id}>{articleLinks}</Card.Body>
						<Card.Footer>
							<small className="text-muted">{ Moment(item.attributes.created).format('d MMM YYYY') }</small>
						</Card.Footer>
					</Card>
				</Col>
			});

			return(
				<Container>
					<Row className={'my-3'}>
						<Col>
							<Dropdown>
								<Dropdown.Toggle variant="success" id="dropdown-basic">
									Trier par date
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item onClick={() =>{ this.loadArticles('DESC') } } >Le plus récent d'abord</Dropdown.Item>
									<Dropdown.Item onClick={() =>{ this.loadArticles('ASC') } }>Le plus ancien d'abord</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Col>
					</Row>
					<Row xs={1} md={3}>
						{ articlesCards }
					</Row>
				</Container>
			)
		}

	}
}
