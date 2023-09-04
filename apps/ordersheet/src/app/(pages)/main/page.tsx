"use client";
import React, {useEffect} from 'react';
import {Box, Container, Typography, Stack, Divider, Button, Popover} from "@mui/material";
import MyIcon from "icon/myIcon";
import {cjbsTheme, ContainedButton, LinkButton} from "cjbsDSTM";
import Link from "next/link";
import Image from "next/image";
import mtpImg from '@public/img/icons/MTP.png';
import shotgunImg from '@public/img/icons/Shotgun.png';
import wgImg from '@public/img/icons/wc.png';
import rsImg from '@public/img/icons/RS.png';
import {useRecoilState} from "recoil";
import {stepperStatusAtom} from "@app/recoil/atoms/stepperStatusAtom";


const Page = () => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [stepperNo, setStepperNo] = useRecoilState(stepperStatusAtom);

    useEffect(() => {
        setStepperNo(1);
    }, [])
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Container disableGutters={true}>
            <Box
                sx={{
                    // mb: 20,
                    // mt: 11,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'space-between',
                    padding: '50px 0 50px 0',
                    flexDirection: 'column',
                    height:"100%",
                }}
            >

                <Box sx={{ display: 'flex', alignContent: 'center' }}>
                    <MyIcon icon="registration" size={24} />
                    <Typography variant="h5" sx={{ml:"4px"}}>
                        주문서 등록
                    </Typography>
                </Box>
                <Box sx={{mt:'18px'}}>
                    <Stack
                        direction="row"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box sx={{
                            height: '372px',
                            width: '280px',
                            border: 1,
                            borderColor: cjbsTheme.palette.grey['400'],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                            textAlign: 'center'
                        }}>
                            <Stack spacing={0} sx={{width: '240px'}}>
                                <Box sx={{
                                    height: '100px',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image src={mtpImg} alt="mtpImg" width={47} />
                                </Box>

                                <Typography variant="h4" sx={{mt:1}}>
                                    MTP
                                </Typography>
                                <Typography sx={{fontSize:12}}>
                                    (Microbiome Taxonomic Profiling)
                                </Typography>

                                <Divider sx={{mb: 2, mt:2, backgroundColor: cjbsTheme.palette.grey['400']}} />

                                <Typography variant="subtitle2">
                                    Amplicon Sequencing
                                </Typography>
                                <Typography variant="subtitle2" sx={{mt:1}}>
                                    미생물 군집 분석
                                </Typography>
                                <Link
                                    href={{
                                        pathname: '/order',
                                        query: { name: 'mtp' },
                                    }}
                                >
                                    <ContainedButton buttonName="주문하기" size="large" fullWidth sx={{mt:3}}/>
                                </Link>
                                <Link
                                    href="https://www.cjbioscience.com/ngs/service/mtp"
                                    target="_blank"
                                    style={{
                                        marginTop: '10px',
                                        fontSize: '14px'
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        Guide <MyIcon icon="info-circle" size={18}/>
                                    </Typography>
                                </Link>
                            </Stack>
                        </Box>

                        <Box sx={{
                            height: '372px',
                            width: '280px',
                            border: 1,
                            borderColor: cjbsTheme.palette.grey['400'],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                            textAlign: 'center'
                        }}>
                            <Stack spacing={0} sx={{width: '240px'}}>
                                <Box sx={{
                                    height: '100px',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image src={shotgunImg} alt="mtpImg" width={50} />
                                </Box>

                                <Typography variant="h4" sx={{mt:1, lineHeight:1.2}}>
                                    Shotgun<br/>Metagenome
                                </Typography>

                                <Divider sx={{mb: 2, mt:2, backgroundColor: cjbsTheme.palette.grey['400']}} />

                                <Typography variant="subtitle2">
                                    Shotgun Sequencing
                                </Typography>
                                <Typography variant="subtitle2" sx={{mt:1}}>
                                    샷건 메타지놈 분석
                                </Typography>
                                {/*<Link*/}
                                {/*    href={{*/}
                                {/*        pathname: '/order',*/}
                                {/*        query: { name: 'mtp-shotgun' },*/}
                                {/*    }}*/}
                                {/*>*/}
                                    <ContainedButton buttonName="주문하기" size="large" fullWidth sx={{mt:3}} disabled={true}/>
                                {/*</Link>*/}
                                <Link
                                    href="https://www.cjbioscience.com/ngs/service/shotgun"
                                    target="_blank"
                                    style={{
                                        marginTop: '10px',
                                        fontSize: '14px'
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        Guide <MyIcon icon="info-circle" size={18}/>
                                    </Typography>
                                </Link>
                            </Stack>
                        </Box>

                        <Box sx={{
                            height: '372px',
                            width: '280px',
                            border: 1,
                            borderColor: cjbsTheme.palette.grey['400'],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                            textAlign: 'center'
                        }}>
                            <Stack spacing={0} sx={{width: '240px'}}>
                                <Box sx={{
                                    height: '100px',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image src={wgImg} alt="mtpImg" width={47} />
                                </Box>

                                <Typography variant="h4" sx={{mt:1}}>
                                    WG
                                </Typography>

                                <Divider sx={{mb: 2, mt:4.5, backgroundColor: cjbsTheme.palette.grey['400']}} />

                                <Typography variant="subtitle2">
                                    Whole Genome Sequencing
                                </Typography>
                                <Typography variant="subtitle2" sx={{mt:1}}>
                                    전장 유전체 분석
                                </Typography>
                                {/*<Link*/}
                                {/*    href={{*/}
                                {/*        pathname: '/order',*/}
                                {/*        query: { name: 'wg' },*/}
                                {/*    }}*/}
                                {/*>*/}
                                    <ContainedButton buttonName="주문하기" size="large" fullWidth sx={{mt:3}} disabled={true}/>
                                {/*</Link>*/}
                                <Link
                                    href="https://www.cjbioscience.com/ngs/service/genome"
                                    target="_blank"
                                    style={{
                                        marginTop: '10px',
                                        fontSize: '14px'
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        Guide <MyIcon icon="info-circle" size={18}/>
                                    </Typography>
                                </Link>
                            </Stack>
                        </Box>

                        <Box sx={{
                            height: '372px',
                            width: '280px',
                            border: 1,
                            borderColor: cjbsTheme.palette.grey['400'],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                            textAlign: 'center'
                        }}>
                            <Stack spacing={0} sx={{width: '240px'}}>
                                <Box sx={{
                                    height: '100px',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image src={rsImg} alt="mtpImg" width={43} />
                                </Box>

                                <Typography variant="h4" sx={{mt:1}}>
                                    RS
                                </Typography>

                                <Divider sx={{mb: 2, mt:4.5, backgroundColor: cjbsTheme.palette.grey['400']}} />

                                <Typography variant="subtitle2">
                                    RNA Sequencing
                                </Typography>
                                <Typography variant="subtitle2" sx={{mt:1}}>
                                    전사체 분석
                                </Typography>
                                {/*<Link*/}
                                {/*    href={{*/}
                                {/*        pathname: '/order',*/}
                                {/*        query: { name: 'rs' },*/}
                                {/*    }}*/}
                                {/*>*/}
                                    <ContainedButton buttonName="주문하기" size="large" fullWidth sx={{mt:3}} disabled={true}/>
                                {/*</Link>*/}
                                <Link
                                    href="https://www.cjbioscience.com/ngs/service/rna"
                                    target="_blank"
                                    style={{
                                        marginTop: '10px',
                                        fontSize: '14px'
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        Guide <MyIcon icon="info-circle" size={18}/>
                                    </Typography>
                                </Link>
                            </Stack>
                        </Box>

                    </Stack>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '54px',
                    border: 1,
                    borderColor: cjbsTheme.palette.grey['400'],
                    mt: '21px'
                }}>
                    <Typography variant="subtitle1">
                        내 주문내역 보기&nbsp;
                    </Typography>
                    <Typography variant="subtitle1" sx={{color: '#006ECD'}}>
                        <Link href="/order-list">
                        17건
                        </Link>
                    </Typography>
                    <MyIcon icon="cheveron-right" size={18} />
                </Box>

                <Box sx={{
                    position: 'absolute',
                    bottom: '50px',
                    right: '0px'
                }}>

                    <Button
                        aria-describedby={id}
                        variant="contained"
                        onClick={handleClick}
                        sx={{
                            p:"0px !important",
                            backgroundColor: cjbsTheme.palette.grey['700'],
                            width: '90px',
                            height: '90px',
                            borderRadius: "0px !important",
                            color: "#FFF"
                        }}
                    >
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <MyIcon icon="delivery" size={30} />
                            <Typography sx={{fontSize:12, mt:"6px"}}>
                                샘플 배송지
                            </Typography>
                        </Stack>
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Stack
                            sx={{p: 2}}
                            direction="column"
                            justifyContent="center"
                            alignItems="start"
                        >
                            <Box sx={{width: "100%"}}>
                                <Stack
                                  sx={{}}
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                    <Typography variant="subtitle2">샘플 접수처</Typography>
                                    <LinkButton
                                      buttonName="복사"
                                      startIcon={<MyIcon icon="duplicate" size={20} color={cjbsTheme.palette.primary.main}/>}
                                      // onClick={() => router.push("/cust-list")}
                                    />
                                </Stack>
                            </Box>
                            <Box sx={{width: "100%", marginY: 1}}>
                                <Divider />
                            </Box>
                            <Typography variant="subtitle2">NGS 실험실</Typography>
                            <Typography variant="body2">(16495) 경기 수원시 영통구 광교로42번길 55.</Typography>
                            <Typography variant="body2">CJ 블로썸파크 블루동 12층</Typography>
                            <Typography variant="body2">TEL. 031-8099-0670</Typography>
                        </Stack>

                    </Popover>
                    <Link href="http://www.cjbioscience.com/ngs/faq" target="_blank">
                        <Box sx={{
                            backgroundColor: cjbsTheme.palette.grey['200'],
                            width: '90px',
                            height: '90px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: "column",
                        }}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <MyIcon icon="FAQ" size={20} />
                                <Typography sx={{fontSize:12, mt:"6px"}}>
                                    FAQ
                                </Typography>
                            </Stack>
                        </Box>
                    </Link>

                </Box>

            </Box>
        </Container>
    );
};

export default Page;