// Presentation only: existing friends/challenge controls keep their own listeners and state.
(() => {
  "use strict";
  function init() {
    const nav = document.querySelector(".community-nav");
    const tabs = [...document.querySelectorAll("[data-community-tab]")];
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute("aria-controls")));
    if (!nav || tabs.length !== 2 || panels.some(panel => !panel) || nav.dataset.initialized) return;
    nav.dataset.initialized = "true";
    nav.setAttribute("role", "tablist");
    tabs.forEach(tab => tab.setAttribute("role", "tab"));
    panels.forEach(panel => panel.setAttribute("role", "tabpanel"));
    const addFriend = document.getElementById("friends-ref-add-toggle");
    function activate(area) {
      tabs.forEach((tab, index) => {
        const active = tab.dataset.communityTab === area;
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[index].hidden = !active;
        panels[index].inert = !active;
      });
      if (addFriend) addFriend.hidden = area !== "friends";
    }
    const fromHash = () => activate(location.hash === "#studyrats-card" ? "challenges" : "friends");
    function navigate(area) {
      activate(area);
      const hash = area === "challenges" ? "#studyrats-card" : "#community-friends";
      // The page has <base href="/">; bare fragments would otherwise open the root.
      if (location.hash !== hash) history.pushState(null, "", location.pathname + location.search + hash);
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", event => {
        event.preventDefault();
        navigate(tab.dataset.communityTab);
      });
      tab.addEventListener("keydown", event => {
        let next;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        tabs[next].click();
        tabs[next].focus();
      });
    });
    window.addEventListener("hashchange", fromHash);
    window.addEventListener("popstate", fromHash);
    if (addFriend) addFriend.addEventListener("click", event => {
      event.preventDefault();
      navigate("friends");
      document.getElementById("community-friends")?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("friend-id-input")?.focus({ preventScroll: true });
    });
    fromHash();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
