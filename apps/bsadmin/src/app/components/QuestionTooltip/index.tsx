"use client";
import * as React from "react";

import { useState } from "react";
import {Popover, Stack, Typography} from "@mui/material";
import Image from "next/image";
import locusTagPrefix_img from "../../../../public/img/sampleHeader/locusTagPrefix_img.png";
import AccessionNo_img from '../../../../public/img/sampleHeader/AccessionNo_img.png';
import MyIcon from "icon/MyIcon";
import {cjbsTheme} from "cjbsDSTM";

export const QuestionTooltip = (props:any) => {
  const sampleCloumn = props.sampleCloumn;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <MyIcon icon="question-circle" size={20} onMouseEnter={handlePopoverOpen} />
      { sampleCloumn === "locus" && (
        <Popover
          id="mouse-over-popover"
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{width: 480, height: 175, border: '2px solid #006ECD', borderRadius: 1}}
          >
            <Image
              src={locusTagPrefix_img}
              alt="locusTagPrefix_img"
              width={140}
              height={140}
              quality={100}
              style={{marginLeft:25}}
            />
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
              sx={{paddingRight:4}}
            >
              <Typography variant="subtitle2">&quot;Locus tag prefix&quot; 란</Typography>{" "}
              <Typography variant="body2">Genome의 모든 유전자에 체계적으로 적용되는 식별자로 genome project 등록 시 필요합니다. 해당 정보는 gene name, contig name 등에 할당됩니다.</Typography>{" "}
            </Stack>
          </Stack>
        </Popover>
      )}

      { sampleCloumn === "accession" && (
        <Popover
          id="mouse-over-popover"
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{width: 512, height: 202, border: '2px solid #006ECD', borderRadius: 1}}
          >
            <Image
              src={AccessionNo_img}
              alt="AccessionNo_img"
              width={140}
              height={140}
              quality={100}
              style={{marginLeft:25}}
            />
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={0}
              sx={{paddingRight:4}}
            >
              <Typography variant="subtitle2">Q. Accession No. 는 어떻게 찾나요?</Typography>
              <Typography variant="body2">1. NCBI 접속 후reference genome 검색</Typography>
              <Typography variant="body2">2. [Genomes] - [Assembly] 에서 균주 선택</Typography>
              <Typography variant="body2">3. [GenBank or RefSeq assembly accession] 확인</Typography>
              <Typography
                variant="body2"
                color={cjbsTheme.palette.primary.main}
                sx={{
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '18px',
                  letterSpacing: '-0.25px',
                }}
              >
                * GCA_ : Submitter가 GenBank에 제공한 assembly
              </Typography>
              <Typography
                variant="body2"
                color={cjbsTheme.palette.primary.main}
                sx={{
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '18px',
                  letterSpacing: '-0.25px',
                }}
              >
                * GCF_ : NCBI의 고유한 database인 RefSeqdatabase를
              </Typography>
              <Typography
                variant="body2"
                color={cjbsTheme.palette.primary.main}
                sx={{
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '18px',
                  letterSpacing: '-0.25px',
                }}
              >
                이용하여 annotation이 달린 서열을 제공
              </Typography>
            </Stack>
          </Stack>
        </Popover>
      )}

      { sampleCloumn === "supplyPrice" && (
        <Popover
          id="mouse-over-popover"
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{width: 480, height: 150, border: '2px solid #006ECD', borderRadius: 1}}
          >
            <MyIcon
              icon="exclamation-circle"
              size={100}
              style={{
                marginLeft: 25,
                color: "#b7b7b7"
              }}
            />
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
              sx={{ paddingRight:4, width: 320 }}
            >
              <Typography variant="subtitle2">안내</Typography>{" "}
              <Typography variant="body2">공급가액은 원래 공급가액에서</Typography>{" "}
              <Typography variant="body2">+- 10원 범위 내에서만 수정 가능합니다.</Typography>{" "}
            </Stack>
          </Stack>
        </Popover>
      )}

    </>

  );
};
