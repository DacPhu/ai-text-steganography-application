import React from "react";

const TokenHighlighter = ({ tokens_info }: { tokens_info: Array<any> }) => {
  console.log("Tokens info:", tokens_info);
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
