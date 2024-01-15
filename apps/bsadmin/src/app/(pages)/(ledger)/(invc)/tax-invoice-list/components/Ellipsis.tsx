import React, { useEffect, useRef, useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { Tooltip } from "@mui/material";

interface EllipsisProps {
  text: string;
}

const Ellipsis = ({ text }: EllipsisProps) => {
  const [isClamped, setIsClamped] = useState(false);
  const ellipsisRef = useRef(null);

  useEffect(() => {
    if (ellipsisRef.current) {
      setIsClamped(ellipsisRef.current.isClamped());
    }
  }, [text]);

  return (
    text !== null &&
    text !== "" && (
      <>
        <Tooltip title={isClamped ? text : ""} arrow followCursor>
          <div>
            <LinesEllipsis
              ref={ellipsisRef}
              data-tag="allowRowEvents"
              text={text}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </div>
        </Tooltip>
      </>
    )
  );
};

export default Ellipsis;
