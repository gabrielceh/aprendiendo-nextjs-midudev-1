import Head from 'next/head';
import { useEffect, useState } from 'react';

import { colors } from 'styles/theme';

import AppLayout from 'components/AppLayout';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import GitHub from 'components/Icons/GitHub';

import { authStateChanged, loginGitHub } from 'myFirebase/client';
import Logo from 'components/Icons/Logo';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initialUser = () => authStateChanged(setUser);

    initialUser();
  }, []);

  const handleLogin = async () => {
    try {
      const { avatar, username, email, url } = await loginGitHub();
      setUser({
        avatar,
        username,
        email,
        url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Head>
          <title>Devter App 🐦</title>
          <meta
            name="description"
            content="The best social network for devs"
          />
          <link
            rel="icon"
            href="/favicon.ico"
          />
        </Head>

        <AppLayout>
          <section>
            <Logo width="100" />
            <h1>Devter</h1>
            <h2>Talk about development with dvelopers 👨‍💻👩‍💻</h2>
            <div>
              {user === null && (
                <Button onClick={handleLogin}>
                  <GitHub
                    fill={'#fff'}
                    width={24}
                    height={24}
                  />
                  Login with GitHub
                </Button>
              )}
              {user && user.avatar && (
                <>
                  <div>
                    <Avatar
                      src={user.avatar}
                      alt={`${user.username} avatar`}
                      text={user.username}
                    />
                  </div>
                </>
              )}
            </div>
          </section>
        </AppLayout>

        <style jsx>{`
          section {
            height: 100%;
            display: grid;
            place-content: center;
            place-items: center;
          }
          div {
            margin-top: 16px;
          }
          img {
            width: 120px;
          }
          h1 {
            color: ${colors.primary};
            font-weight: 800;
            margin-bottom: 16px;
            font-size: 32px;
          }
          h2 {
            color: ${colors.secondary};
            font-size: 21px;
            margin: 0;
          }
        `}</style>
      </div>
    </>
  );
}
