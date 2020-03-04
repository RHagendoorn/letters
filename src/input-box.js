import './recorder-button.js';

class InputBox extends HTMLElement {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});
    this.addEventListener('audio-ready', event => this.setAudio(event))
    this.buildElement(shadowRoot);
  }

  setAudio(event) {
    this.audioUrl = URL.createObjectURL(event.detail);
  }

  playAudio() {
    new Audio(this.audioUrl).play();
  }

  addAudioLine(input, errorText) {
    if (!this.audioUrl || !input.value) {
      errorText.innerText = 'Enter both a line and record audio';
      return;
    }
    const detail = { audioUrl: this.audioUrl, line: input.value }
    this.dispatchEvent(new CustomEvent('add-audio-line', { bubbles: true, composed: true, detail }))
    errorText.innerText = '';
    input.value = '';
    this.audioUrl = undefined;
  }

  buildElement(shadowRoot) {
    const input = document.createElement('input');
    const recorderButton = document.createElement('recorder-button');

    const playButton = document.createElement('button');
    playButton.innerText = 'Play';
    playButton.addEventListener('click', () => this.playAudio());

    const errorText = document.createElement('span');
    errorText.style.color = 'red';
    errorText.style.fontSize = '10px';

    const addButton = document.createElement('button');
    addButton.innerText = 'Add';
    addButton.addEventListener('click', () => this.addAudioLine(input, errorText));

    shadowRoot.appendChild(input);
    shadowRoot.appendChild(recorderButton);
    shadowRoot.appendChild(playButton);
    shadowRoot.appendChild(addButton);
    shadowRoot.appendChild(errorText);
  }
}

customElements.define('input-box', InputBox);
