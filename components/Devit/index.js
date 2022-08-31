import Avatar from 'components/Avatar';

export default function Devit({ avatar, userName, content, userId, createdAt }) {
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
            <time>{createdAt}</time>
          </header>
          <p>{content}</p>
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
        time {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
