export class OnlineIndicator {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('online-indicator');
        this.updateStatus();

        window.addEventListener('online', () => this.updateStatus());
        window.addEventListener('offline', () => this.updateStatus());

        document.getElementById("indicator").appendChild(this.element);
    }

    updateStatus() {
        this.element.innerHTML = '';

        const circle = document.createElement('div');
        circle.classList.add('circle');

        if (navigator.onLine) {
            circle.style.backgroundColor = 'green';
        } else {
            circle.style.backgroundColor = 'red';
        }

        const text = document.createElement('span');
        text.textContent = navigator.onLine ? 'Online' : 'Offline';

        this.element.appendChild(circle);
        this.element.appendChild(text);
    }
}
