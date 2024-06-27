import React from "react";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";
import dynamic from "next/dynamic";
import CommentWrite from "./CommentWrite";

const LazyCommentList = dynamic(() => import("./CommentList"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

const CommentTab = () => {
  return (
    <>
      {/* Comment Write */}
      <CommentWrite />

      {/* Commetn List */}
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyCommentList />
      </ErrorContainer>
    </>
  );
};

export default CommentTab;
