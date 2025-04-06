import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNotification } from '../../hooks/NotificationProvider';
import useRecaptcha from '../../hooks/RecaptchaProvider';

export default function Recaptcha() {
  const recaptcha = useRef<ReCAPTCHA | null>(null);

  const { getMessageToNotification } = useNotification();
  const { verifyHuman } = useRecaptcha();

  async function submitForm() {
    if (!recaptcha.current) {
      getMessageToNotification(
        401,
        "Veuillez confirmer que vous n'etes pas un robot"
      );
      return;
    }

    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      getMessageToNotification(
        401,
        "Veuillez confirmer que vous n'etes pas un robot"
      );
    } else {
      const responseApi = await verifyHuman(captchaValue);
      if (responseApi?.status !== 200) {
        getMessageToNotification(
          401,
          "Veuillez confirmer que vous n'etes pas un robot"
        );
      }
      getMessageToNotification(
        200,
        "Vous pouvez désormais utiliser le chatbot."
      );
    }
  }

  return (
    <ReCAPTCHA
      onChange={submitForm}
      ref={recaptcha}
      sitekey={import.meta.env.VITE_KEY_SITE}
    />
  );
}
