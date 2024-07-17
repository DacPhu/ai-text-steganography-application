import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InputForm = ({
  onFormSubmit,
}: {
  onFormSubmit: (data: { text: string; file: File | null }) => void;
}) => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    setFile(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit({ text, file });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h3 className="card-title text-center pb-4">Decrypting message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="pb-2 ps-1">Text</label>
            <textarea
              className="form-control"
              rows={5}
              placeholder="Paste your text here..."
              value={text}
              onChange={handleTextChange}
              name="text"
            />
            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-muted">0/5,000 characters</small>
              <div className="form-group">
                <label className="btn btn-outline-secondary">
                  Upload file{" "}
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    name="file"
                  />
                </label>
                {file && <small className="text-muted">{file.name}</small>}
              </div>
            </div>

            <label className="pb-2 ps-1">Message</label>
            <textarea
              className="form-control"
              placeholder="Paste your message here..."
              rows={2}
              value={message}
              onChange={handleMessageChange}
              name="message"
            />
            <div className="d-flex justify-content-end pt-3">
              <div className="form-group">
                <label className="btn btn-outline-secondary">
                  Upload file{" "}
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    name="file"
                  />
                </label>
                {file && <small className="text-muted">{file.name}</small>}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center mt-3">
            <button type="submit" className="btn btn-dark">
              Decrypt
            </button>
          </div>
          <p className="mt-3">
            By continuing you agree to our <a href="/terms">Terms of service</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
