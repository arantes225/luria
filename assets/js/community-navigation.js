// Presentation only: existing friends/challenge controls keep their own listeners and state.
(() => {
  "use strict";
  function init() {
    const nav = document.querySelector(".community-portals");
    const tabs = [...document.querySelectorAll("[data-community-tab]")];
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute("aria-controls")));
    if (!nav || tabs.length < 2 || panels.some(panel => !panel) || nav.dataset.initialized) return;
    nav.dataset.initialized = "true";
    panels.forEach(panel => panel.setAttribute("role", "region"));
    const addFriend = document.getElementById("friends-ref-add-toggle");
    function activate(area) {
      tabs.forEach((tab, index) => {
        const active = tab.dataset.communityTab === area;
        if(active) tab.setAttribute("aria-current", "page");
        else tab.removeAttribute("aria-current");
        if(tab.dataset.communityTab === "friends") tab.hidden = area === "friends";
        panels[index].hidden = !active;
        panels[index].inert = !active;
      });
      
      window.dispatchEvent(new CustomEvent('luria:community-tab',{detail:{area}}));
    }
    const fromHash = () => {
      if(!location.hash.startsWith('#room='))window.dispatchEvent(new CustomEvent('luria:room-exit'));
      activate(location.hash === "#community-rooms" || location.hash.startsWith("#room=") ? "rooms" : location.hash === "#community-groups" ? "groups" : "friends");
    };
    function navigate(area, leaveRoom = false, focusHeading = true) {
      if(leaveRoom)window.dispatchEvent(new CustomEvent('luria:room-exit'));
      activate(area);
      const destination = document.getElementById("community-" + area + "-panel");
      const heading = destination?.querySelector("h2");
      if (heading && focusHeading) { heading.tabIndex = -1; heading.focus({preventScroll:true}); }
      const hash = "#community-" + area;
      // The page has <base href="/">; bare fragments would otherwise open the root.
      if (location.hash !== hash) history.pushState(null, "", location.pathname + location.search + hash);
    }
    tabs.forEach(tab => {
      tab.addEventListener("click", event => {
        event.preventDefault();
        navigate(tab.dataset.communityTab, true);
      });

    });
    window.addEventListener("hashchange", fromHash);
    window.addEventListener("popstate", fromHash);
    window.addEventListener("luria:open-rooms", () => navigate("rooms"));
    document.querySelectorAll("[data-open-rooms]").forEach(button => button.addEventListener("click", () => navigate("rooms", true)));
    if (addFriend) addFriend.addEventListener("click", event => {
      event.preventDefault();
      navigate("friends", true, false);
      window.dispatchEvent(new CustomEvent("luria:visual-open",{detail:"sf-add-dialog"}));
      document.getElementById("community-friends")?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("friend-id-input")?.focus({ preventScroll: true });
    });
    fromHash();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
