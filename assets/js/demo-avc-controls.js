// Preserve the demo's existing global controls without inline event attributes.
document.getElementById('btnPlay').addEventListener('click', () => togglePlay());
document.getElementById('btnReset').addEventListener('click', () => resetVideo());
document.getElementById('btnVoice').addEventListener('click', () => toggleVoice());
