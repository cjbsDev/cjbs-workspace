"use client";

import {
    TableRow,
    TableCell,
    Typography,
    IconButton,
} from "@mui/material";
import {
    InputValidation,
    SelectBox,
} from "cjbsDSTM";
import React from "react";
import MyIcon from "icon/myIcon";
import axios from "axios";


function getUserAccount() {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=sample&midValue=category`);
}

function getUserPermissions() {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=sample&midValue=genome`);
}

let acct:any;
let perm:any;
Promise
    .all([getUserAccount(), getUserPermissions()]) // Promise, then 사용
    .then(
        function (results) { // 응답 결과를 results 배열로 받아서
        acct = results[0].data.data; // 각각의 결과를 acct와 perm에 저장
        perm = results[1].data.data;
    });

interface rowsInputProps {
    sampleNo: number;
    sampleNm: string;
    source: string;
    sampleCategoryCc: string;
    anlsTargetGene: string;
    qc: string;
    memo: string;
}

export default function Page({rowsData, deleteTableRows}) {

    // console.log('acct', acct);
    // console.log('perm', perm);
    // console.log("!!!!!!!", rowsData)

    return (

        rowsData.map((data, index) => {
            let {sampleNo, sampleNm, source, sampleCategoryCc, anlsTargetGene, qc, memo} = data;
            // selectbox option 값 변경
            // for (const acctIndex in acct) {
            //     if(acct[acctIndex].optionName === sampleCategoryCc){
            //         sampleCategoryCc = acct[acctIndex].value;
            //     }
            // }
            // for (const permIndex in perm) {
            //     console.log()
            //     if(perm[permIndex].optionName === anlsTargetGene){
            //         anlsTargetGene = perm[permIndex].value;
            //     }
            // }

            return (
                <TableRow key={index}>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <Typography variant="body2">{index + 1}</Typography>
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <InputValidation
                            // inputName={`samples.${index}.sampleNm`}
                            inputName={`${index}_sampleNm`}
                            required={true}
                            errorMessage="샘플명을 입력해 주세요."
                            pattern={/^[A-Za-z0-9-]*$/}
                            patternErrMsg="영문, 숫자, -(하이픈)만 입력 가능합니다."
                            sx={{width: 200}}
                            defaultValue={sampleNm}
                        />
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <InputValidation
                            // inputName={`samples.${index}.source`}
                            inputName={`${index}_source`}
                            required={true}
                            errorMessage="샘플출처를 입력해 주세요."
                            sx={{width: 200}}
                            defaultValue={source}
                        />
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <SelectBox
                            required={true}
                            errorMessage="값을 선택해 주세요."
                            // inputName={`samples.${index}.sampleCategoryCc`}
                            inputName={`${index}_sampleCategoryCc`}
                            options={acct}
                            sx={{width: '200px'}}
                            defaultValue={sampleCategoryCc}
                        />
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <SelectBox
                            required={true}
                            errorMessage="값을 선택해 주세요."
                            // inputName={`samples.${index}.anlsTargetGene`}
                            inputName={`${index}_anlsTargetGene`}
                            options={perm}
                            sx={{width: '200px'}}
                            defaultValue={anlsTargetGene}
                        />
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <InputValidation
                            // inputName={`samples.${index}.qc`}
                            inputName={`${index}_qc`}
                            required={false}
                            sx={{width: 117}}
                            defaultValue={qc}
                        />
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <InputValidation
                            // inputName={`samples.${index}.memo`}
                            inputName={`${index}_memo`}
                            required={false}
                            sx={{width: 117}}
                            defaultValue={memo}
                        />
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <IconButton aria-label="delete" onClick={() => (deleteTableRows(index))}>
                            <MyIcon icon="trash" size={20}/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    )
}
