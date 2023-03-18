import React, { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Container, Col, Row, ListGroup,
} from 'react-bootstrap';
import Fade from 'react-awesome-reveal';
import { ThemeContext } from 'styled-components';
import Header from '../Header';
import endpoints from '../../constants/endpoints';
import FallbackSpinner from '../FallbackSpinner';
import '../../css/about.css';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
    marginBottom: 20,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  header: {
    margin: '100px 0 50px 0',
  },
  unitText: {
    padding: '50px 0 0 0',
  },
};

function SRMMain() {
  const [data, setData] = useState(null);
  const theme = useContext(ThemeContext);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.srmMain, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const outcomeLength = data ? data.outcome.length : 3;
  return (
    <>
      <Header title="Security and Risk Management" />
      <div>
        <Container className="about-screen-body-container">
          {data
            ? (
              <Fade>
                <Row>
                  <Col style={styles.introTextContainer}>
                    <h2 style={styles.header}>Learning Outcomes</h2>
                    <ListGroup as="li" numbered>
                      {data.outcome?.slice(0, outcomeLength).map((outcome) => (
                        <ListGroup.Item
                          key={outcome}
                          style={{
                            backgroundColor: theme.background,
                            color: theme.color,
                          }}
                        >
                          {outcome}
                        </ListGroup.Item>
                      ))}

                    </ListGroup>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.introTextContainer}>
                    <h2 style={styles.header}>Unit 2</h2>
                    <h4>Learning Outcomes</h4>
                    <ListGroup as="li" numbered>
                      {data.unit2.outcome?.slice(0, outcomeLength).map((outcome) => (
                        <ListGroup.Item
                          key={outcome}
                          style={{
                            backgroundColor: theme.background,
                            color: theme.color,
                          }}
                        >
                          {outcome}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <div style={styles.unitText}>
                      {parseIntro(data.unit2.details)}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.introTextContainer}>
                    <h2 style={styles.header}>Reflections</h2>
                    {parseIntro(data.about)}
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

export default SRMMain;
