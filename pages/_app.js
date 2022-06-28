import Layout from "../components/Layout";
import "../styles/globals.css";
export default function APP({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
