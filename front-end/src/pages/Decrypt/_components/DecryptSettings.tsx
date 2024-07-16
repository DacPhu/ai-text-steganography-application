import React, { useState } from "react";

const DecryptSettings = ({
  onParametersSubmit,
}: {
  onParametersSubmit: (params: { param1: string; param2: number }) => void;
}) => {
  const [param1, setParam1] = useState("");
  const [param2, setParam2] = useState(50); // Default value for the slider

  const handleParam1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParam1(e.target.value);
  };

  const handleParam2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParam2(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onParametersSubmit({ param1, param2 });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h5 className="card-title">Configurations</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Base</label>
            <input
              type="text"
              className="form-control"
              value={param1}
              onChange={handleParam1Change}
            />
          </div>
          <div className="form-group mt-3">
            <label>Bias</label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="100"
              value={param2}
              onChange={handleParam2Change}
            />
            <div className="text-center mt-2">{param2}</div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit Parameters
          </button>
        </form>
      </div>
    </div>
  );
};

export default DecryptSettings;
