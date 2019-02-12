import React from "react";
import souperdoupertall from "../../images/souper-douper-lg.png";
import background from "../../images/background.jpeg";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeForm: "login"
    };
  }
  displayFormRegister = () => {
    this.setState({ activeForm: "register" });
  };
  displayFormLogin = () => {
    this.setState({ activeForm: "login" });
  };
  render() {
    return (
      <div
        className="login-wrapper"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="form-wrapper">
          {this.state.activeForm === "login" ? (
            <div className="login-form-container">
              <div className="login-img">
                <img
                  alt="souper douper title and logo"
                  src={souperdoupertall}
                />
                <form
                  className="login-form"
                  onSubmit={e => {
                    this.props.handleUserLogin(e);
                  }}
                >
                  <input type="text" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <button className="login-button" type="submit">
                    Log In
                  </button>
                  <button
                    type="button"
                    className="redirect-button"
                    onClick={this.displayFormRegister}
                  >
                    First Time Here? Click to Register
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="register-form-container">
              <div className="login-img">
                <img
                  alt="souper douper title and logo"
                  src={souperdoupertall}
                />
                <form
                  className="register-form"
                  onSubmit={e => {
                    this.props.handleUserRegistry(e);
                  }}
                >
                  <input type="text" placeholder="First Name" />
                  <input type="text" placeholder="Last Name" />
                  <input type="text" placeholder="Role" />
                  <input type="text" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <button className="login-button" type="submit">
                    Log In
                  </button>
                  <button
                    type="button"
                    className="redirect-button"
                    onClick={this.displayFormLogin}
                  >
                    Already Volunteering with Us? Log In Here
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
