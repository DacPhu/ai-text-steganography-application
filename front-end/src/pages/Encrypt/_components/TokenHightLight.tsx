import React from "react";
import MouseOverPopover from "./MouseUpPopOver";

type TokenInfo = {
  token: string;
  base_enc: number;
  byte_enc: number;
  base_msg: number;
  byte_msg: number;
  byte_id: number;
};

type TokenInfoPretty = {
  token: string;
  value: number;
  correct: number;
};

const TokenHighlighter = ({
  tokens_info,
  isByte,
}: {
  tokens_info: TokenInfo[];
  isByte: boolean;
}) => {
  // Ensure tokenInfo is an array and provide a fallback
  const tokens_info_temp: TokenInfoPretty[] = [];

  // If isByte is true, filter tokens_info by byte_enc
  if (isByte) {
    let current_byte = -1;
    for (let i = 0; i < tokens_info.length; i++) {
      if (tokens_info[i].byte_id === -1) {
        tokens_info_temp.push({
          token: tokens_info[i].token,
          value: tokens_info[i].byte_enc,
          correct: tokens_info[i].byte_msg,
        });
        continue;
      }
      if (tokens_info[i].byte_id === current_byte) {
        tokens_info_temp[tokens_info_temp.length - 1].token +=
          tokens_info[i].token;
      } else {
        tokens_info_temp.push({
          token: tokens_info[i].token,
          value: tokens_info[i].byte_enc,
          correct: tokens_info[i].byte_msg,
        });
        current_byte = tokens_info[i].byte_id;
      }
    }
    console.log(tokens_info_temp);
  } else {
    for (let i = 0; i < tokens_info.length; i++) {
      tokens_info_temp.push({
        token: tokens_info[i].token,
        value: tokens_info[i].base_enc,
        correct: tokens_info[i].base_msg,
      });
    }
  }

  return (
    <div>
      <div>
        {tokens_info_temp?.length > 0 ? (
          tokens_info_temp?.map(
            (
              tokenInfo: TokenInfoPretty,
              index: React.Key | null | undefined
            ) => {
              return (
                <MouseOverPopover
                  key={index}
                  tokenInfo={{
                    token: tokenInfo.token,
                    value: tokenInfo.value,
                    correct: tokenInfo.correct,
                    color:
                      tokenInfo.correct === -1
                        ? "none"
                        : tokenInfo.value === tokenInfo.correct
                        ? "green"
                        : "red",
                  }}
                  isByte={isByte}
                ></MouseOverPopover>
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
