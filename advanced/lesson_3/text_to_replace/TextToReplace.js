class TextToReplace {
    constructor(text) {
        this.text = text;
    }

    replace() {
        text = text.replace(/(\B'|'$)/g, '"');
        console.log(text);
        this.render(text);
    }

    render() {
        document.getElementById('text').innerHTML = text;
    }
}