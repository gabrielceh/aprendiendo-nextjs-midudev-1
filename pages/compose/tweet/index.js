import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useUser from 'hooks/useUser';
import { addDevit, uploadImage } from 'myFirebase/client';
import { getDownloadURL } from 'firebase/storage';

import AppLayout from 'components/AppLayout';
import Button from 'components/Button';
import Avatar from 'components/Avatar';

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const user = useUser();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW);
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [progress, setProgress] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (task) {
      const onProgress = (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        progress < 100 ? setProgress(progress) : setProgress(null);
      };

      const onError = () => {};

      const onComplete = () => {
        console.log('completada');
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
          console.log(downloadURL);
        });
      };
      console.log(task);
      task.on('state_changed', onProgress, onError, onComplete);
    }
  }, [task]);

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push('/home');
      })
      .catch((err) => {
        console.log(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    console.log('Enter');
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    console.log('Leave');
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log(file);
    setDrag(DRAG_IMAGE_STATES.NONE);

    const task = uploadImage(file);
    setTask(task);
  };

  const isButtonDisable = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <>
      <Head>
        <title>Crear devit | Devter</title>
      </Head>
      <AppLayout>
        <section className="form-container">
          {user && (
            <section className="avatar-container">
              <Avatar src={user.avatar} />
            </section>
          )}
          <form onSubmit={handleSubmit}>
            <textarea
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              placeholder="¿Qué está pasando?"
              value={message}
              onChange={handleChange}
            ></textarea>
            {progress && (
              <progress
                value={progress}
                max="100"
              >
                Subiendo...
              </progress>
            )}
            {imgURL && (
              <section className="remove-img">
                <button onClick={() => setImgURL(null)}>x</button>
                <img
                  src={imgURL}
                  alt={imgURL}
                />
              </section>
            )}
            <div>
              <Button disabled={isButtonDisable}>Devitear</Button>
            </div>
          </form>
        </section>
      </AppLayout>

      <style jsx>{`
        .form-container {
          align-items: flex-start;
          display: flex;
        }
        .avatar-container {
          margin-top: 10px;
          padding-left: 10px;
        }
        div {
          padding: 15px;
        }
        form {
          padding: 10px;
        }
        .remove-img {
          position: relative;
          width: 100%;
        }
        button {
          background: rgba(0, 0, 0, 0.5);
          border: 0;
          border-radius: 999px;
          color: #fff;
          cursor: pointer;
          font-size: 24px;
          height: 32px;
          position: absolute;
          right: 0;
          width: 32px;
        }
        img {
          border-radius: 10px;
          height: auto;
          width: 30%;
        }
        textarea {
          border: 0;
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: ${drag === DRAG_IMAGE_STATES.DRAG_OVER ? '3px dashed #09f' : '0'};
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  );
}
