import React, { Component } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ReactDOM from "react-dom";
import axios from 'axios';
import swal from 'sweetalert2';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import "./Dashboard.css";
// import "./styles.css";

class Dashboard extends Component {
  // var 

  constructor(props){
    super(props);
    const bounce = window.localStorage.getItem('first_name')
  if(!bounce){
    
    this.props.history.push("/login");
  }
  this.state = {
    

  
    // items: [],
    // value: "",
    // error: null,
    // valu: "",
    // emails: [],
    // value={window.localStorage.getItem('user_id')}

    // selectedDate:'2014-08-18',
  
    for: window.localStorage.getItem('user_id'),
    first_name: window.localStorage.getItem('first_name'),
    meeting_name:'',
    scheduler: '',
    scheduler_id:'',
    chairman: '',
    date: '',
    from: '',
    to: '',
    id: '',
    // time: '',
    room: '',
    location:'',
    agenda:'',
    time_to:'2014-08-18',
    time_from:'',
    file: null ,
    items: [],
    value: "",
    error: null,
    
    valu: "",
    emails: []
    
  };
  
  
  this.onChange = this.onChange.bind(this)
  // this.handleDateChange=this.handleDateChange.bind(this)
}

onChange(e){
    this.setState({file:e.target.files[0]})
}


 

handleChange = event => {
this.setState({
  [event.target.id]: event.target.value
});
}

handleChangePassword = (e, password) => {
  this.setState({
    password: window.localStorage.getItem('user_id')
   
 })
 console.log(e.target.value);
}

handleSubmit = async event => {
event.preventDefault();
swal.showLoading()//call sweet alert loader onclick function
console.log(this.state.password)
console.log(this.state.for)
console.log(this.state.first_name)
console.log(this.state.meeting_name)
console.log(this.state.chairman)
console.log(this.state.agenda)
console.log(this.state.items)
console.log(this.state.names)
console.log(this.state.location)
console.log(this.state.date)
console.log(this.state.time_to)
console.log(this.state.time_from)
var that = this;

// this.setState({ isLoading: true });


let file = this.state.file;
let formData = new FormData();
formData.append('id', this.state.id)
formData.append('meeting_name', this.state.meeting_name)
formData.append('scheduler_id', this.state.for)
formData.append('scheduler', this.state.first_name)
 formData.append('chairman', this.state.chairman)
 formData.append('agenda', this.state.agenda)
formData.append('attendees', this.state.items)
formData.append('location', this.state.location)
formData.append('date', this.state.date) 
formData.append('time_to', this.state.time_to)
formData.append('time_from', this.state.time_from)
formData.append('room', this.state.room)
formData.append('names', this.state.emails)
// formData.append('room', this.refs.room.value)
formData.append("avatar",file)


axios.post('http://localhost/newcontact/meetingscheduler.php', formData)

  .then((response) => {
    
    //handle success

    swal.close()//dismiss sweetalert loader after handle success
    var substring = "Room is not available"
    // var mainstring = JSON.stringify(response);
    // if(mainstring.includes(substring)){
    //   swal.fire("Sorry","Sorry, room is not available","error").then(result=>{

    //   })  
    // }
    // else{
    //   swal.fire("Great","Meeting Booked Successfully","success").then(result=>{

    //   })
    // }
    console.log('before')
    console.log(response)
    console.log('after')

})
.catch(function (response) {
    //handle error
    console.log("hi")
      swal.fire("Oops","Try Again","error")  
      console.log('before not good') 
      console.log(response);
      console.log('after not good')
     
});

this.setState({ isLoading: false });
}

handleConfirmationSubmit = async event => {
event.preventDefault();

this.setState({ isLoading: true });

}

  handleChang = evt => {
    this.setState({
      valu: evt.target.value
    });
  };

  handleKeyDow = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var email = this.state.valu.trim();

      if (email) {
        this.setState({
          emails: [...this.state.emails, email],
          valu: ""
        });
      }
    }
  };

  handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ""
        });
      }
    }
  };

  handleChange = evt => {
    this.setState({
      value: evt.target.value,
      error: null
    });
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    });
  };

  handleDeleteNames = email => {
    this.setState({
      emails: this.state.emails.filter(i => i !== email)
    });
  };

  handlePaste = evt => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter(email => !this.isInList(email));

      this.setState({
        items: [...this.state.items, ...toBeAdded]
      });
    }
  };

  isValid(email) {
    let error = null;

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isInList(email) {
    return this.state.items.includes(email);
  }

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  handleDeleteNames = email => {
    this.setState({
      emails: this.state.emails.filter(i => i !== email)
    });
  };

  handleDateChange = date => {
    this.setState({
      date: this.state.date.filter(i => i !== date)
    });
  
  };
  // handleDateChange = date => {
  //   setSelectedDate(date);
  // };

  


  render() {
    
    return (
      <div className="animated fadeIn">
        {/* <div>
        <ViewProfile id='user_id' /> 
        </div> */}
        <Row>

          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Schedule a meeting</strong>
              </CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit} className="form-group " >
            <Row>
            <Col xs="6">
                <FormGroup>
                  <Input onChange={ this.handleChangePassword } name="scheduler_id" style={{display:"none"}} type="text"/>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  {/* <Label htmlFor="company">Scheduled By</Label> */}
                  <Input onChange={e => this.setState({ scheduler: e.target.window.localStorage.getItem('first_name') })} name="scheduler" style={{display:"none"}} type="text"   />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Name of meeting</Label>
                  <Input onChange={e => this.setState({ meeting_name: e.target.value })} name="meeting_name" type="text" placeholder="Enter meeting title" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Chaired By</Label>
                  <Input onChange={e => this.setState({ chairman: e.target.value })} type="text" />
                </FormGroup>
              </Col>
              
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Date of meeting</Label>
                  <Input onChange={e => this.setState({ date: e.target.value })} name="date" type="date" placeholder="Date" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Time of meeting:From</Label>
                  <Input onChange={e => this.setState({ time_from: e.target.value })} type="time"  name="time_from" placeholder="From"/>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Time of meeting:To</Label>
                  <Input onChange={e => this.setState({ time_to: e.target.value })} type="time"  name="time_to" placeholder="To" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Location</Label>
                  <Input onChange={e => this.setState({ location: e.target.value })} type="text" placeholder="Location" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Room</Label>
                  <Input onChange={e => this.setState({ room: e.target.value })} type="text" placeholder="Room Number" />
                </FormGroup>
              </Col>
            </Row>

                <FormGroup>
                  <Label htmlFor="company">Upload File</Label>
                  <Input onChange={this.onChange} type="file" />
                </FormGroup>

              <FormGroup row>
              <Col md="3">
                      <Label htmlFor="textarea-input">Agenda</Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Input onChange={e => this.setState({ agenda: e.target.value })} type="textarea" id="textarea-input" rows="6"
                             placeholder="Agenda of meeting..." />
                    </Col>
              </FormGroup>

              {this.state.items.map(item => (
          <div className="tag-item" key={item}>
            {item}
            <button
              type="button"
              className="button"
              onClick={() => this.handleDelete(item)}
            >
              &times;
            </button>
          </div>
        ))}

        <Input
          className={"input " + (this.state.error && " has-error")}
          value={this.state.value}
          placeholder="Type or paste attendees name  and press `Enter`..."
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onPaste={this.handlePaste}
        />
<br/>
{this.state.emails.map(email => (
          <div className="tag-item" key={email}>
            {email}
            <button
              type="button"
              className="button"
              onClick={() => this.handleDeleteNames(email)}
            >
              &times;
            </button>
          </div>
        ))}

        <Input
          className={"input " + (this.state.error && " has-error")}
          placeholder="Type or paste email addresses and press `Enter`"
          value={this.state.valu}
          onChange={this.handleChang}
          onKeyDown={this.handleKeyDow}
        />
        <br/>
                 {this.state.error && <p className="error">{this.state.error}</p>} 
                  <div className="form-actions">
                    <Button type="submit" color="primary"> Submit </Button>
                  </div>

                      </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Dashboard;

// class ViewProfile extends React.Component{
//   componentDidMount () {
    
//     document.getElementById('user_id').innerHTML = window.localStorage.getItem('user_id')
//     document.getElementById('first_name').innerHTML = window.localStorage.getItem('first_name')
//     document.getElementById('last_name').innerHTML = window.localStorage.getItem('last_name')
//     document.getElementById('other_name').innerHTML = window.localStorage.getItem('other_name')
    
//     // document.getElementById('job').innerHTML = window.localStorage.getItem('image')
//   }
  
//   render() {
//     return (
//       <div className={'display-number'}>
//         <p id={this.props.id} />
       
//       </div>
//     )
//   }
//   }
