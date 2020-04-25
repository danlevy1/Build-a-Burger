import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

const Auth = ({
    buidlingBurger,
    authRedirectPath,
    onSetAuthRedirectPath,
    onAuth,
    loading,
    error,
    isAuthenticated,
}) => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Email",
            },
            value: "",
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Password",
            },
            value: "",
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        },
    });

    const [isSignup, setIsSignup] = useState(true);

    useEffect(() => {
        if (!buidlingBurger && authRedirectPath !== "/") {
            onSetAuthRedirectPath();
        }
    }, [buidlingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedauthForm = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true,
            }),
        });

        setAuthForm(updatedauthForm);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        onAuth(authForm.email.value, authForm.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setIsSignup((prevState) => !prevState);
    };

    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key],
        });
    }

    let form = <Spinner />;
    if (!loading) {
        form = formElementsArray.map((formElement) => {
            return (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                />
            );
        });
    }

    let errorMessage = null;
    if (error) {
        errorMessage = <p>{error.message}</p>;
    }

    let authRedirect = null;
    if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />;
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>{isSignup ? "Sign Up" : "Sign In"}</Button>
            </form>
            <Button btnType='Danger' clicked={switchAuthModeHandler}>
                Switch to {isSignup ? "Sign In" : "Sign Up"}
            </Button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buidlingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
