class RecorderButton extends HTMLElement {

  constructor() {
    super();


    const button = this.getButton();
    navigator.mediaDevices.getUserMedia({audio: true}).then(stream => this.registerRecorder(stream, button)); 
    this.buildElement(button);
  }

  getButton() {
    const button = document.createElement('button');
    button.innerText = 'Record';
    return button;
  }

  getStyle() {
    const style = document.createElement('style');
  }

  registerRecorder(stream, button) {
    const recorder = new MediaRecorder(stream);
    button.onclick = () => this.toggleRecording(recorder, button);
    recorder.ondataavailable = event => this.dispatchEvent(new CustomEvent('audio-ready', {detail: event.data, bubbles: true, composed: true}));
  }

  toggleRecording(recorder, button) {
    if (recorder.state === 'recording') {
      recorder.stop();
      button.innerText = 'Record';
    } else {
      recorder.start();
      button.innerText = 'Stop';
    }
  }

  buildElement(button) {
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(button);
  }
}

customElements.define('recorder-button', RecorderButton);
