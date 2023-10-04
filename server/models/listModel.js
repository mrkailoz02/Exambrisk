const fs = require('fs').promises;

class List {
    #id
    #title
    #description
    #datetime
    #image

    constructor(id, title, description, datetime, image) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#datetime = datetime;
        this.#image = image;
    }

    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    getTitle() {
        return this.#title;
    }

    setTitle(title) {
        this.#title = title;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
    }

    getDatetime() {
        return this.#datetime;
    }

    setDatetime(datetime) {
        this.#datetime = datetime;
    }

    getImage() {
        return this.#image;
    }

    setImage(image) {
        this.#image = image;
    }

    static async getAllLists() {
        try {
            const jsonString = await fs.readFile('./../mock.json', 'utf8');
            const data = JSON.parse(jsonString);
            return data;
        } catch (error) {
            return null;
        }
    }
}

module.exports = List;
