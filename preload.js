console.log('Preload loaded!');

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getInjectionHTML: () => {
    console.log('electronAPI.getInjectionHTML called');
    return ipcRenderer.invoke('get-injection-html');
  }
});


window.addEventListener('DOMContentLoaded', async () => {
  try {
    const html = await window.electronAPI.getInjectionHTML();
    const sidebar = document.querySelector('[data-test-selector="side-nav"]') || document.body;
    if (sidebar) {
      const div = document.createElement('div');
      div.innerHTML = html;
      sidebar.appendChild(div);
    }
  } catch (e) {
    console.error('Failed to get injection HTML:', e);
  }
});
