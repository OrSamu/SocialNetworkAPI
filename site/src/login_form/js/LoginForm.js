class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  async handle_login() {
    /*const credentials = {
      "email": this.state.username,
      "password": this.state.password
    }

    const response = await fetch('/api/users/' , 
    {method:'POST', 
     body: JSON.stringify( { email: credentials.email , password: credentials.password }), 
       headers: { 'Content-Type': 'application/json' }
     });
     if ( response.status == 200 )
     {
       console.log("login succeed");  
     }
     else {
       console.log("login error");
     }    */
     console.log("pressed");
  }

  render() {
    return <div className='LoginForm'>
      <div>
        <input type="text" id="mail" name="email" placeholder="E-mail" className='LoginFields' />
      </div>
      <div>
        <input type="text" id="passwd" name="password" placeholder="Password" className='LoginFields' />
      </div>
      <div>
        <button type="button" id="login_button" onClick= { this.handle_login } className='LoginFields'>Login</button>
      </div>
      <div id="register_text">
        Not a member? <a href="www.walla.com" className='LoginFields'>signup</a>
      </div>
    </div>
  }
}