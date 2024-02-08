import React, { forwardRef } from "react";
import {
  SkeletonLoading,
} from "cjbsDSTM";
import {
  Stack,
} from "@mui/material";
import Image from 'next/image';
import {fetcher} from "api";
import {useParams} from "next/navigation";
import useSWR from "swr";
import "./print.css";

const TSImgPreview = forwardRef((props, ref) => {
  const params = useParams();
  const { slug } = params;

  // data load
  const { data: imgUrl, error, isLoading, } = useSWR(`/tdst/url/${slug}`, fetcher);
  if (isLoading) {
    return <SkeletonLoading />;
  }
  // console.log("imgUrl", imgUrl);

  return (

    <Stack
      spacing={1}
      alignItems="center"
      justifyContent="start"
      sx={{
        bgcolor: '#ffffff',
        width: '773px',
        height: '1094px',
        // border: '1px solid #000000',
        position: "relative",
      }}
      className="printArea"
      ref={ref}
    >
      <Image src={imgUrl} alt={'거래명세서_이미지'} width={773} height={1094}/>
    </Stack>
  );
});

export default TSImgPreview;
