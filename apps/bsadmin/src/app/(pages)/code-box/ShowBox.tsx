import { useFormContext } from "react-hook-form";

export default function ShowBox() {
  const methods = useFormContext();
  const moreDetail = methods.watch("checkTest");
  return moreDetail === "Y" && <h1>Hello, Dashboard Page!</h1>;
}
