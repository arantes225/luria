(() => {
  "use strict";

  const callButton = document.getElementById("alex-live-call-btn");
  const callText = document.getElementById("alex-live-call-text");
  const prompt = document.getElementById("alex-prompt");
  const form = document.getElementById("alex-form");
  const statusText = document.getElementById("alex-status-text");
  const output = document.getElementById("alex-output");
  if (!callButton || !prompt || !form || !statusText || !output) return;

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  let sessionActive = false;
  let waitingForAnswer = false;
  let responseTimer = 0;
  let lastSpokenResponse = "";

  const setCallState = (active) => {
    sessionActive = active;
    callButton.classList.toggle("is-listening", active);
    callButton.setAttribute("aria-pressed", String(active));
    callButton.setAttribute("aria-label", active ? "Encerrar conversa ao vivo por voz" : "Iniciar conversa ao vivo por voz");
    if (callText) callText.textContent = active ? "Encerrar Conversa por Voz" : "Conversar ao Vivo por Voz";
  };

  const resizePrompt = () => {
    prompt.style.height = "auto";
    prompt.style.height = Math.min(prompt.scrollHeight, 130) + "px";
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  };

  const speakResponse = () => {
    if (!sessionActive) return;
    if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
      waitingForAnswer = false;
      setCallState(false);
      statusText.textContent = "A resposta apareceu na tela. Este navegador não oferece reprodução de voz.";
      return;
    }
    const parts = ["alex-output-copy", "alex-res-concept", "alex-res-diff", "alex-res-exam", "alex-res-trick"]
      .map((id) => document.getElementById(id)?.textContent?.trim() || "")
      .filter(Boolean);
    const text = parts.join(" ").replace(/\s+/g, " ").trim();
    if (!text || text === lastSpokenResponse) return;
    lastSpokenResponse = text;
    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 0.98;
    utterance.pitch = 1;
    utterance.onstart = () => {
      statusText.textContent = "Professor Alex está respondendo por voz...";
    };
    utterance.onend = () => {
      waitingForAnswer = false;
      setCallState(false);
      statusText.textContent = "Resposta concluída. Toque no botão para fazer outra pergunta por voz.";
    };
    utterance.onerror = () => {
      waitingForAnswer = false;
      setCallState(false);
      statusText.textContent = "A resposta apareceu na tela. A reprodução de voz não está disponível neste navegador.";
    };
    window.speechSynthesis.speak(utterance);
  };

  const scheduleResponse = () => {
    window.clearTimeout(responseTimer);
    responseTimer = window.setTimeout(speakResponse, 1100);
  };

  if (Recognition) {
    recognition = new Recognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.addEventListener("start", () => {
      callButton.classList.add("is-listening");
      statusText.textContent = "Ouvindo sua pergunta...";
    });
    recognition.addEventListener("result", (event) => {
      const text = Array.from(event.results || [])
        .filter((result) => result.isFinal)
        .map((result) => result[0]?.transcript || "")
        .join(" ")
        .trim();
      if (!text) return;
      prompt.value = text;
      resizePrompt();
      waitingForAnswer = true;
      statusText.textContent = "Pergunta recebida. Professor Alex está formulando a resposta...";
      window.setTimeout(() => form.requestSubmit(), 0);
    });
    recognition.addEventListener("end", () => {
      callButton.classList.remove("is-listening");
      if (!waitingForAnswer && sessionActive) {
        setCallState(false);
        statusText.textContent = "Não consegui ouvir uma pergunta. Toque no botão e tente novamente.";
      }
    });
    recognition.addEventListener("error", (event) => {
      waitingForAnswer = false;
      setCallState(false);
      statusText.textContent = event.error === "not-allowed"
        ? "Permita o acesso ao microfone para conversar por voz."
        : "Não consegui acessar o microfone. Toque no botão e tente novamente.";
    });
  } else {
    callButton.disabled = true;
    callButton.title = "Conversa por voz não suportada neste navegador.";
    statusText.textContent = "A conversa por voz não é suportada neste navegador; use o campo de texto.";
  }

  callButton.addEventListener("click", () => {
    if (!recognition) return;
    if (sessionActive) {
      recognition.abort();
      stopSpeaking();
      waitingForAnswer = false;
      setCallState(false);
      statusText.textContent = "Conversa por voz encerrada.";
      return;
    }
    lastSpokenResponse = "";
    setCallState(true);
    try {
      recognition.start();
    } catch (error) {
      setCallState(false);
      statusText.textContent = "O microfone já está sendo inicializado. Tente novamente em um instante.";
    }
  });

  const observer = new MutationObserver(() => {
    if (sessionActive && waitingForAnswer && !output.hidden) scheduleResponse();
  });
  observer.observe(output, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["hidden"] });
})();
