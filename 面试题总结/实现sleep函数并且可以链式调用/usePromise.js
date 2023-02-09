class People {
    constructor() {
        this.queue = Promise.resolve();
    }
    sleep(sec) {
        this.queue = this.queue.then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, sec * 1000)
            })
        })
        return this;
    }
    say(name) {
        this.queue = this.queue.then(() => {
            return new Promise((resolve) => {
                console.log(`${name}`);
                resolve()
            })
        })
        return this;
    }
}

const person = new People();
person.say('hello').sleep(1).say('world')