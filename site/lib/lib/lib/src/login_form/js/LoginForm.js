class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  async handle_login() {
    const credentials = {
      "email": this.state.username,
      "password": this.state.password
    };
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status == 200) {
      console.log("login succeed");
    } else {
      console.log("login error");
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "LoginForm"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "mail",
      name: "email",
      placeholder: "E-mail",
      className: "LoginFields"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "passwd",
      name: "password",
      placeholder: "Password",
      className: "LoginFields"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: "login_button",
      className: "LoginFields"
    }, "Login")), /*#__PURE__*/React.createElement("div", {
      id: "register_text"
    }, "Not a member? ", /*#__PURE__*/React.createElement("a", {
      href: "www.walla.com",
      className: "LoginFields"
    }, "signup")));
  }

}