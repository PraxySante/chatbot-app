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
          className="flex flex-row p-2 w-fit h-fit text-sm font-medium text-gray-900 bg-third text-white rounded-lg border border border-gray-200 hover:bg-gray-100 hover:text-secondary focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-secondary inline-flex items-center"
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
