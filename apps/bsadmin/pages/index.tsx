import { ContainedButton, OutlinedButton, LinkButton, getCommonLayout } from "ui";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <ContainedButton buttonName='TestName1' />
      <OutlinedButton buttonName='TestName2' />
      <LinkButton buttonName='Go to order' pathName='order' />
    </div>
  );
}
