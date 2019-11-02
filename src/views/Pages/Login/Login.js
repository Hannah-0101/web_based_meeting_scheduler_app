import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import axios from 'axios';
import swal from 'sweetalert2';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // isLoading: false,
      email: "",
      password: ""
    };
    
  }


handleChange = (e, email) => {
  this.setState({
   email: e.target.value
   
 })
 console.log(e.target.value);
}


handleChangePassword = (e, password) => {
  this.setState({
    password: e.target.value
   
 })
 console.log(e.target.value);
}


  handleSubmit = async (event) => {
    console.log("hello");
    swal.showLoading()
    this.setState({ isLoading: true });
    // console.log(this.state.email)
    // console.log(this.state.password)
    event.preventDefault();
    var that=this;

    const response = await axios.get(`http://localhost/newcontact/filters.php?email=${this.state.email}&password=${this.state.password}`);
    // this.props.onSubmit(response.data);
    console.log(response.data)
    console.log(response.id)
    // this.title = response.data.name;
    const user_id = response.data.id;
    
    const title = response.data.title;
    const email = response.data.email;          
    const password1 = response.data.password;
    const first_name =response.data.first_name;
    const last_name =response.data.last_name;
    const other_name =response.data.other_name;
    const department = response.data.department;
    const created_at =response.data.created_at;
    
    const rank = response.data.rank;
    // const country=response.data.country;
    const image=response.data.image_tmp;

    console.log(email)

    if(email===undefined && password1===undefined){
    
      swal.fire("Oops","You have entered a wrong email or password","error")
      return
    }
    else{
      // this.setState({ isLoading: false });
      swal.close ()
      // swal.fire("Go","you have logged in sucessfully" ,"success")
   

      console.log("Logged In")
      window.localStorage.setItem('password1',password1)
      window.localStorage.setItem('user_id',user_id)
      window.localStorage.setItem('image',image)
      window.localStorage.setItem('first_name',first_name)
      window.localStorage.setItem('last_name',last_name)
      window.localStorage.setItem('other_name',other_name)
      window.localStorage.setItem('email',email)
      window.localStorage.setItem('department',department)
      window.localStorage.setItem('rank',rank)
      window.localStorage.setItem('title',title)
      window.localStorage.setItem('created_at',created_at)



      const path = '/Base/Forms'
      that.props.history.push(path);
      
    }
    this.setState({ password: '' , email:''});
    

  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }

// handleInputChange = (e, name) => {
//     this.setState({
//      [name]: e.target.value
     
//    })
//    console.log(e.target.value);
//   }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
        
          <Row className="justify-content-center">
            <Col md="8">
            <h1>Meeting Scheduler</h1>
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" onChange={ this.handleChange } placeholder="Email"  />
                        {/* <Input type="text" onChange={(e) => this.handleInputChange(e, 'input1')} placeholder="Email" /> */}
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" onChange={ this.handleChangePassword } placeholder="Password" />
                        {/* <Input type="password" onChange={(e) => this.handleChangePassword(e, 'input2')} placeholder="Password" autoComplete="current-password" /> */}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" type="submit" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0"><Link to="/forgotpassword">Forgot password?</Link></Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>This project is aimed at developing a scheduler for group meetings.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
