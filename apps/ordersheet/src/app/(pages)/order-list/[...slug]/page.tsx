"use client";

import MtpDetailPage from "./MtpDetailPage";
import ShotgunDetailPage from "./ShotgunDetailPage";
import WgDetailPage from "./WgDetailPage";
import {useParams} from "next/navigation";

const OrshMtpDetailPage = () => {
  // console.log("^^^^^^^^^^^^", params.slug)
  const params = useParams();
  console.log("params", params.slug[3]);
  const anlsType = params.slug[3];

  return (
    <>
      {anlsType === 'mtp' ? (
        <MtpDetailPage/>
      ) : ('')}
      {anlsType === 'sg' ? (
        <ShotgunDetailPage/>
      ) : ('')}
      {anlsType === 'wg' ? (
        <WgDetailPage/>
      ) : ('')}
    </>
  );
};
export default OrshMtpDetailPage;