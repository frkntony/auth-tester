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
	constructor(props) {
		super(props)
	
		this.state = {
			err: ''
		}
	}
	

	signUp = (e) => {
		const email = this.refs.email.value
		const password = this.refs.password.value

		const auth = firebase.auth()

		const promise = auth.createUserWithEmailAndPassword(email, password)

		promise
		.then( user => {
			let err = 'Welcome ' + user.name

			firebase.database().ref('users/' + user.uid).set({
				
				email: user.email
			})
			console.log(user)
			this.setState({
				err: err
			})
		})
		.catch(e => {
			console.log(e.message)
		})

	}

	signIn = (e) => {
		const email = this.refs.email.value
		const password = this.refs.password.value

		console.log(email, password)

		const auth = firebase.auth()

		const promise = auth.signInWithEmailAndPassword(email, password)

		// todo handle login promise
		promise.catch(e => {

			console.log('no account' + e.message)
			this.setState( {err: e.message} )
		})
		
		
	}


	signOut = (e) => {


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
