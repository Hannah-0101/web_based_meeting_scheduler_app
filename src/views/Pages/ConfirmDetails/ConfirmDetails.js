
import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import swal from 'sweetalert2';
import axios from 'axios';

export default class ConfirmDetails extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            meeting_id: window.localStorage.getItem('meeting_id'),
          isLoading: false,
          title: '',
          name: "",
          rank: "",
          email: "",
          status:'',
          
    
       
    
        
        };
        //image code starts here
    
      }
      handleSubmit = async event => {
        console.log("Check")
        console.log(this.state.meeting_id)
        console.log(this.state.title)
        console.log(this.state.rank)
        console.log(this.state.name)
        console.log(this.state.email)
        console.log(this.state.status)
    
        
        event.preventDefault();
        swal.showLoading()
        var that = this;
        this.setState({ isLoading: true });
    
    
        let formData = new FormData();
        formData.append('meeting_id', this.state.meeting_id)
        formData.append('title', this.state.tits)
        formData.append('rank', this.state.rank)
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('status', this.state.dept)
        // formData.append('department', "this.state.depa")
        
    
        axios({
          method: 'post',
          url: `http://localhost/newcontact/attendee.php`,
          data: formData,
          config: {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }
        })
          // .then(function (response) {
          .then((response) => {
            //handle success
            swal.close ()
            swal.fire("Thank You", "For accepting and confirming your details for the upcoming meeting", "success")
            // .then(result => {
            //   if (result.value) {
            //     that.props.history.push("/login");
            //   }//redirects you to the home page
            // })
    
            console.log(response)
    
          })
          .catch(function (response) {
            //handle error
            swal.close ()
            console.log("hi")
            swal.fire("Try Again", "All fields are required", "error")
    
          });
          this.setState({ isLoading: false });
        }
        
  validateForm() {
    return (
      // this.state.title.length > 0 &&
      this.state.email.length > 0 &&
      this.state.first_name.length > 0 &&
      this.state.last_name.length > 0 &&
      this.state.other_name.length > 0 &&
      // this.state.rank.length > 0 &&
      // this.state.department.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleChangetitle = event => {
    let { tits, value } = event.target;
    this.setState({
      tits: value,
    });
    console.log(value)
  }
  handleChangeStatus = event => {
    let { dept, value } = event.target;
    this.setState({
      dept: value,
    });
    console.log(value)
  }
  
  //First Name

  handleChangeName = (e, name) => {
    this.setState({
      name: e.target.value

    })
    //  console.log(e.target.value);
  }
  //Rank

  handleChangeRank= (e, rank) => {
    this.setState({
      rank: e.target.value

    })
    //  console.log(e.target.value);
  }

  handleChangeEmail = (e, email) => {
    this.setState({
      email: e.target.value

    })
    //  console.log(e.target.value);
  }
  handleChangeId = (e, meeting_id) => {
    this.setState({
      meeting_id: window.localStorage.getItem('meeting_id')
     
   })
   console.log(e.target.value);
  }
  
      
        
  render() {
    var styles2 = {
        margin: 'auto',
        width: '50%',
        padding: '10px'
    }
    return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="9">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Confirm Your Details</h1>
                      <p className="text-muted" >Please enter your details to confirm/decline attendance</p>
  
                      <Row>
                        <Col xs="12" sm="6">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-star"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" onChange={ this.handleChangeId } name="meeting_id"  placeholder=" Meeting_id" />
                            {/* <Input onChange={ this.handleChangeId } name="meeting_id" style={{display:"none"}} type="text"/> */}
                          </InputGroup>
                        </Col>
                        <Col xs="12" sm="6">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                              <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" name="select" id="select" onChange={this.handleChangetitle}  required>
                              <option value="Title">Title</option>
                              <option value="Mr">Mr</option>
                              <option value="Mrs">Mrs</option>
                              <option value="Miss">Miss</option>
                              <option value="Doctor">Doctor</option>
                              <option value="Professor">Professor</option>
                            </Input>
                          </InputGroup>
                        </Col>
                      </Row>
  
                      <Row>
                        <Col xs="12" sm="6">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-star"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" onChange={this.handleChangeName} required placeholder=" Name" />
                          </InputGroup>
                        </Col>
                        <Col xs="12" sm="6">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" onChange={this.handleChangeRank} required placeholder="Rank" />
                          </InputGroup>
                        </Col>
                      </Row>
  
                      <Row>
                        <Col xs="12" sm="6">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-envelope-letter"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="email" onChange={this.handleChangeEmail} required placeholder="Email" />
                          </InputGroup>
                        </Col>
                        <Col xs="12" sm="6">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-cloud-icon"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" name="select" id="select" onChange={this.handleChangeStatus}  required>
                            <option value="Decision" >Decision?</option>
                              <option value="Accept">Accept</option>
                              <option value="Decline">Decline</option>
                            </Input>
                          </InputGroup>
                        </Col>
                      </Row>
                      <Col xs="6" sm="6" style={styles2}>
                        <Button color="success" block>Confirm</Button>
                      </Col>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
  }
}


class ViewProfile extends React.Component{
    componentDidMount () {
      
      document.getElementById('meeting_id').innerHTML = window.localStorage.getItem('meeting_id')
      
      // document.getElementById('job').innerHTML = window.localStorage.getItem('image')
    }
    
    render() {
      return (
        <div className={'display-number'}>
          <p id={this.props.id} />
         
        </div>
      )
    }
    }