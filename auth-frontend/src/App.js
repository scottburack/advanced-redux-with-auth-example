import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import { connect } from "react-redux";
import { getCurrentUser, logOutUser, loginUser } from "./actions/user";
import { getLocation } from "./actions/location";
import authorize from "./authorize";

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("jwt")) {
      this.props.getCurrentUser();
    }
  }

  render() {
    const AuthLoginForm = authorize(LoginForm);
    const AuthProfile = authorize(Profile);
    console.log(this.props);
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                {this.props.usersReducer.loading
                  ? "Downloading Internet.."
                  : this.props.usersReducer.username}
              </div>
            )}
          />
          <Route exact path="/map" render={() => <div>Mapppppppp</div>} />
          <Route exact path="/profile" component={AuthProfile} />
          <Route
            exact
            path="/login"
            render={props => <AuthLoginForm onSubmit={this.logIn} {...props} />}
          />
          <Redirect to="/" />
        </Switch>
        {this.props.usersReducer.loading ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              backgroundColor: "#3E3"
            }}
          >
            ...Fetching User...
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer, locationReducer }) => ({
  usersReducer,
  locationReducer
});

export default withRouter(
  connect(mapStateToProps, {
    getCurrentUser,
    getLocation,
    logOutUser,
    loginUser
  })(App)
);

//
