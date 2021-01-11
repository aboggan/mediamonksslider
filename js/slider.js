const arrowNext = document.querySelector('.arrow.next');
const arrowPrev = document.querySelector('.arrow.prev');
const navigation = document.querySelector('.navigation');
const navigationSteps = document.querySelector('.navigation .steps');
const background = document.querySelector('.background');

let slidePosition = 0;
let moving = false;
const lastPosition = 9; //this could be configurable

navigation.addEventListener('click', e => {
    let optionElement = e.target;
    let parentElement = optionElement.parentElement
    if (optionElement && optionElement.nodeName == "SPAN") {
        if (!moving) {
            moving = true;
            const option = Number(parentElement.dataset.option);
            if (option !== slidePosition) {
                markAsSelected(parentElement)
                slidePosition = option;
                moveSliderTo(option);
            }
        }
    }
});

arrowNext.addEventListener('click', event => {
    if (!moving) {
        moving = true;
        slidePosition++;
        moveSliderTo(slidePosition);
    }
});

arrowPrev.addEventListener('click', event => {
    if (!moving) {
        moving = true;
        slidePosition--;
        moveSliderTo(slidePosition);
    }
});


function moveSliderTo(position) {
    const currentSlide = document.querySelector('.msg.order-' + position);

    //mark navigation option
    markAsSelected(document.querySelectorAll('.navigation li')[position])

    //show/hide first or last arrow
    showOrHideArrow(position);


    //hide all messages
    document.querySelectorAll('.msg').forEach(slide => {
        hide(slide);
    });

    //hide steps text
    hide(navigationSteps)

    //move background
    let marginleft = getMarginForPosition(position);
    background.style.marginLeft = '-' + marginleft + 'vw';

    //show slide
    setTimeout(() => {
        show(currentSlide)
        showStep(position)
        moving = false;
    }, 1200);

}

function showStep(step) {
    if (step > 0 && step < lastPosition) {
        const stepsText = `Step ${step} out ${lastPosition - 1} on the path to digital enlightenment.`;
        navigationSteps.innerHTML = stepsText;
        show(navigationSteps);
    }
}


function markAsSelected(step) {
    //unselect all
    document.querySelectorAll('.navigation li').forEach(option => {
        option.classList.remove('selected');
    });
    step.classList.add('selected')
}

function showOrHideArrow(position) {
    if (position < lastPosition && !arrowNext.classList.contains('show')) {
        show(arrowNext);
    } else if (position === lastPosition) {
        hide(arrowNext);
    }

    if (position > 0 && !arrowPrev.classList.contains('show')) {
        show(arrowPrev);
    } else if (position === 0) {
        hide(arrowPrev);
    }
}

/*
    This function is kinda rough. 
    Should be a implementation using a webservice or some config file.
    Best case I prefer an array with all the messages and its own settings. 
    e.g:
    [
        ...
        {'message':'talent is given true skill is earned.',
        'order':'1',
        'align':'left',
        'mobilePosition': '400',
        'desktopPosition':'55'
        },
        ...
    ]
    
*/
function getMarginForPosition(sliderPosition) {
    let marginLeft = 0;
    if (window.screen.width < 440) {
        //mobile
        switch (sliderPosition) {
            case 1:
                marginLeft = 400;
                break;
            case 2:
                marginLeft = 500;
                break;
            case 3:
                marginLeft = 650;
                break;
            case 4:
                marginLeft = 920;
                break;
            case 5:
                marginLeft = 1140;
                break;
            case 6:
                marginLeft = 1550;
                break;
            case 7:
                marginLeft = 1900;
                break;
            case 8:
                marginLeft = 1900;
                break;
            case lastPosition:
                marginLeft = 2100;
                break;
            default:
                break;
        }
    } else {
        //desktop
        switch (sliderPosition) {
            case 1:
                marginLeft = 55;
                break;
            case 2:
                marginLeft = 110;
                break;
            case 3:
                marginLeft = 165;
                break;
            case 4:
                marginLeft = 220;
                break;
            case 5:
                marginLeft = 280;
                break;
            case 6:
                marginLeft = 360;
                break;
            case 7:
                marginLeft = 440;
                break;
            case 8:
                marginLeft = 440;
                break;
            case lastPosition:
                marginLeft = 500;
                break;
            default:
                break;
        }
    }



    return marginLeft
}

function hide(element) {
    element.classList.remove('show');
    element.classList.add('hidden');
}

function show(element) {
    element.classList.remove('hidden');
    element.classList.add('show');
}