/* TRAUBE · Corpo dissecável — card de créditos discreto. */
(function () {
  var card = document.getElementById("credits-card");
  var close = document.getElementById("credits-close");
  var triggers = document.querySelectorAll(".credits-trigger");
  if (!card || !close) return;
  function set(v) { card.hidden = !v; triggers.forEach(function (t) { t.setAttribute("aria-expanded", String(v)); }); }
  triggers.forEach(function (t) { t.addEventListener("click", function () { set(card.hidden); }); });
  close.addEventListener("click", function () { set(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !card.hidden) set(false); });
})();
