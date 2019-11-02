

import React from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import swal from 'sweetalert2';
import {
  Button,Form,Card,Col,CardHeader } from 'reactstrap'
// import Login from '../../Pages/Login/Login';
// import Register from '../../Pages/Register/Register';
// import {browserHistory} from 'react-router'






class Popovers extends React.Component {
    constructor(props) {
        super(props);
        const bounce = window.localStorage.getItem('first_name')
  if(!bounce){
    
    this.props.history.push("/login");
  }
        this.state={
          scheduler_id: window.localStorage.getItem('user_id'),
        };
        console.log("hello")
        console.log(this.state.scheduler_id)
        Popovers.handleClick = Popovers.handleClick.bind(this);
        }

       
    
    //change theme
    getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTableBodyCell: {
            root: {
              backgroundColor: "white"
            }
          }
        }
      })

    componentWillMount() { }
    static handleClick(e) {
        alert("parent td#id: " + e.target.parentNode.id);
    }

    state = {
        data: []
    };
    componentDidMount() {
        axios
            .get(`http://localhost/newcontact/meeting/readmeeting.php?scheduler_id=${this.state.scheduler_id}`)
            .then(response => {
                this.setState({
                    data: response.data
                });
                console.log(response);
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    // handleChangeRank = (e, nn) => {
    //   this.setState({
    //     nn: e.target.value
  
    //   })
      //  console.log(e.target.value);
    // }

    handleSubmit = async event => {
      event.preventDefault();
      swal.showLoading()//call sweet alert loader onclick function
      
      console.log(event.target.meeting_name)
      // console.log(this.state.scheduler)
      // console.log(this.state.chairman)
      // console.log(this.state.agenda)
      // console.log(this.state.items)
      // console.log(this.state.names)
      // console.log(this.state.location)
      // console.log(this.state.date)
      // console.log(this.state.time_to)
      // console.log(this.state.time_from)
      var that = this;
      
      this.setState({ isLoading: true });
      
      
      let file = this.state.file;
      let formData = new FormData();
      formData.append('id', this.state.id) 
      formData.append('meeting_name', this.state.meeting_name)
      formData.append('scheduler', this.state.scheduler)
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
      
      
      axios.post('http://localhost/newcontact/meeting/updatemeeting.php', formData)
      
        .then((response) => {
          
          //handle success
          swal.close()//dismiss sweetalert loader after handle success
            swal.fire("Great","Meeting Details Updated Successfully","success").then(result=>{
              if(result.value){
                // that.props.history.push("/meeting");
              }//redirects you to the home page
           
      
      
      
        // const path = '/meeting'
        // that.props.history.push(path);
          })  
          console.log(response)
      
      })
      .catch(function (response) {
          //handle error
          console.log("hi")
            swal.fire("Oops","Try Again","error")   
            console.log(response);
      
           
      
      });
      
      this.setState({ isLoading: false });
      }

                // handleFormSubmit( event ) {
                //     event.preventDefault();
                //     window.localStorage.getItem("name")
                //     const path = '/register'
                //     this.props.history.push(path)

                // }
                // handleFormLogin( event ) {
                // event.preventDefault();

                // window.localStorage.getItem("name")
                // const path = '/Login'
                // this.props.history.push(path)

                // }
    render() {
      // <Col xs="12" sm="12">
      //       <Card>
      //         <CardHeader>
      //           <strong>Schedule a meeting</strong>
      //         </CardHeader>
      //         <Form onSubmit={this.handleSubmit} className="form-group " ></Form>
      //         </Card>
      // </Col>
        const columns = [
          // "meeting_name","chairman","scheduler","date", "time_from","time_to","room","location","agenda","names", "attendees",
          {
            name: "id",
            label: "Meeting ID",
            options: {
             filter: true,
             sort: true,
             

            }
           },
          
          
          {
            name: "meeting_name",
            label: "Meeting Name",
            options: {
             filter: true,
             sort: true,
             customBodyRender: (meeting_name, tableMeta, updateValue) => (
                <FormControlLabel
                //  onChange={this.handleChangeRank}
                  value={meeting_name}
                  control={<TextField value={meeting_name} />}
                  onChange={event => updateValue(event.target.meeting_name)}
                />
              )

            }
           },
            {
                name: "chairman",
                label: "Chairman",
                options: {
                 filter: true,
                 sort: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                      value={value}
                      control={<TextField value={value} />}
                      onChange={event => updateValue(event.target.value)}
                    />
                  )
 
 
                }
               },
               {
                name: "scheduler",
                label: "Scheduler",
                options: {
                 filter: true,
                 sort: true,
        
                 
                }
               },
               {
                name: "date",
                label: "Date",
                options: {
                 filter: true,
                 sort: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                      value={value}
                      control={<TextField value={value} />}
                      onChange={event => updateValue(event.target.value)}
                    />
                  )
 
 
                }
               },
               {
                name: "time_from",
                label: "From",
                options: {
                 filter: true,
                 sort: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                      value={value}
                      control={<TextField value={value} />}
                      onChange={event => updateValue(event.target.value)}
                    />
                  )
 
 
                }
               },
               {
                name: "time_to",
                label: "To",
                options: {
                 filter: true,
                 sort: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                   
                      value={value}
                      control={<TextField value={value} />}
                      onChange={event => updateValue(event.target.value)}
                    />
                  )
 
 
                }
               },
               {
               name: "room",
               label: "Room",
               options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                      value={value}
                      control={<TextField value={value} />}
                      onChange={event => updateValue(event.target.value)}
                    />
                  )
 
 
               }
              },
              {
                name: "location",
                label: "Location",
                options: {
                 filter: true,
                 sort: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                      value={value}
                      control={<TextField value={value} />}
                      onChange={event => updateValue(event.target.value)}
                    />
                  )
 
 
                }
               },
               {
                name: "agenda",
                label: "Agenda",
                options: {
                 filter: true,
                 sort: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                      value={value}
                      control={<TextField value={value} />}
                      onChange={event => updateValue(event.target.value)}
                    />
                  )
 
 
                }
               },
               {
                name: "names",
                label: "Emails of Attendees",
                options: {
                 filter: true,
                 sort: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                      value={value}
                      control={<TextField value={value} />}
                      onChange={event => updateValue(event.target.value)}
                    />
                  )
 
 
                }
               },
               {
                name: "attendees",
                label: "Name of Attendees",
                options: {
                 filter: true,
                 sort: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                      value={value}
                      control={<TextField value={value} />}
                      onChange={event => updateValue(event.target.value)}
                    />
                    
                  )
                  
 
 
                }
               },
               {
                name: "Edit",
                options: {
                  filter: true,
                  sort: false,
                  empty: true,
                  customBodyRender: (value, tableMeta,) => {
                    return (
                      <button onClick={this.handleSubmit}>
                        Update
                      </button>
                    );
                  }
                }
              },
             
           
               
            
              // <button onClick={() => this.handleSubmit(`Clicked "Edit" for row ${tableMeta.rowIndex}`)>
              // <button onClick={this.handleSubmit}>
            
            
        ];
        //const action = <Button onClick={Tables.handleClick}>Action</Button>; /* <-- action button */
        const data = this.state.data;
        const options = {
            filterType: "dropdown",
            responsive: "stacked",
            selectableRows: false //clears the checkboxes from default theme

            /*  customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} />*/
        };

        return (
          
            <div className="report-view data-table-wrapper">
              <Col xs="16" sm="16">
            <Card>
              <CardHeader>
                <strong>Update a meeting</strong>
              </CardHeader>
              {/* <Form onSubmit={this.handleSubmit} className="form-group " > */}

          <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                    title={"Update Meeting"}
                    data={data}
                    columns={columns}
                    options={options}
                />
                </MuiThemeProvider>
                <div className="form-actions">
                    <Button type="submit" color="primary"> Submit </Button>
                  </div>
                  {/* <div className="glory">
                 <input type="submit" onClick={e => this.handleFormSubmit(e)} value="register" />
                 <input type="submit" onClick={e => this.handleFormLogin(e)} value="login" />
                </div>
                <Register/> */}
                 {/* </Form> */}
              </Card>
      </Col>
            </div>
        );
    }
}

 export default Popovers;
























// import React, { Component } from 'react';
// import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

// class Tables extends Component {
//   render() {
//     return (
//       <div className="animated fadeIn">
//         <Row>
//           <Col xs="12" lg="6">
//             <Card>
//               <CardHeader>
//                 <i className="fa fa-align-justify"></i> Simple Table
//               </CardHeader>
//               <CardBody>
//                 <Table responsive>
//                   <thead>
//                   <tr>
//                     <th>Username</th>
//                     <th>Date registered</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                   </tr>
//                   </thead>
//                   <tbody>
//                   <tr>
//                     <td>Samppa Nori</td>
//                     <td>2012/01/01</td>
//                     <td>Member</td>
//                     <td>
//                       <Badge color="success">Active</Badge>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Estavan Lykos</td>
//                     <td>2012/02/01</td>
//                     <td>Staff</td>
//                     <td>
//                       <Badge color="danger">Banned</Badge>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Chetan Mohamed</td>
//                     <td>2012/02/01</td>
//                     <td>Admin</td>
//                     <td>
//                       <Badge color="secondary">Inactive</Badge>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Derick Maximinus</td>
//                     <td>2012/03/01</td>
//                     <td>Member</td>
//                     <td>
//                       <Badge color="warning">Pending</Badge>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Friderik Dávid</td>
//                     <td>2012/01/21</td>
//                     <td>Staff</td>
//                     <td>
//                       <Badge color="success">Active</Badge>
//                     </td>
//                   </tr>
//                   </tbody>
//                 </Table>
//                 <Pagination>
//                   <PaginationItem>
//                     <PaginationLink previous tag="button"></PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem active>
//                     <PaginationLink tag="button">1</PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationLink tag="button">2</PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationLink tag="button">3</PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationLink tag="button">4</PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationLink next tag="button"></PaginationLink>
//                   </PaginationItem>
//                 </Pagination>
//               </CardBody>
//             </Card>
//           </Col>
{/* 
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Striped Table
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Yiorgos Avraamu</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Avram Tarasios</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Quintin Ed</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Enéas Kwadwo</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Agapetus Tadeáš</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col> */}
        // </Row>

        {/* <Row> */}

          {/* <Col xs="12" lg="6"> */}
            {/* <Card> */}
              {/* <CardHeader>
                <i className="fa fa-align-justify"></i> Condensed Table
              </CardHeader> */}
              {/* <CardBody> */}
                {/* <Table responsive size="sm">
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Carwyn Fachtna</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Nehemiah Tatius</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Ebbe Gemariah</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Eustorgios Amulius</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Leopold Gáspár</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table> */}
                {/* <Pagination>
                  <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
              {/* </CardBody> */}
            {/* </Card> */}
          {/* </Col> */}

         {/* <Col xs="12" lg="6"> */}
            {/* <Card> */}
                 {/* <CardHeader>
               <i className="fa fa-align-justify"></i> Bordered Table
             </CardHeader> */}
              {/* <CardBody> */}
                {/* <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Pompeius René</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Paĉjo Jadon</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Micheal Mercurius</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Ganesha Dubhghall</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Hiroto Šimun</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table> */}
                {/* <Pagination>
                  <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
              {/* </CardBody> */}
            {/* </Card> */}
          {/* </Col> */}

        {/* </Row> */}

        {/* <Row>
          <Col>
            <Card> */}
              {/* <CardHeader>
                <i className="fa fa-align-justify"></i> Combined All Table
              </CardHeader> */}
              {/* <CardBody> */}
                {/* <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Vishnu Serghei</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Zbyněk Phoibos</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Einar Randall</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Félix Troels</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Aulus Agmundr</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table> */}
                {/* <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav> */}
              {/* </CardBody> */}
            {/* </Card>
          </Col>
        </Row> */}
//       </div>

//     );
//   }
// }

// export default Tables;
