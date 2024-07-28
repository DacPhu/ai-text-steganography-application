import React, { useState } from "react";
import { sendEncryptCommand } from "../../../actions/get";
import TokenHighlight from "./TokenHightLight";

type TokenInfo = {
  token: string;
  base_enc: number;
  byte_enc: number;
  base_msg: number;
  byte_msg: number;
  byte_id: number;
};

const EncryptForm = () => {
  const [delta, setDelta] = useState(0.5);
  const [messageBase, setMessageBase] = useState(2);
  const [startPosition, setStartPosition] = useState(0);
  const [seedScheme, setSeedScheme] = useState("sha_left_hash");
  const [windowLength, setWindowLength] = useState(1);
  const [maxNewTokensRatio, setMaxNewTokensRatio] = useState(1);
  const [numBeams, setNumBeams] = useState(1);
  const [repetitionPenalty, setRepetitionPenalty] = useState(2);
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [haveResult, setHaveResult] = useState(true);
  const [tokensInfo, setTokensInfo] = useState<TokenInfo[]>([]);
  const [messageRate, setMessageRate] = useState(0);
  const [text, setText] = useState("");
  // const [file, setFile] = useState<File | null>(null);

  const handleDeltaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelta(parseFloat(e.target.value));
  };

  const handleMessageBaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMessageBase(parseInt(e.target.value));
  };

  const handleStartPositionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartPosition(parseInt(e.target.value));
  };

  const handleSeedSchemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeedScheme(e.target.value);
  };

  const handleWindowLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWindowLength(parseInt(e.target.value));
  };

  const handleMaxNewTokensRatioChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxNewTokensRatio(parseFloat(e.target.value));
  };

  const handleNumBeamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumBeams(parseInt(e.target.value));
  };

  const handleRepetitionPenaltyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepetitionPenalty(parseInt(e.target.value));
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] as File;
  //   setFile(file);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await sendEncryptCommand(
      prompt,
      message,
      // file,
      delta,
      messageBase,
      startPosition,
      seedScheme,
      windowLength,
      maxNewTokensRatio,
      numBeams,
      repetitionPenalty
    );

    if (result.status === 200) {
      setHaveResult(false);
      setText(result.data.text);
      setTokensInfo(result.data.tokensInfo);
      setMessageRate(result.data.msgRate);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className="card m-3 p-3">
            <div className="form-group">
              <label className="pb-2 ps-1">Prompt</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Paste your prompt here..."
                value={prompt}
                onChange={handlePromptChange}
              />
              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">0/5,000 characters</small>
                {/* <div className="form-group">
                  <label className="btn btn-outline-secondary">
                    Upload file{" "}
                    <input type="file" hidden onChange={handleFileChange} />
                  </label>
                  {file && <small className="text-muted">{file.name}</small>}
                </div> */}
              </div>
            </div>
            <div className="form-group">
              <label className="pb-2 ps-1">Message</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Paste your message here..."
                value={message}
                onChange={handleMessageChange}
              />
              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">0/100 characters</small>
                {/* <div className="form-group">
                  <label className="btn btn-outline-secondary">
                    Upload file{" "}
                    <input type="file" hidden onChange={handleFileChange} />
                  </label>
                  {file && <small className="text-muted">{file.name}</small>}
                </div> */}
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-dark"
              >
                Encrypt
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card m-3 p-3">
            <div className="form-group">
              <label>Delta</label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={delta}
                onChange={handleDeltaChange}
              />
            </div>
            <div className="text-center mt-2">{delta}</div>
            <div className="form-group mt-3">
              <label>Message Base: </label>
              <select
                className="ms-2"
                value={messageBase}
                onChange={handleMessageBaseChange}
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="16">16</option>
                <option value="256">256</option>
              </select>
            </div>

            <div className="form-group">
              <label>Start position</label>
              <input
                type="number"
                className="form-control"
                min={0}
                value={startPosition}
                onChange={handleStartPositionChange}
              />
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
                value={maxNewTokensRatio}
                onChange={handleMaxNewTokensRatioChange}
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

      {haveResult ? (
        <div className="hidden">Result</div>
      ) : (
        <>
          <div className="col-md-8">
            <div className="card m-3 p-3">
              <h3>
                <b> Result: </b>
              </h3>
              <p> Message Rate: {messageRate.toPrecision(4)} %</p>
              <p> {text}</p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card m-3 p-3">
              <h5>
                Shown in base:
              </h5>

              <TokenHighlight tokens_info={tokensInfo} isByte={true} />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card m-3 p-3">
              <h5>
                Shown in byte:
              </h5>

              <TokenHighlight tokens_info={tokensInfo} isByte={false} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EncryptForm;
