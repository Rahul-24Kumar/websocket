import React, { Component } from "react";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            role: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email, password, role } = this.state;
        console.log(email, password, role);
        fetch("http://localhost:4000/signup", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
                password,
                role
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
            });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label> Role </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Role"
                        onChange={(e) => this.setState({ role: e.target.value })}
                    />
                </div>


                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}