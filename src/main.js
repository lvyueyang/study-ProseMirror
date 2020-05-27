import {schema} from 'prosemirror-schema-basic'
import {DOMParser} from 'prosemirror-model'
import {EditorState} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {undo, redo, history} from 'prosemirror-history'
import {keymap} from 'prosemirror-keymap'
import {baseKeymap} from 'prosemirror-commands'


class Editor {
    constructor(el, {} = {}) {
        this.target = null
        this.view = null
        if (typeof el === 'string') {
            this.target = document.querySelector(el)
        } else {
            this.target = el
        }
        this.init()
    }

    init() {
        let state = EditorState.create({
            plugins: [
                history(),
                keymap({'Mod-z': undo, 'Mod-Shift-z': redo}),
                keymap(baseKeymap),
            ],
            doc: DOMParser.fromSchema(schema).parse(this.target)
        })
        let view = new EditorView(this.target, {
            state,
            dispatchTransaction: transaction => {
                let newState = view.state.apply(transaction)
                view.updateState(newState)
            },
        })
        this.view = view
    }
}

new Editor('#editor', {})