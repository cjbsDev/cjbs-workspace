import React, {useState} from 'react';
import { toast } from "react-toastify";

type onCopyFn = (text: string) => Promise<boolean>;

function UseCopyClipBoard(): [boolean, onCopyFn] {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const onCopy: onCopyFn = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);
      toast("Clipboard 복사완료!");

      return true;
    } catch (error) {
      console.error(error);
      setIsCopy(false);

      return false;
    }
  };

  return [isCopy, onCopy];
}

export default UseCopyClipBoard;