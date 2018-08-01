import React, { Component } from 'react'
const firebase = require('firebase')

var config = {
	apiKey: "AIzaSyCbrDe6FYXPecOe_yWTTn6HWscgeyLwvuI",
	authDomain: "survey-data-harvester.firebaseapp.com",
	databaseURL: "https://survey-data-harvester.firebaseio.com",
	projectId: "survey-data-harvester",
	storageBucket: "survey-data-harvester.appspot.com",
	messagingSenderId: "106669869699"
};
firebase.initializeApp(config);

export default class Auth extends Component {
	render() {
		return (
			<div>
				<form>

					<label htmlFor='email'>Email</label>
					<input type='email' id='email' />
					<br />
					<label htmlFor='password'>Password</label>
					<input type='password' id='password' />

				</form>
			</div>
		)
	}
}
