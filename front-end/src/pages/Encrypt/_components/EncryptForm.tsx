import React, { useState } from "react";
import { sendEncryptCommand } from "../../../actions/get";
import { getKeys } from "../../../actions/manage-key-owner";
import { getKeysShared } from "../../../actions/manage-key-shared";
import TokenHighlight from "./TokenHightLight";

type TokenInfo = {
  token: string;
  base_enc: number;
  byte_enc: number;
  base_msg: number;
  byte_msg: number;
  byte_id: number;
};

type KeyAttributes = {
  id: string;
  name: string;
  value: string;
};

const EncryptForm = () => {
  const [delta, setDelta] = useState(50);
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
  const [typeOfKey, setTypeOfKey] = useState("owner");
  const [secretKey, setSecretKey] = useState(0);
  const [listKeys, setListKeys] = useState<KeyAttributes[]>([]);
  // const [file, setFile] = useState<File | null>(null);

  const handleTypeOfKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeOfKey(e.target.value);
    if (e.target.value === "owner") {
      getKeys().then((res) => {
        setListKeys(res.data);
      });
    } else {
      getKeysShared().then((res) => {
        const keys = res?.data;
        setListKeys(keys);
      });
    }
  };

  const handleSecretKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSecretKey(parseInt(e.target.value));
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await sendEncryptCommand(
      prompt,
      message,
      secretKey,
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
              <label className="pb-2 ps-1">
                {" "}
                <h4>Prompt</h4>
              </label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Paste your prompt here..."
                value={prompt}
                onChange={handlePromptChange}
              />
              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">0/5,000 characters</small>
              </div>
            </div>
            <div className="form-group">
              <label className="pb-2 ps-1 pt-5">
                {" "}
                <h4>Message</h4>
              </label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Paste your message here..."
                value={message}
                onChange={handleMessageChange}
              />
              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">0/100 characters</small>
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
              <label>
                {" "}
                <h6>Delta</h6>
              </label>
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

            <div className="row">
              <div className="form-group col-5 text-center">
                <label>
                  {" "}
                  <h6> Message Base:</h6>{" "}
                </label>
                <select
                  className="ms-2 text-center py-1"
                  value={messageBase}
                  onChange={handleMessageBaseChange}
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="16">16</option>
                  <option value="256">256</option>
                </select>
              </div>
              <div className="form-group col-7 text-center">
                <label>
                  {" "}
                  <h6>Seed Scheme:</h6>{" "}
                </label>
                <select
                  className="ms-2 p-1"
                  value={seedScheme}
                  onChange={handleSeedSchemeChange}
                >
                  <option value="sha_left_hash">SHA Left Hash</option>
                </select>
              </div>
            </div>

            <div className="form-group mt-3">
              <label>
                {" "}
                <h6>Secret Key:</h6>{" "}
              </label>
              <select
                className="ms-5 text-center p-1"
                value={typeOfKey}
                onChange={handleTypeOfKeyChange}
              >
                <option value="owner"> My key </option>
                <option value="shared"> Share to me</option>
              </select>
              {listKeys.length > 0 ? (
                <>
                  <select
                    className="ms-5 p-1 text-center"
                    value={secretKey}
                    onChange={handleSecretKeyChange}
                  >
                    {listKeys.map((key) => (
                      <option key={key.id} value={key.value}>
                        {key.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <span className="ms-5"> No key found </span>
              )}
            </div>

            <div className="form-group py-2">
              <label>
                {" "}
                <h6>Start position</h6>{" "}
              </label>
              <input
                type="number"
                className="form-control"
                min={0}
                value={startPosition}
                onChange={handleStartPositionChange}
              />
            </div>

            <div className="row">
              <div className="form-group py-2 col-6">
                <label>
                  {" "}
                  <h6>Window Length</h6>
                </label>
                <input
                  type="number"
                  className="form-control"
                  min={1}
                  value={windowLength}
                  onChange={handleWindowLengthChange}
                />
              </div>
              <div className="form-group py-2 col-6">
                <label>
                  {" "}
                  <h6>Max New Token Ratio </h6>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={maxNewTokensRatio}
                  onChange={handleMaxNewTokensRatioChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group py-2 col-6">
                <label>
                  {" "}
                  <h6>Num Beams</h6>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={numBeams}
                  onChange={handleNumBeamsChange}
                />
              </div>

              <div className="form-group py-2 col-6">
                <label>
                  <h6>Repetition Penalty</h6>
                </label>
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
              <h5>Shown in base:</h5>

              <TokenHighlight tokens_info={tokensInfo} isByte={true} />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card m-3 p-3">
              <h5>Shown in byte:</h5>

              <TokenHighlight tokens_info={tokensInfo} isByte={false} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EncryptForm;
