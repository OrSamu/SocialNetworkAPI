class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.handle_login = this.handle_login.bind(this);
  }

  handle_login(){
    console.log("Login Button Has Been Pressed");
  }

  render() {
    return React.createElement( 'button', {className:'Login Button', onClick: this.handle_login}, 'Login' );
  }
}

class RegisterButton extends React.Component {
  constructor(props) {
    super(props);
    this.handle_registration = this.handle_registration.bind(this);
  }

  handle_registration(){
    console.log("Register Button Has Been Pressed");
  }

  render() {
    return React.createElement( 'button', {className:'Register Button', onClick: this.handle_registration}, 'Register' );
  }
}
