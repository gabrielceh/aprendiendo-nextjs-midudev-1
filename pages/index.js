import { useEffect, useState } from "react";
import Head from "next/head";
import { colors } from "../styles/theme";

import { authStateChanged, loginGitHub } from "../firebase/client";

import AppLayout from "../components/AppLayout";
import Button from "../components/Button";
import GitHub from "../components/Icons/GitHub";

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
          <meta name="description" content="The best social network for devs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AppLayout>
          <section>
            <img src="/devter-logo.png" alt="logo" />
            <h1>Devter</h1>
            <h2>Talk about development with dvelopers 👨‍💻👩‍💻</h2>
            <div>
              {user === null && (
                <Button onClick={handleLogin}>
                  <GitHub fill={"#fff"} width={24} height={24} />
                  Login with GitHub
                </Button>
              )}
              {user && user.avatar && (
                <>
                  <div>
                    <img src={user.avatar} />
                    <strong>{user.username}</strong>
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
            color: ${colors.secondary};
            font-weight: 800;
            margin-bottom: 16px;
          }
          h2 {
            color: ${colors.primary};
            font-size: 21px;
            margin: 0;
          }
        `}</style>
      </div>
    </>
  );
}
