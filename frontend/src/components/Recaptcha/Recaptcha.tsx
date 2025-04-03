import axios from 'axios';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNotification } from '../../hooks/NotificationProvider';

export default function Recaptcha() {
  const recaptcha = useRef<ReCAPTCHA | null>(null);

  const {getMessageToNotification} = useNotification()

  async function submitForm(event: any) {
    event.preventDefault();

    if (!recaptcha.current) {
      alert('ReCAPTCHA not loaded yet!');
      return;
    }

    const captchaValue = recaptcha.current.getValue();
    console.log('🚀 ~ submitForm ~ captchaValue:', captchaValue);
    if (!captchaValue) {
      getMessageToNotification(401, "Veuillez confirmer que vous n'etes pas un robot")
    } else {
      const data: any = await axios.post(
        'http://localhost:8000/api/verify-user',
        { captchaValue: captchaValue }
      );
      console.log(data);
    }
  }

  return (
    <form onSubmit={submitForm}>
      <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_KEY_SITE} />
      <button type="submit">Clique</button>
    </form>
  );
}
