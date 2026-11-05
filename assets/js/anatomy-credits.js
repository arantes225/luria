/* TRAUBE · Sala de Anatomia — card de créditos discreto (botão no canto). */
(function () {
  var card = document.getElementById("creditos");
  var open = document.querySelector("[data-credits-open]");
  var close = document.querySelector("[data-credits-close]");
  if (!card || !open || !close) return;
  function set(visible) {
    card.hidden = !visible;
    open.setAttribute("aria-expanded", String(visible));
  }
  open.addEventListener("click", function () { set(card.hidden); });
  close.addEventListener("click", function () { set(false); open.focus(); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !card.hidden) set(false);
  });
  if (location.hash === "#creditos") set(true);
})();
