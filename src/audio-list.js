class AudioList extends HTMLElement {

  constructor() {
    super();

    this._audioLines = [];

    this.attachShadow({mode: 'open'});
    this.render();
  }

  get audioLines() {
    return this._audioLines;
  }

  set audioLines(audioLines) {
    this._audioLines = audioLines;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = '';

    this._audioLines.forEach(audioLine => {
        const button = document.createElement('button');
        button.innerText = audioLine.line;
        button.style.height ='50px';
        button.style.width ='50px';
        button.addEventListener('click', () => new Audio(audioLine.audioUrl).play());
        this.shadowRoot.appendChild(button); 
    });
  }
}

customElements.define('audio-list', AudioList);