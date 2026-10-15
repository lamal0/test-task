const Modal = (() => {
  let backdrop, modal, closeBtn, form, emailInput, messageEl, submitBtn, triggerBtn;
  let lastFocused = null;

  function getFocusable() {
    return Array.from(
      modal.querySelectorAll('button, input, [href], select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.disabled);
  }

  function onKeydown(e) {
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const focusable = getFocusable();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function resetForm() {
    form.reset();
    messageEl.textContent = "";
    messageEl.className = "form-message";
    emailInput.disabled = false;
    submitBtn.disabled = false;
    submitBtn.textContent = t("modal.submit");
  }

  function open() {
    lastFocused = document.activeElement;
    resetForm();
    backdrop.hidden = false;
    document.addEventListener("keydown", onKeydown);
    emailInput.focus();
  }

  function close() {
    backdrop.hidden = true;
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function showMessage(text, kind) {
    messageEl.textContent = text;
    messageEl.className = `form-message form-message--${kind}`;
  }

  function statusToMessageKey(status) {
    if (status === 201) return "modal.success";
    if (status === 409) return "modal.errorDuplicate";
    if (status === 422) return "modal.errorInvalid";
    return "modal.errorGeneric";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!emailInput.checkValidity()) {
      showMessage(t("modal.errorInvalid"), "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = t("modal.submitting");

    try {
      const res = await fetch("api/subscribe.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput.value.trim() }),
      });

      const key = statusToMessageKey(res.status);
      showMessage(t(key), res.status === 201 ? "success" : "error");

      if (res.status === 201) {
        emailInput.disabled = true;
        submitBtn.disabled = true;
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = t("modal.submit");
      }
    } catch {
      showMessage(t("modal.errorGeneric"), "error");
      submitBtn.disabled = false;
      submitBtn.textContent = t("modal.submit");
    }
  }

  function init() {
    backdrop = document.getElementById("modal-backdrop");
    modal = document.getElementById("modal");
    closeBtn = document.getElementById("modal-close");
    form = document.getElementById("notify-form");
    emailInput = document.getElementById("email-input");
    messageEl = document.getElementById("form-message");
    submitBtn = document.getElementById("submit-btn");
    triggerBtn = document.getElementById("notify-btn");

    triggerBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close();
    });
    form.addEventListener("submit", handleSubmit);
  }

  return { init };
})();
