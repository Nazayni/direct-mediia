import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layouthelp';
import utilStyles from '../../styles/utils.module.css';

export default function FirstPost() {
  return (
    <>
      <Layout Help>
        <Head>
          <title>{siteTitle}</title>
        </Head>
      </Layout>
    </>
  );
}