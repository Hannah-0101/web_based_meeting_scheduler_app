import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


export default class Accept extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  
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
                 
                     <h4>Approve/Decline</h4>
                   <Button><Link to="/confirmdetails">Accept</Link></Button>
                   <Button   style={styles2}> <Link to="/confirmdetails">Decline</Link></Button>
                   
                   
                 </CardBody>
               </Card>
             </CardGroup>
           </Col>
         </Row>
 
        
       </Container>
      </div>
    )
  }
}
