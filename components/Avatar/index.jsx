export default function Avatar({ alt, src }) {
  return (
    <>
      <img
        alt={alt}
        src={src}
        title={alt}
      />
    </>
  );
}
