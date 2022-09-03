import Head from 'next/head';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { colors } from 'styles/theme';

import Button from 'components/Button';
import GitHub from 'components/Icons/GitHub';
import Logo from 'components/Icons/Logo';

import { loginGitHub } from 'myFirebase/client';
import useUser, { USER_STATES } from 'hooks/useUser';

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace('/home');
  }, [user]);

  const handleLogin = async () => {
    loginGitHub().catch((err) => {
      console.log(err);
    });
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

        <section>
          <Logo width="100" />
          <h1>Devter</h1>
          <h2>Talk about development with dvelopers 👨‍💻👩‍💻</h2>
          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleLogin}>
                <GitHub
                  fill={'#fff'}
                  width={24}
                  height={24}
                />
                Login with GitHub
              </Button>
            )}
            {user === USER_STATES.NOT_KNOW && (
              <img
                src="/spinner.gif"
                alt="spinner"
              />
            )}
          </div>
        </section>

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
