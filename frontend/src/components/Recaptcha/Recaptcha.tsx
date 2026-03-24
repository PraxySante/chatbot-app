import { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNotification } from '../../hooks/NotificationProvider';
import useRecaptcha from '../../hooks/RecaptchaProvider';
import {
  STATUS_ERROR_UNAUTHORIZED,
  STATUS_SUCCESS,
} from '../../constants/notifications.constants';
import { useClient } from '../../hooks/ClientProvider';
import { useLanguage } from '../../hooks/UseLanguage';

export default function Recaptcha() {
  const recaptcha = useRef<ReCAPTCHA | null>(null);

  const { getMessageToNotification } = useNotification();
  const { verifyHuman, forcingNoRecaptcha } = useRecaptcha();
  const { configClient } = useClient();
  const { userLanguage } = useLanguage();

  useEffect(() => {
    configClient?.options?.RecaptchaOption === true ? null : forcingNoRecaptcha();
  }, []);

  async function submitForm() {
    if (!recaptcha.current) {
      getMessageToNotification(
        STATUS_ERROR_UNAUTHORIZED,
        userLanguage ? userLanguage?.error_msg_recaptcha : ''
      );
      return;
    }

    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      getMessageToNotification(
        STATUS_ERROR_UNAUTHORIZED,
        userLanguage ? userLanguage?.error_msg_recaptcha : ''
      );
    } else {
      const responseApi = await verifyHuman(captchaValue);
      if (responseApi?.status !== STATUS_SUCCESS) {
        getMessageToNotification(
          STATUS_ERROR_UNAUTHORIZED,
          userLanguage ? userLanguage?.error_msg_recaptcha : ''
        );
      }
      getMessageToNotification(
        STATUS_SUCCESS,
        userLanguage ? userLanguage?.success_msg_recaptcha : ''
      );
    }
  }

  return (
    <>
      {configClient?.options?.RecaptchaOption === true ? (
        <ReCAPTCHA
          onChange={submitForm}
          ref={recaptcha}
          sitekey={import.meta.env.VITE_KEY_SITE}
        />
      ) : null}
    </>
  );
}
