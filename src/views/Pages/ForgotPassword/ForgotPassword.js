import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import axios from 'axios';
import swal from 'sweetalert2';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
       
          email: "",
       
        };
      }
      validateCodeForm() {
        return this.state.email.length > 0;
      }
    
  
          
      handleChange = (e, email) => {
        this.setState({
        email: e.target.value
        
      }) 
     };
 

handleSubmit = async (event) => {
  //console.log(this.state.email)
  // console.log(this.state.password)
  event.preventDefault();
  swal.showLoading()
  var that=this;

  const response = await axios.get(`http://localhost/newcontact/forgotpassword.php?email=${this.state.email}`);
  // this.props.onSubmit(response.data);
  console.log(response.data)
  const email = response.data.email;          

  console.log(email)

  if(!response.data.includes(this.state.email)){

    swal.close ()
    swal.fire("Oops","You have entered a wrong email or password","error")
    return

  }
  else{
    swal.close()
    // this.setState({ isLoading: false });
    swal.fire("Good job","Check your email for your password","success")
    

    console.log("Logged In")

    // window.localStorage.setItem('image',image)

    const path = '/login'
    that.props.history.push(path);
    
  }
  this.setState({ password: '' , email:''});
  

};




    render() {
 
  var styles2 = {
    float: 'right'
  };

        return (
          <div className="app flex-row align-items-center">
          <Container>
         
            <Row className="justify-content-center">
              <Col md="6">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                    
                      <Form onSubmit={this.handleSubmit}>
                        <h1>Forgot Password</h1>
                        <p className="text-muted">Input your Email to request for a new password</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-envelope-letter"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" value={this.props.email} onChange={ this.handleChange } placeholder="Email"  
/>
                        </InputGroup>
                        <Row>
                          <Col>
                            <Button style={styles2} color="primary" type="submit" className="px-4">Submit</Button>
                          </Col>
                        </Row>
                      </Form>
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
