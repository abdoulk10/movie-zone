import { useUpdateWatchlistMutation } from "../../app/apiSlice";

import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function UpdateButton(watchlist_data) {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState(
    watchlist_data?.watchlist_data["name"]
  );
  const [updateWatchlist] = useUpdateWatchlistMutation();
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
    updateWatchlist({ id: watchlist_data?.watchlist_data["id"], data });
    handleClose();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your new Watchlist name</Modal.Title>
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

export default UpdateButton;
