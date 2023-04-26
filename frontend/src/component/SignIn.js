import React from "react";

export const SignIn = _ => {
    return(
        <section className="signin-form">
            <h1 className="title">SIGN IN</h1>
            <div className="form-floating">
                <input type="text" className="form-control" id="username" placeholder="username" />
                <label for="floatingInput">Username/Email Address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="password" placeholder="password" />
                <label for="floatingInput">Password</label>
            </div>
            <div className="checkbox mb-3">
                <input type="checkbox" value="remember-me" /> Remember me for the next 7 days
            </div>
            <div>
                <button className="btn-lg" >Sign In</button>
            </div>
            <div className="forgot-password">
                <a href="#forgotpassword" >Forgot password?</a>
            </div>
        </section>
    );
};