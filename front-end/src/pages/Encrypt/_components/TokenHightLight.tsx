import React from "react";

type TokenInfo = {
  token: string;
  base_enc: number;
  byte_enc: number;
  base_msg: number;
  byte_msg: number;
  byte_id: number;
};

const TokenHighlighter = ({ tokens_info }: { tokens_info: Array<TokenInfo> }) => {
  console.log("Tokens info:", tokens_info?.length);
  // Ensure tokenInfo is an array and provide a fallback
  return (
    <div>
      <div>
        {tokens_info?.length > 0 ? (
          tokens_info?.map(
            (
              tokenInfo: { token: string; byte_enc: number; byte_msg: number },
              index: React.Key | null | undefined
            ) => {
              const { token, byte_enc, byte_msg } = tokenInfo;
              const isDifferent = byte_enc !== byte_msg;

              return (
                <span
                  key={index}
                  style={{ color: isDifferent ? "red" : "green" }}
                >
                  {token}
                </span>
              );
            }
          )
        ) : (
          <p>No tokens available</p>
        )}
      </div>
    </div>
  );
};

export default TokenHighlighter;
