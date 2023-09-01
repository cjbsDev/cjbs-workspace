import * as React from 'react';
import {Box, Stepper, Step, StepLabel, Button, Typography, StepIconProps, styled} from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import {Check} from "@mui/icons-material";
import {useRecoilState} from "recoil";
import {stepperStatusAtom} from "@app/recoil/atoms/stepperStatusAtom";
import {cjbsTheme} from "cjbsDSTM";

const steps = ['서비스 타입', '주문자 정보', '주문서 작성', '결제 정보', '주문 완료'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: cjbsTheme.palette.primary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: cjbsTheme.palette.primary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: cjbsTheme.palette.primary.main,
        }),
        '& .QontoStepIcon-completedIcon': {
            color: cjbsTheme.palette.primary.main,
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }),
);

export default function HorizontalLinearStepper() {

    // const [activeStep, setActiveStep] = React.useState(1);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const [activeStep, setActiveStep] = useRecoilState(stepperStatusAtom);

    // console.log("^^^^^^^^^^^^^^ " + activeStep);
    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(1);
    };

    function QontoStepIcon(props: StepIconProps) {
        const { active, completed, className } = props;

        return (
            <QontoStepIconRoot ownerState={{ active }} className={className}>
                {completed ? (
                    <Check className="QontoStepIcon-completedIcon" />
                ) : (
                    <div className="QontoStepIcon-circle" />
                )}
            </QontoStepIconRoot>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};

                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        // <Step key={label} {...stepProps}>
                        //     <StepLabel {...labelProps}>{label}</StepLabel>
                        // </Step>
                        <Step key={label}>
                            <StepLabel StepIconComponent={QontoStepIcon}>
                                <Typography variant="subtitle2" sx={{mt:-2}}>
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {/*<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>*/}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {/*<Button*/}
                        {/*    color="inherit"*/}
                        {/*    disabled={activeStep === 0}*/}
                        {/*    onClick={handleBack}*/}
                        {/*    sx={{ mr: 1 }}*/}
                        {/*>*/}
                        {/*    Back*/}
                        {/*</Button>*/}
                        {/*<Box sx={{ flex: '1 1 auto' }} />*/}
                        {/*<Button onClick={handleNext}>*/}
                        {/*    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
                        {/*</Button>*/}
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}