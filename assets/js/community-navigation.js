// Presentation only: existing friends/challenge controls keep their own listeners and state.
(() => {
  "use strict";
  function init() {
    const nav = document.querySelector(".community-nav");
    const tabs = [...document.querySelectorAll("[data-community-tab]")];
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute("aria-controls")));
    if (!nav || tabs.length < 2 || panels.some(panel => !panel) || nav.dataset.initialized) return;
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
      
      window.dispatchEvent(new CustomEvent('luria:community-tab',{detail:{area}}));
    }
    const fromHash = () => {
      if(!location.hash.startsWith('#room='))window.dispatchEvent(new CustomEvent('luria:room-exit'));
      activate(location.hash === "#community-rooms" || location.hash.startsWith("#room=") ? "rooms" : location.hash === "#community-groups" ? "groups" : "friends");
    };
    function navigate(area, leaveRoom = false) {
      if(leaveRoom)window.dispatchEvent(new CustomEvent('luria:room-exit'));
      activate(area);
      const hash = "#community-" + area;
      // The page has <base href="/">; bare fragments would otherwise open the root.
      if (location.hash !== hash) history.pushState(null, "", location.pathname + location.search + hash);
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", event => {
        event.preventDefault();
        navigate(tab.dataset.communityTab, true);
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
    window.addEventListener("luria:open-rooms", () => navigate("rooms"));
    document.querySelectorAll("[data-open-rooms]").forEach(button => button.addEventListener("click", () => navigate("rooms", true)));
    if (addFriend) addFriend.addEventListener("click", event => {
      event.preventDefault();
      navigate("friends", true);
      const panel = document.getElementById("friends-ref-add-panel");
      window.dispatchEvent(new CustomEvent("luria:visual-open",{detail:"sf-add-dialog"}));
      document.getElementById("community-friends")?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("friend-id-input")?.focus({ preventScroll: true });
    });
    fromHash();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
