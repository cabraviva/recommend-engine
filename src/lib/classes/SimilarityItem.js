const $calculateSimilarity = require('../functions/calculateSimilarity')
const calculateSimilarityBetweenTwoStrings = require("../functions/calcSimilarityBetweenTwoStrings")

class SimilarityItem {
    constructor () {
        this._keywords = []
        this._title = null
        this._description = null

    }

    /**
     * @description Set the keywords property
     * @param {Array<String>|String} keywords New keywords (if string, it will be split by spaces)
     */
    setKeywords (keywords) {
        // If keywords is an array set _keywords to keywords
        if (Array.isArray(keywords)) {
            // Check if every item in the array is a string
            if (!keywords.every(item => typeof item === 'string')) throw new TypeError('Keywords must be an array of strings')

            this._keywords = keywords

            return
        }

        // If keywords is a string split it on spaces and set _keywords to the result
        if (typeof keywords === 'string') {
            this._keywords = keywords.split(' ')
            return
        }

        // Else throw an error
        throw new TypeError('Keywords must be an array or a string')
    }

    /**
     * @description Adds a single keyword to the keywords property
     * @param {String} keyword New keyword
     */
    addKeyword (keyword) {
        if (typeof keyword !== 'string') throw new TypeError('Keyword must be a string')

        this._keywords.push(keyword)
    }

    /**
     * @description Set the title property
     * @param {String} title New title
     */
    setTitle (title) {
        if (typeof title !== 'string') throw new TypeError('Title must be a string')

        this._title = title
    }

    /**
     * @description Set the description property
     * @param {String} description New description
     */
    setDescription (description) {
        if (typeof description !== 'string') throw new TypeError('Description must be a string')

        this._description = description
    }

    get keywords () {
        return this._keywords
    }

    get title () {
        return this._title === null ? '' : this._title
    }

    get description () {
        return this._description === null ? '' : this._description
    }

    /**
     * @description Compare the similarity of the current item with the given item
     * @param {SimilarityItem} otherItem SimilarityItem to compare with
     * @returns {Number} A number between 0 and 1
     */
    calculateSimilarity (otherItem) {
        return $calculateSimilarity(this, otherItem)
    }

    /**
     * @description Get the highest scoring keyword from the keywords property
     * @param {SimilarityItem} item Other item
     */
    getHighestScoringKeyword (item) {
        return $calculateSimilarity(this, item, 'highestScoringKeyword')
    }

    /**
     * @description Get the average score of the keywords property
     * @param {SimilarityItem} item Other item
     */
    getAverageScore (item) {
        return $calculateSimilarity(this, item, 'averageScore')
    }
}

/**
 * @description Creates a new SimilarityItem with provided keywords, title and description
 * @param {Array<String>|String} keywords Keywords for the item
 * @param {String} title The title of the item
 * @param {String} description The description of the item
 * @returns SimilarityItem
 */
SimilarityItem.create = function (keywords, title, description) {
    const item = new SimilarityItem()

    item.setKeywords(keywords)
    item.setTitle(title)
    item.setDescription(description)

    return item
}

module.exports = SimilarityItem