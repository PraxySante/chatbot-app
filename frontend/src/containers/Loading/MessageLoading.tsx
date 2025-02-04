import icons from '../../constants/icons';

type MessageLoadingType = {
  className: string;
  role: string;
};

export default function MessageLoading({
  className,
  role,
}: MessageLoadingType) {
  return (
    <>
      <section className={`wrapper ${className}`}>
        <button
          disabled
          type="button"
          className={`loader bg-${role}`}
        >
          {icons.spinner}
          {role === 'assistant'
            ? 'Je réfléchis, je vous réponds dans un instant'
            : "Vous êtes entrain d'ecrire/parler"}
        </button>
      </section>
    </>
  );
}
