function Spoiler__headerClick(evt) {
    evt.preventDefault();
    evt.target.compSpoiler.toggle();
}

class Spoiler {
    element

    constructor(element, {shown = false, emphasized = false}={}) {
        this.element = element;
        element.classList.add('spoiler');
        const a = element.querySelector('a.spoiler-header');
        a.compSpoiler = this;
        a.addEventListener('click', Spoiler__headerClick);
        if(emphasized) {element.classList.add('spoiler-em')};
        this.shown = shown;
    }

    static init(...anchors) {
        let el, spoilers = [], spoiler;
        for (let i = 0; i < anchors.length; i++) {
            el = document.getElementById(anchors[i]);
            if(el) {
                //the first spoiler is opened, others - closed
                (i == 0) ? spoiler = new Spoiler(el, {shown: true}) : spoiler = new Spoiler(el, {shown: false});
                spoilers.push(spoiler);
            }
        }
        return spoilers;
    }

    toggle() {
        this.element.classList.toggle('spoiler-shown');
        if(this.ontoggle instanceof Function) {
            this.ontoggle();
        }
    }

    get shown() {
        return this.element.classList.contains('spoiler-shown');
    }

    set shown(value) {
        if(value) {
            if(!this.shown) {this.toggle()};
        } else {
            if(this.shown) {this.toggle()};
        }
    }
}