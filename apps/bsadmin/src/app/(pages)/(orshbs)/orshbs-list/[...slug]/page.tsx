"use client";

import MtpDetailPage from "./MtpDetailPage";
import ShotgunDetailPage from "./ShotgunDetailPage";
import {useParams} from "next/navigation";

const Page = () => {
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
    </>
  );
};
export default Page;