// Modal.js
import React from "react";
import { Button, Modal } from "react-bootstrap";

const ViewImage = ({ show, onClose, imageUrl }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      //   size="lg"
      size="xl"
      // 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'
    >
      <Modal.Header closeButton>
        <Modal.Title>Boat Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            height: "100%",
            // backgroundColor: "red",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={imageUrl}
            style={{
              maxWidth: "60%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
            }}
            alt="background"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewImage;
