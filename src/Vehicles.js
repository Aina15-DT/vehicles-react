import React, { Component } from 'react';
import './Vehicles.css';
import volvo1 from './images/volvo1.jpeg';
import volvo2 from './images/volvo2.jpeg';
import mazda1 from './images/mazda1.jpeg';
import mazda2 from './images/mazda2.jpeg';
import volks1 from './images/volks1.jpeg';
import volks2 from './images/volks2.jpeg';

const inputs = {
    inputable: "disabled",
    logged: 0,
    text: ""
}

const auth = {
    user: "yves",
    password: "yves",
}

//FORM CSS

const appStyle = {
    height: '250px',
    display: 'flex'
};

const formStyle = {
    margin: 'auto',
    padding: '10px',

    borderRadius: '5px',

    width: '220px',
    display: 'block'
};

const labelStyle = {
    margin: '10px 0 5px 0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px',
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%',
    fontSize: '15px',
    color: 'white',
    display: 'block'
};

//end  FORM CSS

//LOGIN FORM UTILS

const Field = React.forwardRef(({ label, type }, ref) => {
    return (
        <div>
            <label style={labelStyle} >{label}</label>
            <input ref={ref} type={type} placeholder="yves" style={inputStyle} />
        </div>
    );
});

const Form = ({ onSubmit }) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
        <form style={formStyle} onSubmit={handleSubmit} >
            <Field ref={usernameRef} label="Username:" type="text" />
            <Field ref={passwordRef} label="Password:" type="password" />
            <div>
                <button style={submitStyle} type="submit" data-bs-dismiss="modal">Submit</button>
            </div>


        </form>
    );
};


// end LOGIN FORM UTILS


//Main Class
class Vehicles extends Component {

    constructor(props) {
        super(props);
        this.state = {

            modalv: "modal",
            loginState: 'Login',
            loginbtnclass: 'btn btn-outline-success',
            car: [{
                pic: volvo1,
                carname: 'volvo',
            },

            {
                pic: volks1,
                carname: 'volkswagen',
            },
            {
                pic: mazda1,
                carname: 'mazda',
            },
            {
                pic: volvo2,
                carname: 'volvo',
            },

            {
                pic: volks2,
                carname: 'volkswagen',
            },
            {
                pic: mazda2,
                carname: 'mazda',
            },
            ],


        };
    }


    render() {

        let car = this.state.car;
        car = car.map((char, index) => {
            return <Car char={char}
                key={index}
            />;
        });

        const handleSubmit = data => {
            const json = data

            if (inputs.logged == 0) {
                if (json.username == auth.user && json.password == auth.password) {

                    this.setState({ loginState: "Logout" })
                    this.setState({ loginbtnclass: "btn btn-outline-danger" })
                    this.setState({ modalv: "" })
                    inputs.inputable = ""
                    inputs.logged = 1

                    console.log(inputs.logged);
                } else {
                    console.log("credential error");
                }
            }


        };
        return (
            <>
                <div className="container" >
                    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                        <div className="container-fluid" >
                            <a className="navbar-brand"
                                href="#" > CarBook
                            </a>
                            <div className="d-flex">
                                <button class={this.state.loginbtnclass} data-bs-toggle={this.state.modalv} data-bs-target="#loginmodal">{this.state.loginState}</button>
                            </div>
                        </div>
                    </nav>
                    <div className="d-flex" >
                        <center>
                            <div className="container-fluid" >
                                <div className="container border" >
                                    <div className="row" > {car}
                                    </div>
                                </div>
                            </div>
                        </center>
                    </div>
                </div >
                <div className="modal fade" id="loginmodal" tabindex="-1" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div >
                                <Form onSubmit={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

//end MAIN CLASS

//CAR VIEWER CLASS
class Car extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            emailField: '',
            buttonPushed: false
        };
    }
    handleChange = (e) => {
        this.setState({ emailField: e.target.value });
    }

    buttonPushedHandler = () => {
        this.setState({ buttonPushed: true });
    }

    render() {

        let emailStats = null;
        if (this.state.buttonPushed) {
            emailStats = (<h5>{this.state.emailField}</h5>);
        }

        return (
            <>
                <div className="col-6 col-md-4" >
                    <div className="card">
                        <img src={this.props.char.pic}
                            className="card-img-top"
                            alt="..." />
                        <div className="card-body" >
                            <p className="card-text" ><span className="car-name" > {this.props.char.carname} </span></p>
                            <p className="card-title" >   {emailStats}</p><br />

                            <input type="text" disabled={inputs.inputable} name="" id="" onChange={this.handleChange} /> <br />
                            <button onClick={this.buttonPushedHandler} className="btn btn-primary" > Comment</button>


                        </div>
                    </div>
                </div>
            </>
        );
    }
}
//end CAR VIEWER CLASS

export default Vehicles;