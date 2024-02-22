import styles from "./styles.module.css";
export default function SampleListPopupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
