import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

// import usersData from './UsersData';
import './User.css'

class User extends Component {
  

  render() {
    const img = window.localStorage.getItem('image')
    const user_id = window.localStorage.getItem('user_id')
    const title = window.localStorage.getItem('title')
    const first_name = window.localStorage.getItem('first_name')
    const last_name = window.localStorage.getItem('last_name')
    const other_name = window.localStorage.getItem('other_name')
    const email = window.localStorage.getItem('email')
    const rank = window.localStorage.getItem('rank')
    const department = window.localStorage.getItem('department')
    

   

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={8} width={10}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Profile Details</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      <div className="container">
                      <td>
                        <img src={img}  alt="Avatar" className="image rounded"/>
                        <td className="overlay">
                         
                      <div className="text">
                          Name:  {title}<span>&nbsp;&nbsp;</span>{first_name}<span>&nbsp;&nbsp;</span>{other_name}<span>&nbsp;&nbsp;</span>{last_name}
                    <br/>
                    Email: {email}
                    <br/>
                    ID: {user_id}
                    <br/>
                    Rank:{rank}
                    <br/>
                    Department:{department}
                    </div>
                          
                        </td>
                      </td>
                   
                    </div> 
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
class ViewProfile extends React.Component{
  componentDidMount () {
    document.getElementById('password1').innerHTML = window.localStorage.getItem('password1')
    document.getElementById('user_id').innerHTML = window.localStorage.getItem('user_id')
    document.getElementById('title').innerHTML = window.localStorage.getItem('title')
    document.getElementById('first_name').innerHTML = window.localStorage.getItem('first_name')
    document.getElementById('last_name').innerHTML = window.localStorage.getItem('last_name')
    document.getElementById('other_name').innerHTML = window.localStorage.getItem('other_name')
    document.getElementById('email').innerHTML = window.localStorage.getItem('email')
    document.getElementById('rank').innerHTML = window.localStorage.getItem('rank')
    document.getElementById('department').innerHTML = window.localStorage.getItem('department')
    
    // document.getElementById('job').innerHTML = window.localStorage.getItem('image')
  }
  
  render() {
    return (
      <div className={'display-number'}>
        <p id={this.props.id} />
        <img src={this.props.image}/>
      </div>
    )
  }
  }

