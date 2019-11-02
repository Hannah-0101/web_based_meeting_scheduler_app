import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import swal from 'sweetalert2';
import axios from 'axios';
// import { Auth } from "aws-amplify";

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      title: '',
      first_name: "",
      last_name: "",
      other_name: "",
      rank: "",
      file: null,
      department: "",
      email: "",
   

    
    };
    //image code starts here
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }

  //image code ends here

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
  handleChangedepartment = event => {
    let { dept, value } = event.target;
    this.setState({
      dept: value,
    });
    console.log(value)
  }

  //First Name

  handleChangeFirstName = (e, first_name) => {
    this.setState({
      first_name: e.target.value

    })
    //  console.log(e.target.value);
  }

  //Last Name

  handleChangeLastName = (e, last_name) => {
    this.setState({
      last_name: e.target.value

    })
    //  console.log(e.target.value);
  }

  //Others Name

  handleChangeOtherNames = (e, other_names) => {
    this.setState({
      other_names: e.target.value

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



  //Email

  handleChangeEmail = (e, email) => {
    this.setState({
      email: e.target.value

    })
    //  console.log(e.target.value);
  }

  handleSubmit = async event => {
    console.log("Check")
    console.log(this.state.first_name)
    console.log(this.state.last_name)
    console.log(this.state.other_names)
    console.log(this.state.rank)
    console.log(this.state.email)

    
    event.preventDefault();
    swal.showLoading()
    var that = this;
    this.setState({ isLoading: true });

    let file = this.state.file;

    // console.log(this.state.value)
    // if(this.refs.tits){
    //   console.log(this.refs.tits.value)
    // }

    // if(this.refs.depts){
    //   console.log(this.refs.depts.value)
    // }
    //  return

    let formData = new FormData();
    formData.append('first_name', this.state.first_name)
    formData.append('last_name', this.state.last_name)
    formData.append('other_name', this.state.other_names)
    formData.append('email', this.state.email)
    formData.append('rank', this.state.rank)
    formData.append('department', this.state.dept)
    // formData.append('department', "this.state.depa")
    formData.append('title', this.state.tits)
    // formData.append('title', "this.state.title")
    formData.append("avatar", file)

    axios({
      method: 'post',
      url: `http://localhost/newcontact/contactssignup.php`,
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
        swal.fire("Great", "Successfully Signed In", "success").then(result => {
          if (result.value) {
            that.props.history.push("/login");
          }//redirects you to the home page
        })

        console.log(response)

      })
      .catch(function (response) {
        //handle error
        swal.close ()
        console.log("hi")
        swal.fire("Oops", "All fields are required", "error")

      });

    this.setState({ isLoading: false });
  }


  render() {
    var styles2 = {
      margin: 'auto',
      width: '50%',
      padding: '10px'

    };
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="9">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted" >Create your account</p>

                    <Row>
                      <Col xs="12" sm="6">
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-star"></i>
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
                      <Col xs="12" sm="6">
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" onChange={this.handleChangeFirstName} required placeholder="First Name" />
                          {/* <Input autoFocus type="text" value={this.props.first_name}
                            onChange={this.handleChange} placeholder="First Name" /> */}
                        </InputGroup>
                      </Col>
                    </Row>


                    <Row>
                      <Col xs="12" sm="6">
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" onChange={this.handleChangeLastName} required placeholder="Last Name" />
                        </InputGroup>
                      </Col>
                      <Col xs="12" sm="6">
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" onChange={this.handleChangeOtherNames} required placeholder="Other Names" />
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
                          <Input type="select" name="select" id="select" required onChange={this.handleChangedepartment}>
                            <option value="0">Department</option>
                            <option value="Administration">Administration</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Sales">Sales</option>
                            <option value="PRO">Public Relation Officer</option>
                          </Input>
                        </InputGroup>
                      </Col>
                      <Col xs="12" sm="6">
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-star"></i>
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
                              <i className="icon-cloud-upload"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="file" name="image" className="file" required onChange={ this.onChange } />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Col xs="6" sm="6" style={styles2}>
                      <Button color="success" block>Create Account</Button>
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

export default Register;
