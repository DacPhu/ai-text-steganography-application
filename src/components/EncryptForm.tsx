import React from "react";

import InputForm from "./InputForm";
import EncryptSettings from "./Settings/EncryptSettings";

const EncryptForm = () => {
    function handleParametersSubmit(params: { param1: string; param2: number; }): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="row">
      <div className="col-md-8">
        <InputForm />
      </div>
      <div className="col-md-4">
        <EncryptSettings onParametersSubmit={handleParametersSubmit} />
      </div>
    </div>
  );
};

export default EncryptForm;
