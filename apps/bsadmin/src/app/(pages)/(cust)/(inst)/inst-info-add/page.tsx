import RegForm from "./components/RegForm";
import dynamic from "next/dynamic";
const LazyRegForm = dynamic(() => import("./components/RegForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const InstAddPage = () => {
  return <LazyRegForm />;
};

export default InstAddPage;
