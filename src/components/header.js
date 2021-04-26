import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import React from "react";

export class Header extends React.Component{
	render() {
		return (

			<Navbar bg="dark" variant="dark">
				<LinkContainer to="/">
					<Navbar.Brand>Navbar</Navbar.Brand>
				</LinkContainer>
				<Nav className="mr-auto">
					<LinkContainer to="/">
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>

					<LinkContainer to="/articles">
						<Nav.Link>Articles</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/drupal-logs">
						<Nav.Link>Logs</Nav.Link>
					</LinkContainer>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-info">Search</Button>
				</Form>
			</Navbar>

		);
	}
}
