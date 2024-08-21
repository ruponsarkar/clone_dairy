import React, { useEffect, useState } from "react";
import api from "../../API/api";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container, Row, Col } from 'react-bootstrap';

const CountStatus = () => {
  // countStatus

  const [count, setCount] = useState({});
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  

  useEffect(() => {
    if(user){
      console.log("user ", user);
    api
      .countStatus(user)
      .then((res) => {
        setCount(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [user]);

  const cardsData = [
    { color: '#66BB6A', icon: 'fa fa-file', title: 'Total Farmer', total: count.farmers },
    { color: '#AB47BC', icon: 'fa fa-check',title: 'Total milk collection', total: count.tot_milk_amount },
    { color: '#42A5F5', icon: 'fa fa-plus',title: 'Total amount',total: count.total_amount, },
    { color: '#FFCA28', icon: 'fa fa-refresh',title: 'Current month milk', total: count?.current_month_milk },
  ];

  return (
    <>
    <Container className="p-0 m-0">
      <Row className="pb-0">
        {cardsData.map((card, index) => (
          <Col xs={12} md={6} lg={3} key={index}>
            <Card className="shadow-lg  rounded" style={{ backgroundColor: card.color, color: '#fff', marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {card.title}
                </Typography>
                <Typography variant="h3" component="div">
                  {card.total}
                </Typography>
                {/* <Typography variant="body2">
                  Last Month
                </Typography> */}
                <i className={card.icon} style={{ fontSize: '2rem', position: 'absolute', top: '10px', right: '10px', opacity: 0.3, paddingRight: '10px' }}></i>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

    
    </>
  );
};

export default CountStatus;
