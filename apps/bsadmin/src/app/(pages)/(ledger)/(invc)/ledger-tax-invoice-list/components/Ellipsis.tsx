import React, { useEffect, useRef, useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { Box, Tooltip } from "@mui/material";

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
      <Tooltip title={text} arrow>
        <Box>
          <LinesEllipsis
            text={text}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </Box>
      </Tooltip>
    )
  );
};

export default Ellipsis;
