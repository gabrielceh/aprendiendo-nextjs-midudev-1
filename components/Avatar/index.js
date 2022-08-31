import styles from './styles.module.css';

export default function Avatar({ alt, src, text }) {
  return (
    <>
      <div className={styles.container}>
        <img
          alt={alt}
          src={src}
          title={alt}
          className={styles.avatar}
        />
        {text && <strong>{text}</strong>}
      </div>
    </>
  );
}
