import useTimeAgo from 'hooks/useTimeAgo';

import Avatar from 'components/Avatar';
import useDateTimeFormat from 'hooks/useDateTimeFormat';

export default function Devit({ avatar, userName, content, userId, img, createdAt }) {
  const timeago = useTimeAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);

  return (
    <>
      <article>
        <div>
          <Avatar
            src={avatar}
            alt={userName}
          />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <time dateTime={createdAtFormated}>{timeago}</time>
          </header>
          <p>{content}</p>
          {img && (
            <img
              src={img}
              alt={'devit image'}
            />
          )}
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }
        div {
          padding-right: 10px;
        }
        p {
          margin: 0;
          line-height: 1.3125;
        }
        img {
          border-radius: 10px;
          height: auto;
          width: 30%;
        }
        time {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
