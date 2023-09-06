import SubjectLayout from 'src/component/layout/SubjectLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  //return <MainLayout>{children}</MainLayout>;
  return <SubjectLayout>{children}</SubjectLayout>;
}
