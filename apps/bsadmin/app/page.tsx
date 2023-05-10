import { LinkButton } from "ui";
export default function Page() {
  return (
    <>
      <h1>Hello, Next.js!</h1>
      <LinkButton buttonName='Go to order' pathName='order' />
    </>
  );
}
