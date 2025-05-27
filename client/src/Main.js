import React from 'react'
import { Col, Row } from 'react-bootstrap'
import pcdealssite from './images/pcdealssite.jpg'
import pcdealshardwaresite from './images/pcdealshardwaresite.jpg'
import { Link } from 'react-router-dom'

export default function Main() {
  return (
    <Row className='height-100vh'>
        <Col className='p-0' md={6} xs={12} sm={12}>
            <a href={"https://www.pcdealsindia.com/"}><img className='w-100 m-h-50' src={pcdealssite}/></a>
        </Col>
        <Col className='p-0' md={6} xs={12} sm={12}>
            <Link to={"/pcdeals-hardware"}><img className='w-100 m-h-50' src={pcdealshardwaresite}/></Link>
        </Col>
    </Row>
  )
}
