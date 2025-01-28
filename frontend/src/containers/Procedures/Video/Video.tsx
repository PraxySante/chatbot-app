export default function Video() {
  return (
    <>
      <div
        className="w-[640px] h-[360px] border rounded-lg"
      >
        <iframe
          title="Youtube iframe"
          width="640"
          height="360"
          src="//www.youtube-nocookie.com/embed/9-Hmn_vO7Sc?theme=light&amp;rel=&amp;controls=&amp;showinfo=&amp;autoplay=&amp;mute=&amp;start=&amp;end=&amp;loop=&amp;enablejsapi="
          allowFullScreen={false}
        ></iframe>
      </div>
    </>
  );
}
