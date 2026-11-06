
(() => {
  const selector = '#exam-status-filter, #ed-sort, .exam-quick-status select';
  function mount(select) {
    if (select.closest('.exam-theme-select')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'exam-theme-select';
    select.parentNode.insertBefore(wrapper, select);
    wrapper.append(select);
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'exam-theme-select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    const menu = document.createElement('div');
    menu.className = 'exam-theme-select-menu';
    menu.setAttribute('role', 'listbox');
    menu.hidden = true;
    wrapper.append(trigger, menu);
    function render() {
      trigger.textContent = select.selectedOptions[0]?.textContent.trim() || 'Selecionar';
      menu.replaceChildren();
      Array.from(select.options).forEach(option => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'exam-theme-select-option';
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', String(option.selected));
        item.textContent = option.textContent.trim();
        item.disabled = option.disabled;
        item.addEventListener('click', () => {
          select.value = option.value;
          select.dispatchEvent(new Event('change', {bubbles:true}));
          render();
          close();
          trigger.focus();
        });
        menu.append(item);
      });
    }
    function close() {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }
    trigger.addEventListener('click', () => {
      if (!menu.hidden) return close();
      document.querySelectorAll('.exam-theme-select-menu').forEach(other => {other.hidden = true;other.previousElementSibling?.setAttribute('aria-expanded','false');});
      render();
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    });
    wrapper.addEventListener('keydown', event => {
      if (event.key === 'Escape') {close();trigger.focus();}
      if (event.key === 'ArrowDown' && menu.hidden) {event.preventDefault();trigger.click();menu.querySelector('[aria-selected="true"]')?.focus();}
    });
    select.addEventListener('change', render);
    render();
  }
  function scan(root = document) {
    if (root.matches?.(selector)) mount(root);
    root.querySelectorAll?.(selector).forEach(mount);
  }
  document.addEventListener('click', event => {
    document.querySelectorAll('.exam-theme-select-menu').forEach(menu => {
      if (!menu.parentElement.contains(event.target)) {menu.hidden = true;menu.previousElementSibling?.setAttribute('aria-expanded','false');}
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    scan();
    new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === 1) scan(node);
    }))).observe(document.body, {childList:true,subtree:true});
  });
})();
