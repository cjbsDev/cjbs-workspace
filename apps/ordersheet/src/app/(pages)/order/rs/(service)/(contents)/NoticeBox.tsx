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
                  그룹정보가 있을 경우,그룹명도 함께 기재 바랍니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Reference Taxonomy와 Accession No. 정보는 분석시에 사용되오니, 정확히 기입 부탁드립니다.
                </Typography>
                <Typography variant="body2">
                  CJ바이오사이언스에서 genome 분석한 균주가 reference인 경우, 비고란에 오더번호를 기입바랍니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  RNA샘플은 반송이 불가하며,분석완료 후 1개월 후 자동 폐기됩니다.
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
              <li style={{ color: "#EF151E" }}>
                <Typography variant="body2">
                  분석 결과는 EzBioCloud로 업로드됩니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  그룹정보가 있을 경우,그룹명도 함께 기재 바랍니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Reference Taxonomy와 Accession No. 정보는 분석시에 사용되오니, 정확히 기입 부탁드립니다.
                </Typography>
                <Typography variant="body2">
                  CJ바이오사이언스에서 genome 분석한 균주가 reference인 경우, 비고란에 오더번호를 기입바랍니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  RNA샘플은 반송이 불가하며,분석완료 후 1개월 후 자동 폐기됩니다.
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
                  분석결과는 EzBioCloud로 업로드 되오니, 위 해당칸에 EzBioCloud ID를 반드기 기재 바랍니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  RNA샘플은 반송이 불가하며,서비스 완료 후 1개월 후 자동폐기됩니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Sequencing raw data 보관기간은1년이오니, 만료전에 데이터센터에서 다운로드 바랍니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  분석결과는 연구용으로만 사용이 가능합니다.
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
