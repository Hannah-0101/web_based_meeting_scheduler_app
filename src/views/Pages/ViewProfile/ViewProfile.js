import React, { Component } from 'react';
import { Nav, NavItem,Card,CardBody ,Button,NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
// import Modal from '@trendmicro/react-modal';
// import '@trendmicro/react-modal/dist/react-modal.css';
// import classNames from 'classnames';
// import { AppSwitch } from '@coreui/react'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Profile extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
          {/* <Modal showOverlay={false}>
    <Modal.Header>
        <Modal.Title>
            Profile
        </Modal.Title>
    </Modal.Header>
    <Modal.Body> */}
      <Card>
        <CardBody>

        

      
      
           <ViewProfile id='user_id' />
                      <ViewProfile id='title' />
                      <ViewProfile id='password1' />
                  
                       <ViewProfile id='first_name' />
                       <ViewProfile id='other_name' />
                       <ViewProfile id='last_name' />
                       <ViewProfile id='email' />
                       <ViewProfile id='rank' />
                       <ViewProfile id='department'/>                       
                       <ViewProfile id='title' />  

                       </CardBody>

</Card>
          
    {/* </Modal.Body>
   
</Modal> */}


           
      {/* <Card>
           <CardBody>
                    <ViewProfile id='user_id' />
                      <ViewProfile id='title' />
                      <ViewProfile id='password1' />
                  
                       <ViewProfile id='first_name' />
                       <ViewProfile id='other_name' />
                       <ViewProfile id='last_name' />
                       <ViewProfile id='email' />
                       <ViewProfile id='rank' />
                       <ViewProfile id='department'/>                       
                       <ViewProfile id='title' />  
           </CardBody>
         </Card>  */}
                
            
      </React.Fragment>
    );
  }
}

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default Profile;


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
