type MessageLoadingType = {
  className: string;
};

export default function MessageLoading({ className }: MessageLoadingType) {
  return (
    <>
      <section className={`wrapper ${className}`}>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </section>
    </>
  );
}
