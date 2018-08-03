import React, { Component } from 'react'
const firebase = require('firebase')

// my db config
const config = {
	apiKey: "AIzaSyCbrDe6FYXPecOe_yWTTn6HWscgeyLwvuI",
	authDomain: "survey-data-harvester.firebaseapp.com",
	databaseURL: "https://survey-data-harvester.firebaseio.com",
	projectId: "survey-data-harvester",
	storageBucket: "survey-data-harvester.appspot.com",
	messagingSenderId: "106669869699"
};
firebase.initializeApp(config);

export default class Auth extends Component {

	constructor(props) {
		super(props)

		this.state = {
			userAuthMessage: ''
		}
	}

	// creates new users
	signUp = (e) => {

		const email = this.refs.email.value
		const password = this.refs.password.value

		// console.log( 'sign up email ' + email)
		// console.log( 'sign up pass ' + password)
		// valid data above ffs

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((user) => {

				console.log('created user data')
				console.log(user.user)

				// users/adam
				firebase.database().ref(`users/${user.user.uid}`).set({

					// creating a firebase record with the following data :)) password is for test purpose
					accId: user.user.uid,
					email: user.user.email,
					password: password


				}) // .set firebase

			}) // ./then
			.catch((e) => {
				this.setState({ userAuthMessage: e.message }) // sets to a bloody msg
				console.log(`Got an error for you, buddy -->` + e.message) // this is for your young boy
			}) // ./catch

	}

	// signs users who have an account in
	signIn = (e) => {

		const email = this.refs.email.value
		const password = this.refs.password.value
		//console.log(email, password)

		firebase().auth().signInWithEmailAndPassword(email, password)
		.then( (fuckingBomb) => {
			console.log(fuckingBomb)
			console.log(`well mate you are in! enjoy the stay ;)`)
		})
		.catch( (e) => {
			this.setState( { userAuthMessage: e.message } )
			console.log(`you fucked up a sign in heres why --> ` + e.message)
		})

	}

	// signs out a user
	signOut = (e) => {
		console.log(`signOut clicked but it wasn't coded yet`)
		// to:do sign out
	}


	render() {
		return (
			<div>

				<label htmlFor='email'>Email</label>
				<input type='email' id='email' ref='email' placeholder='name@example.com' />
				<br />
				<label htmlFor='password'>Password</label>
				<input type='password' id='password' ref='password' placeholder='*********' />
				<br />
				{this.state.err}
				<br />

				<button onClick={this.signUp}>Sign Up</button>
				<button onClick={this.signIn}>Sign In</button>
				<button onClick={this.signOut}>Sign Out</button>

			</div>
		)
	}
}
