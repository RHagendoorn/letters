import './input-box.js';
import './audio-list.js';

class RecordLine extends HTMLElement {

  constructor() {
    super();

    this.audioLines = [];

    const shadowRoot = this.attachShadow({mode: 'open'});
    this.buildElement(shadowRoot);
  }

  addAudioLine(event, audioList) {
    audioList.audioLines = [...audioList.audioLines, event.detail];
  }

  buildElement(shadowRoot) {
    const inputBox = document.createElement('input-box');

    const audioList = document.createElement('audio-list');
    audioList.style.display = 'block'

    this.addEventListener('add-audio-line', event => this.addAudioLine(event, audioList));

    shadowRoot.appendChild(inputBox);
    shadowRoot.appendChild(audioList);
  }
}

customElements.define('record-line', RecordLine);
