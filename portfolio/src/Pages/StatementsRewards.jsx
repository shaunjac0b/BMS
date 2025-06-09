import React from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';
import '../index.css';

function StatementsRewards() {
  const statements = [
    {
      month: 'May 2025',
      spent: 1200,
      points: 240,
      date: 'May 2, 2025',
      status: 'Paid',
    },
    {
      month: 'April 2025',
      spent: 980,
      points: 180,
      date: 'April 1, 2025',
      status: 'Paid',
    },
    {
      month: 'March 2025',
      spent: 730,
      points: 140,
      date: 'March 1, 2025',
      status: 'Processing',
    },
  ];

  const rewards = [
    {
      category: 'Shopping',
      emoji: '🛍',
      current: 120,
      target: 200,
      description: 'Get discounts and gift cards from your favorite retailers.'
    },
    {
      category: 'Travel',
      emoji: '✈️',
      current: 75,
      target: 150,
      description: 'Earn miles or upgrade your seat on future flights.'
    },
    {
      category: 'Dining',
      emoji: '🍽',
      current: 45,
      target: 100,
      description: 'Enjoy cashbacks or meal vouchers at top-rated restaurants.'
    },
  ];

  // Status badge styling abstraction
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return <Badge bg="success" className="px-3 py-2"><i className="bi bi-check-circle-fill me-2"></i>Paid</Badge>;
      case 'Processing':
        return <Badge bg="warning" text="dark" className="px-3 py-2"><i className="bi bi-hourglass-split me-2"></i>Processing</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Container style={{ marginTop: '100px', marginBottom: '80px' }}>

      {/* Stats Summary */}
      <Row className="mb-5 text-center">
        <Col md={4}><h5>Total Earned This Month</h5><h4><Badge bg="success">240 pts</Badge></h4></Col>
        <Col md={4}><h5>Points Redeemed</h5><h4><Badge bg="primary">95 pts</Badge></h4></Col>
        <Col md={4}><h5>Points Expiring Soon</h5><h4><Badge bg="danger">30 pts</Badge></h4></Col>
      </Row>

      {/* Statements Timeline */}
      <h3 className="mb-4">Statement History</h3>
      {statements.map((s, idx) => (
        <Card key={idx} className="mb-3 shadow-sm">
          <Card.Body>
            <Row>
              <Col md={2}><Badge bg="secondary" className="px-3 py-2 fw-bold">{s.month}</Badge></Col>
              <Col md={6}>
                <Card.Text className="mb-1">
                  You spent <strong>${s.spent}</strong> and earned <strong>{s.points} pts</strong>
                </Card.Text>
                <small className="text-muted">Posted on {s.date}</small>
              </Col>
              <Col md={4} className="text-md-end">
                {getStatusBadge(s.status)}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      {/* Rewards Section */}
      <h3 className="mt-5 mb-4">Your Rewards</h3>
      <Row>
        {rewards.map((r, idx) => (
          <Col key={idx} md={4}>
            <Card className="mb-4 text-center shadow-sm">
              <Card.Body>
                <Card.Title>{r.emoji} {r.category}</Card.Title>
                <Card.Text>{r.current} / {r.target} pts to unlock</Card.Text>
                <ProgressBar now={(r.current / r.target) * 100} className="mb-3" style={{ height: '10px' }} />
                <Card.Text className="text-muted small mb-3">{r.description}</Card.Text>
                <Button variant={r.current < r.target ? "outline-primary" : "success"}>
                  {r.current < r.target ? 'Keep Earning' : 'Redeem Now'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* CTA */}
      <div className="text-center mt-5">
        <Card className="p-4 bg-light shadow-sm">
          <h4>✨ Boost Your Rewards</h4>
          <p>Earn 2x points on all dining purchases this week. Activate your offer now!</p>
          <Button variant="warning">Activate Dining Bonus</Button>
        </Card>
      </div>

    </Container>
  );
}

export default StatementsRewards;
