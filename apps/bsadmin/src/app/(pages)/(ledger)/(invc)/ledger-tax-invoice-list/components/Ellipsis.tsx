import React, { useEffect, useRef, useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { Box, Tooltip } from "@mui/material";

interface EllipsisProps {
  text: string;
  line?: number | string | undefined;
}

const Ellipsis = ({ text, line = 2 }: EllipsisProps) => {
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
            maxLine={line}
            ellipsis="..."
            trimRight
            basedOn="words"
          />
        </Box>
      </Tooltip>
    )
  );
};

export default Ellipsis;
