import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, } from 'reactstrap';
import PropTypes from 'prop-types';

import {   AppSidebarToggler } from '@coreui/react';

// import logo from '../../assets/img/brand/logo.svg'
// import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
// const img = window.localStorage.getItem('image')


class DefaultHeader extends Component {

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    var styles2 = {
      float: 'right'
    };
    const img = window.localStorage.getItem('image')
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <h3>Makedu Consult</h3>
        <AppSidebarToggler style={styles2} className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav direction="down">
            
            <DropdownToggle nav>
              <img src={img} className="img-avatar sm" alt="profile pic" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem ><i className="fa fa-user"></i>View Profile</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;

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

