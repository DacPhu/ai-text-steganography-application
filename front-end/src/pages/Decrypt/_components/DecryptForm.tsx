import React, { useState } from "react";
import { sendDecryptCommand } from "../../../actions/get";
import { getKeys } from "../../../actions/manage-key-owner";
import { getKeysShared } from "../../../actions/manage-key-shared";

type KeyAttributes = {
  id: string;
  name: string;
  value: string;
};

const DecryptForm = () => {
  const [messageBase, setMessageBase] = useState(2);
  const [seedScheme, setSeedScheme] = useState("sha_left_hash");
  const [windowLength, setWindowLength] = useState(1);
  const [text, setText] = useState("");
  const [haveResult, setHaveResult] = useState(false);
  const [result, setResult] = useState("");
  const [secretKey, setSecretKey] = useState(0);
  const [listKeys, setListKeys] = useState<KeyAttributes[]>([]);
  const [typeOfKey, setTypeOfKey] = useState("owner");

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

  const handleMessageBaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMessageBase(Number(e.target.value));
  };

  const handleSeedSchemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeedScheme(e.target.value);
  };

  const handleWindowLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWindowLength(Number(e.target.value));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const res = await sendDecryptCommand(
      text,
      messageBase,
      secretKey,
      seedScheme,
      windowLength
    );
    if (res && res.status === 200) {
      let content = "";
      for (const key in res.data) {
        content += `${key}: ${res.data[key]}\n`;
      }
      setResult(content);
      setHaveResult(true);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className="card m-3 p-3">
            <div className="form-group">
              <label className="pb-2 ps-1">
                <h4>Text</h4>
              </label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Paste your text here..."
                value={text}
                onChange={handleTextChange}
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
            <div className="d-flex justify-content-center align-items-center mt-3">
              <button onClick={handleSubmit} className="btn btn-dark">
                Decrypt
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card m-3 p-3">
            <div className="row py-3">
              <div className="form-group col-5">
                <label>
                  {" "}
                  <h6>Message Base:</h6>{" "}
                </label>
                <select
                  className="ms-2 py-1 text-center"
                  value={messageBase}
                  onChange={handleMessageBaseChange}
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="16">16</option>
                  <option value="256">256</option>
                </select>
              </div>

              <div className="form-group col-7">
                <label>
                  {" "}
                  <h6>Seed Scheme:</h6>{" "}
                </label>
                <select
                  className="ms-2 p-1 text-center"
                  value={seedScheme}
                  onChange={handleSeedSchemeChange}
                >
                  <option value="sha_left_hash">SHA Left Hash</option>
                </select>
              </div>
            </div>

            <div className="form-group py-3">
              <label>
                {" "}
                <h6>Secret Key</h6>{" "}
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
                    className="ms-5 text-center p-1"
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

            <div className="form-group py-3">
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
          </div>
        </div>
      </div>

      {haveResult && (
        <>
          <div className="card m-3 p-3">
            <h5>Result</h5>
            <div className="form-group">
              <label>Text</label>
              <textarea
                className="form-control"
                rows={5}
                value={result}
                readOnly
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DecryptForm;
