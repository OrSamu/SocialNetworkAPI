const SignupApiAddress = "/api/users/signup";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
    };
    this.handle_input_change = this.handle_input_change.bind(this);
    this.handle_registration = this.handle_registration.bind(this);
    this.handle_registration_response = this.handle_registration_response.bind(this);
  }

  handle_input_change(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  async create_account(fullName, email, password) {
    const response = await fetch(SignupApiAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email: email,
        password: password,
      }),
    });
    console.log(response);
    console.log(response.status);
  }

  handle_registration_response(status) {
    switch (status) {
      case 200:
        window.location.href = "http://localhost:2718";
        break;
      case 400:
        alert("Fill all the credentials")
        break;
      case 403:
        alert("This email is already being used");
        break;
      case 502:
        alert("Process failed please try again!");
        break;
    }
  }

  check_input(fullName, email, password) {
    if(!fullName || !email || !password) return false
    return true;
  }

  handle_registration() {
    try {
      const { fullName, email, password } = this.state;
      if (this.check_input(fullName, email, password)) {
        const response = this.create_account(fullName, email, password);
        this.handle_registration_response(response.status);
      } else {
        alert("Fill all the credentials");
      }
    } catch (error) {
      console.log(`Error while registering - ${error}`);
    }
  }

  render() {
    return (
      <div>
        <div className="header">
          <img src="../../../resources/logo.png" ></img>
        </div>
        <div className="body">
          <h3>Registration</h3>
          <input
            name="fullName"
            type="text"
            placeholder="Full Name..."
            value={this.state.fullName}
            onChange={this.handle_input_change}
            className="registerFields"
          />
          <input
            name="email"
            type="text"
            placeholder="Email..."
            value={this.state.email}
            onChange={this.handle_input_change}
            className="registerFields"
          />
          <input
            name="password"
            type="password"
            placeholder="Password..."
            value={this.state.password}
            onChange={this.handle_input_change}
            className="registerFields"
          />
          <button
            type="button"
            name="registerButton"
            className="registerFields"
            onClick={this.handle_registration}
          >
            Register!
          </button>
        </div>
      </div>
    );
  }
}
