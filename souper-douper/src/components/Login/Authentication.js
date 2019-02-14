import React from "react";
import axios from "axios";

const Authentication = App => Login => {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        isLoggedIn: false,
        token: null
      };
    }

    componentDidMount() {
      if (localStorage.getItem("token")) {
        this.setState({ isLoggedIn: true });
        this.setState({ token: localStorage.getItem("token") });
      }
    }

    handleUserLogin = e => {
      e.preventDefault();
      let loginCredentials = {
        email: e.target[0].value,
        password: e.target[1].value
      };
      axios
        .post(
          "https://soup-kitchen-backend.herokuapp.com/api/staff/login",
          loginCredentials
        )
        .then(res => {
          console.log(res.data);
          this.setState({ token: res.data.token });
          localStorage.setItem("token", res.data.token);
          this.setState({ isLoggedIn: true });
        })
        .catch(err => console.log(err));
    };

    handleUserRegistry = e => {
      e.preventDefault();
      let registryCredentials = {
        firstname: e.target[0].value,
        lastname: e.target[1].value,
        role: e.target[2].value,
        email: e.target[3].value,
        password: e.target[4].value
      };
      axios
        .post(
          "https://soup-kitchen-backend.herokuapp.com/api/staff/register",
          registryCredentials
        )
        .then(res => {
          console.log(res.data.message);
          this.setState({ token: res.data.token });
          localStorage.setItem("token", res.data.token);
          this.setState({ isLoggedIn: true });
        })
        .catch(err => console.log(err));
    };

    render() {
      if (this.state.isLoggedIn) {
        return <App />;
      } else {
        return (
          <Login
            handleUserLogin={this.handleUserLogin}
            handleUserRegistry={this.handleUserRegistry}
          />
        );
      }
    }
  };
};

export default Authentication;
