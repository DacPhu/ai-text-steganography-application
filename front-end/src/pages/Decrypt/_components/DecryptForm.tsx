import React, { useState } from "react";
import InputForm from "../../Decrypt/_components/InputForm";
import DecryptSettings from "./DecryptSettings";
import { sendDecryptCommand } from "../../../actions/get"; // Adjust the import path as needed

const DecryptForm = () => {
  const [inputData, setInputData] = useState<{
    text: string;
    file: File | null;
  }>({ text: "", file: null });
  const [settingsData, setSettingsData] = useState<{
    param1: string;
    param2: number;
  }>({ param1: "", param2: 50 });

  const handleInputFormSubmit = (data: { text: string; file: File | null }) => {
    setInputData(data);
  };

  const handleSettingsSubmit = async (params: {
    param1: string;
    param2: number;
  }) => {
    setSettingsData(params);
    const response = await sendDecryptCommand(
      inputData.text,
      inputData.file,
      params.param1,
      params.param2
    );
    if (response) {
      console.log("Decryption response:", response);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <InputForm onFormSubmit={handleInputFormSubmit} />
      </div>
      <div className="col-md-4">
        <DecryptSettings onParametersSubmit={handleSettingsSubmit} />
      </div>
    </div>
  );
};

export default DecryptForm;
