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
      <Tooltip
        data-tag="allowRowEvents"
        title={text}
        arrow
        sx={{ width: "100%" }}
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -10],
                },
              },
            ],
          },
        }}
      >
        <Box data-tag="allowRowEvents" sx={{ width: "100%" }}>
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
