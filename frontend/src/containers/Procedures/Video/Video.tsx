import { TITLE_YOUTUBE, TITLE_YOUTUBE_ATTRIBUT } from "../../../constants/chat.constants";
import { VideoType } from "../../../types/panel/panel.type";

export default function Video({ fileDocument }: VideoType) {
  return (
    <>
      <div className="w-[640px] h-[360px] border rounded-lg">
        <p>{TITLE_YOUTUBE}</p>
        <iframe
          title={TITLE_YOUTUBE_ATTRIBUT}
          width="640"
          height="360"
          src={`//www.${fileDocument}?theme=light&amp;rel=&amp;controls=&amp;showinfo=&amp;autoplay=&amp;mute=&amp;start=&amp;end=&amp;loop=&amp;enablejsapi=`}
          allowFullScreen={false}
        ></iframe>
      </div>
    </>
  );
}
