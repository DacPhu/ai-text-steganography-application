import React, { useState } from "react";
import "../../styles/Modal.css";
import KeyOwner from "./_components/KeyOwner";
import KeyShared from "./_components/KeyShared";
import KeySharing from "./_components/KeySharing";

const KeyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("KeyOwner");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="card m-3 d-flex flex-row justify-content-evenly p-3">
        <button
          className={`btn btn-secondary ${
            activeTab === "KeyOwner" ? "active" : ""
          }`}
          onClick={() => handleTabChange("KeyOwner")}
        >
          Key Owner
        </button>
        <button
          className={`btn btn-secondary ${
            activeTab === "KeyShared" ? "active" : ""
          }`}
          onClick={() => handleTabChange("KeyShared")}
        >
          Key Shared
        </button>
        <button
          className={`btn btn-secondary ${
            activeTab === "KeySharing" ? "active" : ""
          }`}
          onClick={() => handleTabChange("KeySharing")}
        >
          Key Sharing
        </button>
      </div>

      {activeTab === "KeyOwner" && (
        <div>
          <KeyOwner />
        </div>
      )}

      {activeTab === "KeyShared" && (
        <div>
          {" "}
          <KeyShared />
        </div>
      )}

      {activeTab === "KeySharing" && (
        <div>
          {" "}
          <KeySharing />
        </div>
      )}
    </div>
  );
};

export default KeyPage;
