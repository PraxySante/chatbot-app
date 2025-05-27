import { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNotification } from '../../hooks/NotificationProvider';
import useRecaptcha from '../../hooks/RecaptchaProvider';
import {
  ERROR_MESSAGE_RECAPTCHA,
  STATUS_ERROR_UNAUTHORIZED,
  STATUS_SUCCESS,
  SUCCESS_MESSAGE_RECAPTCHA,
} from '../../constants/notifications.constants';

export default function Recaptcha() {
  const recaptcha = useRef<ReCAPTCHA | null>(null);

  const { getMessageToNotification } = useNotification();
  const { verifyHuman, forcingNoRecaptcha } = useRecaptcha();

  useEffect(() => {
    import.meta.env.VITE_OPT_RECAPTCHA === 'true' ? null : forcingNoRecaptcha();
  }, []);

  async function submitForm() {
    if (!recaptcha.current) {
      getMessageToNotification(STATUS_ERROR_UNAUTHORIZED, ERROR_MESSAGE_RECAPTCHA);
      return;
    }

    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      getMessageToNotification(STATUS_ERROR_UNAUTHORIZED, ERROR_MESSAGE_RECAPTCHA);
    } else {
      const responseApi = await verifyHuman(captchaValue);
      if (responseApi?.status !== STATUS_SUCCESS) {
        getMessageToNotification(STATUS_ERROR_UNAUTHORIZED, ERROR_MESSAGE_RECAPTCHA);
      }
      getMessageToNotification(STATUS_SUCCESS, SUCCESS_MESSAGE_RECAPTCHA);
    }
  }

  return (
    <>
      {import.meta.env.VITE_OPT_RECAPTCHA === 'true' ? (
        <ReCAPTCHA
          onChange={submitForm}
          ref={recaptcha}
          sitekey={import.meta.env.VITE_KEY_SITE}
        />
      ) : null}
    </>
  );
}
