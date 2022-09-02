import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { fetchLatestDevits } from 'myFirebase/client';
import useUser from 'hooks/useUser';
import { colors } from 'styles/theme';

import AppLayout from 'components/AppLayout';
import Create from 'components/Icons/Create';
import Devit from 'components/Devit';
import Home from 'components/Icons/Home';
import Search from 'components/Icons/Search';

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user &&
      fetchLatestDevits().then((timeline) => {
        setTimeline(timeline);
      });
  }, [user]);

  return (
    <>
      <Head>
        <title>Inicio | Devter</title>
      </Head>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.length > 0 &&
            timeline.map(({ id, userId, userName, avatar, content, createdAt, img }) => (
              <Devit
                key={id}
                avatar={avatar}
                content={content}
                userName={userName}
                userId={userId}
                createdAt={createdAt}
                img={img}
              />
            ))}
        </section>
        <nav>
          <Link href="/home">
            <a>
              <Home
                stroke="#09f"
                width={32}
                height={32}
              />
            </a>
          </Link>

          <Link href="/compose/tweet">
            <a>
              <Create
                stroke="#09f"
                width={32}
                height={32}
              />
            </a>
          </Link>

          <Link href="/compose/tweet">
            <a>
              <Search
                stroke="#09f"
                width={32}
                height={32}
              />
            </a>
          </Link>
        </nav>
      </AppLayout>

      <style jsx>{`
        header {
          align-items: center;
          background-color: #ffffffcc;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          top: 0;
          width: 100%;
        }

        section {
          flex: 1;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }
        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  );
}
