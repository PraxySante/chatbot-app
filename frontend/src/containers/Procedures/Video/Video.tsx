type VideoType = {
  fileDocument: string;
};

export default function Video({ fileDocument }: VideoType) {
  return (
    <>
      <div className="w-[640px] h-[360px] border rounded-lg">
        <p>Voici un lien d'une vidéo :</p>
        <iframe
          title="Youtube vidéo"
          width="640"
          height="360"
          src={`//www.${fileDocument}?theme=light&amp;rel=&amp;controls=&amp;showinfo=&amp;autoplay=&amp;mute=&amp;start=&amp;end=&amp;loop=&amp;enablejsapi=`}
          allowFullScreen={false}
        ></iframe>
      </div>
    </>
  );
}
