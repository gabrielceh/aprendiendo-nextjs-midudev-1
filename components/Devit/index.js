import useTimeAgo from 'hooks/useTimeAgo';
import styles from './styles';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Avatar from 'components/Avatar';
import useDateTimeFormat from 'hooks/useDateTimeFormat';

export default function Devit({ id, avatar, userName, content, userId, img, createdAt }) {
  const timeago = useTimeAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);
  const router = useRouter();

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };

  return (
    <>
      <article onClick={handleArticleClick}>
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
            <Link href={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>{timeago}</time>
              </a>
            </Link>
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

      <style jsx>{styles}</style>
    </>
  );
}
