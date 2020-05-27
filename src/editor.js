import xss from 'xss'
import MarkdownIt from 'markdown-it'

const customXss = new xss.FilterXSS({
    stripIgnoreTagBody: ['script', 'img', 'svg'],
    onIgnoreTag(tag, html, options) {
        return html
    }
})
const dfn = function () {
}

class RichText {
    constructor(el, {content = '', events = {}} = {}) {
        this.parent = null
        this.content = content
        this.events = events
        this.timer = null
        if (typeof el === 'string') {
            this.parent = document.querySelector(el)
        } else {
            this.parent = el
        }
        this.md = new MarkdownIt()
        this.init()
    }

    init() {
        this.insetTarget()
        this.onEvent()
    }

    insetTarget() {
        let target = document.createElement('textarea')
        target.contentEditable = 'true'
        target.setAttribute('class', 'rich-text')
        this.parent.appendChild(target)
        target.innerHTML = this.content
        this.target = target
    }

    onEvent() {
        this.target.addEventListener('input', this.handlerInput.bind(this))
        this.target.addEventListener('keyup', this.handlerKeyup.bind(this))
    }

    change() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.events.change && this.events.change(this.getParseData())
        }, 500)
    }

    handlerInput(e) {
        this.change()
    }

    handlerKeyup(e) {
        const code = e.keyCode || e.which || e.charCode
        if (code === 13) {
        }
    }

    getParseData() {
        return {
            content: this.getContent(),
            markdown: this.getMarkDown()
        }
    }

    getContent() {
        return this.target.value
    }

    getMarkDown() {
        const content = this.target.value
        return this.md.render(content)
    }
}


const editor = new RichText('#editor', {
    events: {
        change: e => {
            console.log(e)
            document.querySelector('#md').innerHTML = e.markdown
        }
    }
})

document.querySelector('#getContent').addEventListener('click', e => {
    console.log('getContent：', editor.getContent())
})

document.querySelector('#getMarkDown').addEventListener('click', e => {
    console.log('getMarkDown：', editor.getMarkDown())
})
