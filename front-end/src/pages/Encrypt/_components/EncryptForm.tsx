import React, { useState } from "react";
import { sendEncryptCommand } from "../../../actions/get";

const EncryptForm = () => {
  const [gamma, setGamma] = useState(0.5);
  const [messageBase, setMessageBase] = useState(2);
  const [seedScheme, setSeedScheme] = useState("sha_left_hash");
  const [windowLength, setWindowLength] = useState(1);
  const [maxNewTokenRatio, setMaxNewTokenRatio] = useState(0);
  const [numBeams, setNumBeams] = useState(0);
  const [repetitionPenalty, setRepetitionPenalty] = useState(0);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleGammaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGamma(Number(e.target.value));
  };

  const handleMessageBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageBase(Number(e.target.value));
  };

  const handleSeedSchemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeedScheme(e.target.value);
  };

  const handleWindowLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWindowLength(Number(e.target.value));
  };

  const handleMaxNewTokenRatioChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxNewTokenRatio(Number(e.target.value));
  };

  const handleNumBeamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumBeams(Number(e.target.value));
  };

  const handleRepetitionPenaltyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepetitionPenalty(Number(e.target.value));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    setFile(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEncryptCommand(
      text,
      file,
      gamma,
      messageBase,
      seedScheme,
      windowLength,
      maxNewTokenRatio,
      numBeams,
      repetitionPenalty
    );
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card m-3 p-3">
          <div className="form-group">
            <label className="pb-2 ps-1">Text</label>
            <textarea
              className="form-control"
              rows={5}
              placeholder="Paste your text here..."
              value={text}
              onChange={handleTextChange}
            />
            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-muted">0/5,000 characters</small>
              <div className="form-group">
                <label className="btn btn-outline-secondary">
                  Upload file{" "}
                  <input type="file" hidden onChange={handleFileChange} />
                </label>
                {file && <small className="text-muted">{file.name}</small>}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button onClick={handleSubmit} className="btn btn-dark">
              Encrypt
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card m-3 p-3">
          <div className="form-group">
            <label>Gamma</label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="100"
              value={gamma}
              onChange={handleGammaChange}
            />
          </div>
          <div className="text-center mt-2">{gamma}</div>
          <div className="form-group mt-3">
            <label>Message Base: </label>
            <select
              className="ms-2"
              value={messageBase}
              onChange={handleMessageBaseChange}
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
              <option value="64">64</option>
              <option value="128">128</option>
              <option value="256">256</option>
            </select>
          </div>

          <div className="form-group mt-3 mb-3">
            <label>Seed Scheme: </label>
            <select
              className="ms-2"
              value={seedScheme}
              onChange={handleSeedSchemeChange}
            >
              <option value="sha_left_hash">SHA Left Hash</option>
            </select>
          </div>

          <div className="form-group">
            <label>Window Length</label>
            <input
              type="number"
              className="form-control"
              min={1}
              value={windowLength}
              onChange={handleWindowLengthChange}
            />
          </div>
          <div className="form-group">
            <label>Max New Token Ratio</label>
            <input
              type="number"
              className="form-control"
              value={maxNewTokenRatio}
              onChange={handleMaxNewTokenRatioChange}
            />
          </div>

          <div className="form-group">
            <label>Num Beams</label>
            <input
              type="number"
              className="form-control"
              value={numBeams}
              onChange={handleNumBeamsChange}
            />
          </div>

          <div className="form-group">
            <label>Repetition Penalty</label>
            <input
              type="number"
              className="form-control"
              value={repetitionPenalty}
              onChange={handleRepetitionPenaltyChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptForm;