import { useCallback, useEffect, useMemo, useState } from 'react';

const isInWebApp = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;

const useAddToHomeScreenPrompt = () => {
  const [prompt, setPrompt] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [hasFinishedInstallation, setHasFinishedInstallation] = useState(isInWebApp);

  const finishInstallation = useCallback(function () {
    setHasFinishedInstallation(true);
  }, []);

  const promptToInstall = useCallback(
    function () {
      if (prompt) {
        prompt.prompt();
        prompt.userChoice.then(function (choiceResult) {
          if (choiceResult.outcome === 'accepted') {
            finishInstallation();
          }
        });
        return;
      }

      return Promise.reject(new Error('Tried installing before browser sent "beforeinstallprompt" event'));
    },
    [finishInstallation, prompt],
  );

  useEffect(
    function () {
      if (prompt) {
        setIsReady(true);
      }
    },
    [prompt],
  );

  useEffect(function () {
    function ready(e) {
      e.preventDefault();
      setPrompt(e);
    }

    window.addEventListener('beforeinstallprompt', ready);

    return function () {
      window.removeEventListener('beforeinstallprompt', ready);
    };
  }, []);

  return useMemo(
    () => ({
      isReady,
      promptToInstall,
      hasFinishedInstallation,
      finishInstallation,
    }),
    [isReady, promptToInstall, hasFinishedInstallation, finishInstallation],
  );
};

export default useAddToHomeScreenPrompt;
