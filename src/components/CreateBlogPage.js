import React from "react";
import axios from "axios";

export class CreateBlogPage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	componentDidMount() {

		axios.post('http://drupal.afup.local/oauth/token',
			{
				'client_id' : "c9e6c5ee-20a4-4b7d-ab78-e8a9c5b4314e",
				'client_secret': "secret",
				'username': "rest",
				'password': "rest",
				'grant_type': "password"
			},
			{
				'headers': {
					'Content-Type': "application/x-www-form-urlencoded"
				}
			})
			.then(tokenResponse => {
				this.setState({
					token : tokenResponse.data
				})
				this.loadArticles(this.state.dateOrder)
			})
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
			<form onSubmit={this.handleSubmit}>
				<label>
					Nom :
					<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Envoyer" />
			</form>
		);
	}
}
