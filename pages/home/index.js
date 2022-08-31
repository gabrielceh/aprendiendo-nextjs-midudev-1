import { useState, useEffect } from 'react';

import AppLayout from 'components/AppLayout';
import Devit from 'components/Devit';
import useUser from 'hooks/useUser';

import { fetchLatestDevits } from 'myFirebase/client';

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
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.length > 0 &&
            timeline.map(({ id, userId, userName, avatar, content, createdAt }) => (
              <Devit
                key={id}
                avatar={avatar}
                content={content}
                userName={userName}
                userId={userId}
                createdAt={createdAt}
              />
            ))}
        </section>
        <nav></nav>
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

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  );
}
