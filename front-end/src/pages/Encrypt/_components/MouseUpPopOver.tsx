import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

type TokenInfoPretty = {
  token: string;
  value: number;
  correct: number;
  color: string;
};

export default function MouseOverPopover({
  tokenInfo,
  isByte,
}: {
  tokenInfo: TokenInfoPretty;
  isByte: boolean;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  console.log(tokenInfo);
  return (
    <>
      <span>
        <Typography
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={
            tokenInfo.color !== "none" ? handlePopoverOpen : () => {}
          }
          onMouseLeave={
            tokenInfo.color !== "none" ? handlePopoverClose : () => {}
          }
          style={{
            backgroundColor:
              tokenInfo.color == "red"
                ? "#f7887c"
                : tokenInfo.color === "green"
                ? "#76f597"
                : "none",
            display: "inline",
          }}
        >
          {tokenInfo.token}
        </Typography>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>
            Value: {tokenInfo.value}{" "}
            <>{isByte && <>({String.fromCharCode(tokenInfo.value)})</>}</>
            <br />
            Label: {tokenInfo.correct}{" "}
            <>{isByte && <>({String.fromCharCode(tokenInfo.correct)})</>}</>
            <br />
          </Typography>
        </Popover>
      </span>
      <span> </span>
    </>
  );
}
