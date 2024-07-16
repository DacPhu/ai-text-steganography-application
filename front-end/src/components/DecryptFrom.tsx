import React from "react";

import InputForm from "./InputForm";
import DecryptSettings from "./Settings/DecryptSettings";

const DecryptForm = () => {
  const handleParametersSubmit = (params: { param1: string; param2: number; }) => {
    // Handle the parameters submit logic here
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <InputForm />
      </div>
      <div className="col-md-4">
        <DecryptSettings onParametersSubmit={handleParametersSubmit} />
      </div>
    </div>
  );
};

export default DecryptForm;
