import React, { useState } from "react";
import InputForm from "../../Decrypt/_components/InputForm";
import DecryptSettings from "./DecryptSettings";

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

  const handleSettingsSubmit = (params: { param1: string; param2: number }) => {
    setSettingsData(params);
    submitAllData({ ...inputData, ...params });
  };

  const submitAllData = async (data: {
    text: string;
    file: File | null;
    param1: string;
    param2: number;
  }) => {
    const formData = new FormData();
    formData.append("text", data.text);
    formData.append("param1", data.param1);
    formData.append("param2", data.param2.toString());
    if (data.file) {
      formData.append("file", data.file);
    }

    try {
      const response = await fetch("/your-endpoint", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.error("Form submission error");
      }
    } catch (error) {
      console.error("Form submission error", error);
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
