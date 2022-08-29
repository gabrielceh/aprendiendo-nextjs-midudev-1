import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import AppLayout from '../components/AppLayout';

export default function Home() {
  const router = useRouter();
  console.log(router);

  return (
    <div>
      <Head>
        <title>Devter App 🐦</title>
        <meta name="description" content="The best social network for devs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <h1>
          <a href="https://nextjs.org">DevTer</a>
        </h1>
        <nav>
          <Link href="/timeline">
            <a>timeline</a>
          </Link>
        </nav>
      </AppLayout>

      <style jsx>{`
        h1 {
          text-align: center;
        }
        a {
          color: #09f;
          text-decoration: none;
        }
        .another-title {
          color: #333;
          font-size: 24px;
        }
        nav {
          font-size: 24px;
          text-align: center;
          line-height: 24px;
        }
      `}</style>
    </div>
  );
}
