import { useState, useEffect } from 'react';

import AppLayout from 'components/AppLayout';
import Devit from 'components/Devit';

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch('/api/statuses/home_timeline')
      .then((res) => res.json())
      .then((response) => setTimeline(response));
  }, []);

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.length > 0 &&
            timeline.map((devit) => (
              <Devit
                key={devit.id}
                avatar={devit.avatar}
                message={devit.message}
                username={devit.username}
                id={devit.id}
              />
            ))}
        </section>
        <nav></nav>
      </AppLayout>

      <style jsx>{`
        header {
          align-items: center;
          border-bottom: 1px solid #ccc;
          display: flex;
          height: 49px;
          position: sticky;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 24px;
          font-weight: 800;
        }
        section {
          padding-top: 56px;
        }
        nav {
          bottom: 0;
          border-top: 1px solid #ccc;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  );
}
