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
        acct = results[0]; // 각각의 결과를 acct와 perm에 저장
        perm = results[1];
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

    console.log('acct', acct);
    console.log('perm', perm);
    console.log("!!!!!!!", rowsData)

    return (

        rowsData.map((data, index) => {
            const {sampleNo, sampleNm, source, sampleCategoryCc, anlsTargetGene, qc, memo} = data;

            return (
                <TableRow key={index}>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <Typography variant="body2">{index + 1}</Typography>
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <InputValidation
                            inputName={`sampleNm_${index}`}
                            required={true}
                            errorMessage="샘플명을 입력해 주세요."
                            sx={{width: 200}}
                        />
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <InputValidation
                            inputName={`source_${index}`}
                            required={true}
                            errorMessage="샘플출처를 입력해 주세요."
                            sx={{width: 200}}
                        />
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <SelectBox
                            required={true}
                            errorMessage="값을 선택해 주세요."
                            inputName={`sampleCategoryCc_${index}`}
                            options={acct.data.data}
                            sx={{width: '200px'}}
                        />
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <SelectBox
                            required={true}
                            errorMessage="값을 선택해 주세요."
                            inputName={`anlsTargetGene_${index}`}
                            options={perm.data.data}
                            sx={{width: '200px'}}
                        />
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <InputValidation
                            inputName={`qc_${index}`}
                            required={false}
                            sx={{width: 117}}
                        />
                    </TableCell>
                    <TableCell sx={{paddingX: 2, paddingY: 1}}>
                        <InputValidation
                            inputName={`memo_${index}`}
                            required={false}
                            sx={{width: 117}}
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
