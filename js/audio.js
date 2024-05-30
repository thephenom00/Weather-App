/**
 * Toggles the rain audio playback and visibility of the cross line element.
 *
 * @param {HTMLElement} crossLine The line element to toggle visibility.
 */
export function handleRain(crossLine) {
    const rain = document.getElementById("rain-audio");
    crossLine.style.visibility = crossLine.style.visibility === "hidden" ? "visible" : "hidden";

    if (crossLine.style.visibility === "hidden") {
        rain.play(); 
    } else {
        rain.pause(); 
    }
}

export function handleClick() {
    const click = document.getElementById("click-audio");
    click.play();
    
}