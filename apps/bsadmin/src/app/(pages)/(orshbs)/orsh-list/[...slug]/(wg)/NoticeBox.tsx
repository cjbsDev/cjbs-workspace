import React from "react";
import {cjbsTheme} from "cjbsDSTM";
import {Box, Typography} from "@mui/material";

const NoticeBox = ( props:any ) => {
  const serviceType = props.serviceType;
  console.log("serviceType~!~!", serviceType);
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
                  주문서 샘플명과 접수 튜브명이 매칭되도록 기재바랍니다,
                </Typography>
              </li>
              <li style={{ color: "#EF151E" }}>
                <Typography variant="body2">
                  분석결과는 EzBioCloud로 업로드 됩니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  DNA는 요청 시에만 반송드리며,그 외 DNA및 샘플(cell pellet)은1개월 후 자동 폐기됩니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Sequencing raw data 보관기간은1년이오니,만료 전에 데이터센터에서 다운로드 바랍니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  16S rRNA identification(Sanger) 진행 시, QC 기간이 1주일 연장됩니다.
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
                  분석 결과는 EzBioCloud로 업로드 됩니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Raw data는 fastq 또는 fasta 파일로 전달바랍니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Strain name과 locus tag 미입력 시, 샘플명으로 대체합니다.
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
                  분석결과는 EzBioCloud로 업로드 됩니다.
                </Typography>
              </li>
              <li style={{ color: "#EF151E" }}>
                <Typography variant="body2">
                  주문서 샘플명과 접수 튜브명이 매칭되도록 기재바랍니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Index 사용하여 library 제작 진행시, index 정보는 필수기입사항 입니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  샘플은 결과발송 1개월 후 자동폐기 됩니다.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Sequencing only 서비스는 sequencing raw data만 제공합니다.
                </Typography>
              </li>
              <li style={{ color: "#EF151E" }}>
                <Typography variant="body2">
                  Sequencing raw data는 1년간만 보관 되오니, 만료전에 다운로드 받으시길 바랍니다.
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
