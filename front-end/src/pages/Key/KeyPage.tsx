import React, { useState, useEffect } from "react";
import "../../styles/Modal.css";
import { getKeys, createKey, deleteKey } from "../../actions/manage-key";

type KeyAttributes = {
  id: number;
  name: string;
  createdAt: string;
};

const KeyPage: React.FC = () => {
  const [listKeys, setListKeys] = useState<KeyAttributes[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [keyToDelete, setKeyToDelete] = useState<number | null>(null);

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleShowShareModal = () => setShowShareModal(true);
  const handleCloseShareModal = () => setShowShareModal(false);

  const handleShowDeleteModal = (keyId: number) => {
    setKeyToDelete(keyId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setKeyToDelete(null);
    setShowDeleteModal(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric", // "2024"
      month: "long", // "July"
      day: "numeric", // "28"
      hour: "2-digit", // "02"
      minute: "2-digit", // "30"
    };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const keys = await getKeys();
        setListKeys(keys.data);
      } catch (error) {
        console.error("Failed to fetch keys:", error);
      }
    };

    fetchKeys();
  }, []);

  const handleCreateKey = async () => {
    console.log("Key Name:", keyName);
    try {
      const result = await createKey(keyName);
      console.log("Create Key Result:", result);
      const keys = await getKeys();
      setListKeys(keys.data);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Failed to create key:", error);
    }
  };

  const handleShareKey = () => {
    console.log("Share Key");
    setShowShareModal(false);
  };

  const handleDeleteKey = async () => {
    if (keyToDelete === null) return;

    try {
      const result = await deleteKey(keyToDelete);
      console.log("Delete Key Result:", result);
      setKeyToDelete(null);
      setShowDeleteModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete key:", error);
    }
  };

  const isModalOpen = showCreateModal || showShareModal || showDeleteModal;

  return (
    <>
      <div className={`card m-3 ${isModalOpen ? "blur-background" : ""}`}>
        <div className="container-fluid bg-light py-2">
          <div className="align-items-center row">
            <div className="col-md-6">
              <h5 className="ms-4 my-3">Manage Keys</h5>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <button
                className="btn btn-primary mx-5"
                onClick={handleShowCreateModal}
              >
                Create Key
              </button>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-grey p-3">
          <div className="row px-3">
            <div className="col-4">Name</div>
            <div className="col-6">Created at</div>
            <div className="col-2">Action</div>
          </div>
        </div>
        {listKeys.length > 0 ? (
          listKeys.map((key: KeyAttributes) => (
            <div className="container-fluid bg-light py-3" key={key.id}>
              <div className="row p-3 member-item">
                <div className="col text-color-1" hidden>
                  {key.id}
                </div>
                <div className="col-4 text-color-1">{key.name}</div>
                <div className="col-6 text-color-1">{formatDate(key.createdAt)}</div>
                <div className="col-2 text-color-1 d-flex">
                  <i
                    className="bi bi-share pe-4"
                    onClick={handleShowShareModal}
                  ></i>
                  <i
                    className="bi bi-trash pe-4"
                    onClick={() => handleShowDeleteModal(key.id)}
                  ></i>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="container-fluid bg-light py-3">
            <div className="row p-3 member-item">
              <div className="col text-color-1 text-center">
                No records found
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Key</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseCreateModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="keyName" className="form-label">
                    Key Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="keyName"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseCreateModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateKey}
                >
                  Create Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Key Modal */}
      {showShareModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Share Key</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseShareModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Share the key with others.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseShareModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleShareKey}
                >
                  Share Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Key Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Key</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseDeleteModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this key?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseDeleteModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteKey}
                >
                  Delete Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KeyPage;
