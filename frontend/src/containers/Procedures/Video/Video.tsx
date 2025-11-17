import { useLanguage } from "../../../hooks/UseLanguage";
import { VideoType } from "../../../types/panel/panel.type";

export default function Video({ fileDocument }: VideoType) {
  const { userLanguage } = useLanguage();
  return (
    <>
      <div className="w-[640px] h-[360px] border rounded-lg">
        <p>{userLanguage?.chat_yt_title}</p>
        <iframe
          title={userLanguage?.chat_yt_attribut}
          width="640"
          height="360"
          src={`//www.${fileDocument}?theme=light&amp;rel=&amp;controls=&amp;showinfo=&amp;autoplay=&amp;mute=&amp;start=&amp;end=&amp;loop=&amp;enablejsapi=`}
          allowFullScreen={false}
        ></iframe>
      </div>
    </>
  );
}
