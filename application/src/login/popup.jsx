import React from 'react';

import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';

export function Popup(props) {
    return (
        <Modal show={props.msg !== ''} centered>
            <Modal.Body>{props.msg}</Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={props.onClose}>Close</Button>
            </Modal.Footer>
        </Modal>)
}