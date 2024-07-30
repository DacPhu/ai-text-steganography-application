import React, { useEffect, useRef, useState } from "react";
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
  const [result, setResult] = useState<Map<number, string>>();
  const [listKeys, setListKeys] = useState<KeyAttributes[]>([]);
  const secretKeySelected = useRef<HTMLSelectElement>(null);
  const typeOfKeySelected = useRef<HTMLSelectElement>(null);

  const handleTypeOfKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  useEffect(() => {
    const typeOfKey = typeOfKeySelected.current?.value;
    if (typeOfKey === "owner") {
      getKeys().then((res) => {
        setListKeys(res.data);
      });
    } else {
      getKeysShared().then((res) => {
        const keys = res?.data;
        setListKeys(keys);
      });
    }
  }, []);

  const handleMessageBaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("MESSAGE BASE", e.target.value);
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

    const secretKey = parseInt(secretKeySelected.current?.value || "0");
    const res = await sendDecryptCommand(
      text,
      messageBase,
      secretKey,
      seedScheme,
      windowLength
    );
    console.log(res);
    if (res && res.status === 200) {
      setResult(res.data);
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
                className="ms-2 text-center p-1"
                ref={typeOfKeySelected}
                onChange={handleTypeOfKeyChange}
              >
                <option value="owner"> My key </option>
                <option value="shared"> Share to me</option>
              </select>
              {listKeys.length > 0 ? (
                <>
                  <select
                    className="ms-2 text-center p-1"
                    ref={secretKeySelected}
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
              {result &&
                Object.entries(result).map(([k, v]) => (
                  <div className="bg-light d-flex my-1 p-1 align-items-center">
                    <h6 className="col-1 m-0">Shift {k}</h6>
                    <textarea
                      className="col-11 p-1"
                      rows={1}
                      value={v}
                      readOnly
                    />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DecryptForm;
