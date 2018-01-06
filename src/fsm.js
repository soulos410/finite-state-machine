class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (typeof(config) === 'object') {
            this.initial=config.initial;
            this.states=config.states;
            this.undoStack = [];
            this.redoStack = [];
        }
        else {
            throw new Error;
        }
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state in this.states) {
            this.undoStack.push(this.initial);
            this.initial = state;
            this.redoStack.pop();
        }
        else { throw new Error;}
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.states[this.initial].transitions[event])
        {
            this.undoStack.push(this.initial);
            this.initial = this.states[this.initial].transitions[event];
            this.redoStack.pop();
        }
        else { throw new Error;}
    }
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.initial = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(event === undefined)
        {
            var statesArray = Object.keys(this.states);
            return statesArray;
        }        
        let answerArray = [];
        for (let i in this.states){
            for(let g of Object.keys(this.states[i].transitions))
                if (g === event) {
                answerArray.push(i);             
        }
    }
        console.log(answerArray);
        return answerArray;
    }
    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {        
        if (this.undoStack.length === 0) {
            return false;
        }
        this.redoStack.push(this.initial);
        this.initial = this.undoStack.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.redoStack.length === 0){
            return false;
        }
        if(this.redoStack.length > 0){ 
        this.initial = this.redoStack.pop();
        return true;        
        }
        else return false;

    }


    /**
     * Clears transition history
     */
    clearHistory() {
        this.redoStack = [];
        this.undoStack = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
