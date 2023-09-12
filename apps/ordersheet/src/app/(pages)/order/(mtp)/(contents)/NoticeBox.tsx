import React from "react";
import {cjbsTheme} from "cjbsDSTM";
import {Box, Typography} from "@mui/material";

const NoticeBox = ( props:any ) => {
  const serviceType = props.serviceType;
  console.log("serviceType~!~!", serviceType);
  // const handleAddFields = (count) => {
  //   console.log("Count~!~!", count);
  //   for (let i = 0; i < count; i++) {
  //     append({ name: "" }); // 입력된 수만큼 항목을 추가합니다.
  //   }
  // };
  return (
    <>
      {serviceType === 'fs' ?
        (
          <Box
            alignItems="start"
            sx={{
              backgroundColor: cjbsTheme.palette.grey["50"],
              paddingX: 5,
              paddingY: 3,
              mb: 2,
            }}
          >
            <ul>
              <li style={{ color: "#EF151E" }}>
                <Typography variant="body2">
                  보내주시는 샘플에는 주문서의 샘플명과 매칭되도록 각 샘플에 표기 바랍니다.
                </Typography>
              </li>
              <li style={{ color: "#EF151E" }}>
                <Typography variant="body2">
                  분석 결과는 EzBioCloud로 업로드됩니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  DNA는 요청 시에만 반송되며, 샘플(분변, 토양 및 기타 환경샘플)은
                  1개월 후 자동폐기됩니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서
                  다운로드 바랍니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  분석 결과는 연구용으로만 사용이 가능합니다.
                </Typography>
              </li>
            </ul>
          </Box>
        ) : (
          ''
        )
      }

      {serviceType === 'ao' ?
        (
          <Box
            alignItems="start"
            sx={{
              backgroundColor: cjbsTheme.palette.grey["50"],
              paddingX: 5,
              paddingY: 3,
              mb: 2,
            }}
          >
            <ul>
              {/*<li style={{ color: "#EF151E" }}>*/}
              {/*  <Typography variant="body2">*/}
              {/*    보내주시는 샘플에는 주문서의 샘플명과 매칭되도록 각 샘플에 표기 바랍니다.*/}
              {/*  </Typography>*/}
              {/*</li>*/}
              <li style={{ color: "#EF151E" }}>
                <Typography variant="body2">
                  분석 결과는 EzBioCloud로 업로드됩니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  샘플명은 영문, 숫자, -(hyphen)만 입력이 가능합니다.
                </Typography>
              </li>
              <li style={{ color: "#EF151E" }}>
                <Typography variant="body2">
                  원활한 분석 진행을 위하여 실험에 사용한 primer정보 기재를 권장합니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  분석 결과는 연구용으로만 사용이 가능합니다.
                </Typography>
              </li>
            </ul>
          </Box>
        ) : (
          ''
        )
      }

      {serviceType === 'so' ?
        (
          <Box
            alignItems="start"
            sx={{
              backgroundColor: cjbsTheme.palette.grey["50"],
              paddingX: 5,
              paddingY: 3,
              mb: 2,
            }}
          >
            <ul>
              <li style={{ color: "#EF151E" }}>
                <Typography variant="body2">
                  주문서 샘플명과 튜브 샘플명의 표기가 매칭되도록 기입해주세요.
                </Typography>
              </li>
              <li style={{ color: "#EF151E" }}>
                <Typography variant="body2">
                  Index 정보는 필수 기입 사항입니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  샘플은 결과발송 1개월 후 자동 폐기됩니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Sequencing only 서비스는sequencing raw data만 제공합니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서 다운로드 바랍니다.
                </Typography>
              </li>
            </ul>
          </Box>
        ) : (
          ''
        )
      }

    </>

  );
};

export default NoticeBox;
