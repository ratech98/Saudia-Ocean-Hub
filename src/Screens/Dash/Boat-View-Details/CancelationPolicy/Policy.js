import React from "react";
import "./Policy.css";
import data from "../boatDetailsViewsJson.json";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Policy = ({ id, policy_statement }) => {
  const policy = data.parameters.boats_cancellation_policy;
  return (
    <div>
      {/* {policy.map((item) => ( */}
      <div className="policy">
        <Row>
          <Col
            xs={1}
            className="d-flex policy_statement_id align-items-center justify-content-center vl "
          >
            <h5 className="policy_id ">{id}</h5>
          </Col>
          <Col xs={11} className="d-flex policy_statement  align-items-center">
            <h3 className="policy_text">{policy_statement}</h3>
          </Col>
        </Row>
      </div>
      {/* ))} */}
    </div>
  );
};
export default Policy;
