import React from "react";
import { Button, Modal } from "react-bootstrap";

const ViewImage = ({ show, onClose, imageUrl, imageGroup }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        //   size="lg"
        size="xl"
        // 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'
        closeButton
      >
        <Modal.Header closeButton>
          <Modal.Title>Boat Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>Jagadeesh</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewImage;
