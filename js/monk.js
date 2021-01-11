// Wrap every letter in a span
var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// Este link es el de muestra http://jsfiddle.net/f5rh18L4/25/


anime.timeline({ loop: false })
    .add({
        targets: '.ml2 .letter',
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70 * i
    }).add({
        targets: '.ml2',
        opacity: 0,
        duration: 1500,
        easing: "easeOutExpo",
        delay: 1000
    });
  

setTimeout(() => {
    const monk = document.querySelector('.monk');
    const container = document.querySelector('.container');

    hide(monk)
    setTimeout(() => {
        monk.classList.add('hide')
    }, 500);
    
    setTimeout(() => {
        container.classList.remove('hide')
    }, 200);

    setTimeout(() => {
        show(container)
    }, 500);

}, 4500);