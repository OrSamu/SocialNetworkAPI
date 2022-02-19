const api_address = "/api/users/login";
const milliseconds_in_quarter_hour = 900000;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handle_input_change = this.handle_input_change.bind(this);
    this.handle_login = this.handle_login.bind(this);

  }

  handle_input_change(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  wrong_credentials() {
    alert("Wrong email or password");
  }

  login_successful(response) {
    const cookie = response.token;
    this.set_cookie(cookie);
    this.redirect_to_home();

  }

  redirect_to_home() {
    window.location.href = "http://localhost:2718/register/index.html"
  }

  async set_cookie(login_cookie) {
    const expiration = new Date(Date.now() + milliseconds_in_quarter_hour);
    document.cookie = `cookie=${login_cookie}; expires=${expiration.toUTCString()}; path=/`;
  }

  failed_connection() {
    alert("Connection failed - please try again");
  }

  async fetch_login(email, password) {
    return await fetch(api_address, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  async handle_login() {
    const { email, password } = this.state;
    if (!email || !password) {
      alert("Error - email or password missing");
    } else {
      const response = await this.fetch_login(email, password);

      switch (response.status) {
        case 401:
          this.wrong_credentials();
          break;
        case 200:
          this.login_successful(await response.json());
          break;
        case 502:
          this.failed_connection();
          break;
      }
    }
  }

  render() {
    return (
      <div className="LoginForm">
        <input
          name="email"
          type="text"
          placeholder = "email"
          value={this.state.email}
          onChange={this.handle_input_change}
          className="LoginFields"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handle_input_change}
          className="LoginFields"
        />
        <button
          type="button"
          name="loginButton"
          onClick={this.handle_login}
          className="LoginFields"
        >
          Login
        </button>
        <button
          type="button"
          name="registerButton"
          onClick={ () => {
            window.location.href = "http://localhost:2718/src/register/index.html";
          }}
          className="LoginFields"
        >
          Register
        </button>
      </div>
    );
  }
}