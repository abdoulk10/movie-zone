import { useCreateWatchlistMutation } from "../app/apiSlice";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function CreateWatchlistButton() {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("Custom Watchlist");
  const [createWatchlist] = useCreateWatchlistMutation();
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSaveChanges = () => {
    const data = {
      name: inputValue,
    };
    createWatchlist(data);
    setInputValue("Custom Watchlist");
    handleClose();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Watchlist
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Watchlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            id="watchlistname"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateWatchlistButton;
