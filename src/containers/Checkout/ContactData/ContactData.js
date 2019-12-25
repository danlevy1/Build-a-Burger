import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import classes from "./ContactData.module.css";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    };

    orderHandler = event => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Dan",
                address: {
                    street: "test street",
                    zipCode: "38562",
                    country: "US"
                },
                email: "test@test.com"
            },
            deliveryMethod: "fastest"
        };
        axios.post("/orders.json", order)
        .then(response => {
            this.setState({ loading: false });
            this.props.history.push("/");
        })
        .catch(error => {
            this.setState({ loading: false });
            console.log(error);
        });
        event.preventDefault();
        console.log(this.props.ingredients);
    };

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
                <input
                    className={classes.Input}
                    type='email'
                    name='email'
                    placeholder='Your Email'
                />
                <input
                    className={classes.Input}
                    type='text'
                    name='Street'
                    placeholder='Your Street'
                />
                <input
                    className={classes.Input}
                    type='text'
                    name='postal'
                    placeholder='Your Postal Code'
                />
                <Button btnType='Success' clicked={this.orderHandler}>
                    ORDER
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Info</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;