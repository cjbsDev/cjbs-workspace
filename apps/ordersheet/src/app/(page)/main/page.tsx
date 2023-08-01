"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Stack, Divider } from "@mui/material";
import MyIcon from "icon/myIcon";
import { cjbsTheme, ContainedButton, LinkButton } from "cjbsDSTM";
import Link from "next/link";
import mailImg from "@public/img/icons/mail.png";
import Image from "next/image";
import mtpImg from "@public/img/icons/MTP.png";
import shotgunImg from "@public/img/icons/Shotgun.png";
import wgImg from "@public/img/icons/wc.png";
import rsImg from "@public/img/icons/RS.png";

const Page = () => {
  const router = useRouter();

  return (
    <Container disableGutters={true}>
      <Box
        sx={{
          // mb: 20,
          // mt: 11,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-between",
          padding: "50px 0 50px 0",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
          }}
        >
          <MyIcon icon="registration" size={24} />
          <Typography variant="title2" sx={{ ml: "4px" }}>
            주문서 등록
          </Typography>
        </Box>
        <Box sx={{ mt: "18px" }}>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                height: "372px",
                width: "280px",
                border: 1,
                borderColor: cjbsTheme.palette.grey["400"],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <Stack spacing={0} sx={{ width: "240px" }}>
                <Box
                  sx={{
                    height: "100px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image src={mtpImg} alt="mtpImg" width={47} />
                </Box>

                <Typography variant="h4" sx={{ mt: 1 }}>
                  MTP
                </Typography>
                <Typography variant="title2" sx={{ fontSize: 14 }}>
                  (Microbiome Taxonomic Profiling)
                </Typography>

                <Divider
                  sx={{
                    mb: 2,
                    mt: 2,
                    backgroundColor: cjbsTheme.palette.grey["400"],
                  }}
                />

                <Typography variant="subtitle2">Amplicon Sequencing</Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  미생물 군집 분석
                </Typography>
                <ContainedButton
                  buttonName="주문하기"
                  size="Large"
                  sx={{ mt: 3 }}
                />
                <Link
                  href="https://www.cjbioscience.com/ngs/service/mtp"
                  target="_blank"
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Guide <MyIcon icon="info-circle" size={18} />
                  </Typography>
                </Link>
              </Stack>
            </Box>

            <Box
              sx={{
                height: "372px",
                width: "280px",
                border: 1,
                borderColor: cjbsTheme.palette.grey["400"],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <Stack spacing={0} sx={{ width: "240px" }}>
                <Box
                  sx={{
                    height: "100px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image src={shotgunImg} alt="mtpImg" width={50} />
                </Box>

                <Typography variant="h4" sx={{ mt: 1, lineHeight: 1.2 }}>
                  Shotgun
                  <br />
                  Metagenome
                </Typography>

                <Divider
                  sx={{
                    mb: 2,
                    mt: 1.5,
                    backgroundColor: cjbsTheme.palette.grey["400"],
                  }}
                />

                <Typography variant="subtitle2">Shotgun Sequencing</Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  샷건 메타지놈 분석
                </Typography>
                <ContainedButton
                  buttonName="주문하기"
                  size="Large"
                  sx={{ mt: 3 }}
                />
                <Link
                  href="https://www.cjbioscience.com/ngs/service/shotgun"
                  target="_blank"
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Guide <MyIcon icon="info-circle" size={18} />
                  </Typography>
                </Link>
              </Stack>
            </Box>

            <Box
              sx={{
                height: "372px",
                width: "280px",
                border: 1,
                borderColor: cjbsTheme.palette.grey["400"],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <Stack spacing={0} sx={{ width: "240px" }}>
                <Box
                  sx={{
                    height: "100px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image src={wgImg} alt="mtpImg" width={47} />
                </Box>

                <Typography variant="h4" sx={{ mt: 1 }}>
                  WG
                </Typography>

                <Divider
                  sx={{
                    mb: 2,
                    mt: 4.5,
                    backgroundColor: cjbsTheme.palette.grey["400"],
                  }}
                />

                <Typography variant="subtitle2">
                  Whole Genome Sequencing
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  전장 유전체 분석
                </Typography>
                <ContainedButton
                  buttonName="주문하기"
                  size="Large"
                  sx={{ mt: 3 }}
                />
                <Link
                  href="https://www.cjbioscience.com/ngs/service/genome"
                  target="_blank"
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Guide <MyIcon icon="info-circle" size={18} />
                  </Typography>
                </Link>
              </Stack>
            </Box>

            <Box
              sx={{
                height: "372px",
                width: "280px",
                border: 1,
                borderColor: cjbsTheme.palette.grey["400"],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <Stack spacing={0} sx={{ width: "240px" }}>
                <Box
                  sx={{
                    height: "100px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image src={rsImg} alt="mtpImg" width={43} />
                </Box>

                <Typography variant="h4" sx={{ mt: 1 }}>
                  RS
                </Typography>

                <Divider
                  sx={{
                    mb: 2,
                    mt: 4.5,
                    backgroundColor: cjbsTheme.palette.grey["400"],
                  }}
                />

                <Typography variant="subtitle2">RNA Sequencing</Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  전사체 분석
                </Typography>
                <ContainedButton
                  buttonName="주문하기"
                  size="Large"
                  sx={{ mt: 3 }}
                />
                <Link
                  href="https://www.cjbioscience.com/ngs/service/rna"
                  target="_blank"
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Guide <MyIcon icon="info-circle" size={18} />
                  </Typography>
                </Link>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "54px",
            border: 1,
            borderColor: cjbsTheme.palette.grey["400"],
            mt: "21px",
          }}
        >
          <Typography variant="title2">내 주문내역 보기&nbsp;</Typography>
          <Typography variant="title2" sx={{ color: "#006ECD" }}>
            <Link href="/test">17건</Link>
          </Typography>
          <MyIcon icon="cheveron-right" size={18} />
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
