const levensthein = require('./levensthein')
const dicesCoefficientModule = require("string-similarity")
const dicesCoefficient = dicesCoefficientModule.compareTwoStrings

// ################# CONSTANTS #################
const MAX_LENGTH_DIFFERENCE_FACTOR = 2
const MAX_LENGTH_DIFFERENCE_EXCEEDED_MINUS = 0.65
const MIN_MAX_LENGTH = 20 // If the min length is less than this value, the length comparison won't be relative
// #############################################

function MAX_LENGTH_DIFFERENCE (length1, length2) {
    // Get lowest and highest length
    let lowestLength = Math.min(length1, length2)
    let highestLength = Math.max(length1, length2)

    // If lowestLength is less than MIN_MAX_LENGTH return MIN_MAX_LENGTH
    if (lowestLength < MIN_MAX_LENGTH) return MIN_MAX_LENGTH

    // If lowestLength * 2 is greater than highestLength return highestLength
    if (lowestLength * MAX_LENGTH_DIFFERENCE_FACTOR > highestLength) return highestLength
}

/**
 * @description Calculates the similarity between two Strings
 * @param {String} string1 
 * @param {String} string2 
 * @returns {Number} A number between 0 and 1
 */
function calculateSimilarityBetweenTwoStrings (string1, string2) {
    // Lowercase both strings
    string1 = string1.toLowerCase()
    string2 = string2.toLowerCase()

    // Trim both strings
    string1 = string1.trim()
    string2 = string2.trim()

    // Set finalScore to 0
    let finalScore = 0
    let finalMinus = 0 // Score to subtract from finalScore

    // If string is the exact same return 1
    if (string1 == string2) return 1

    // Calculate the lengthDifference
    let lengthDifference = Math.abs(string1.length - string2.length)

    // If the lengthDifference is greater than MAX_LENGTH_DIFFERENCE add MAX_LENGTH_DIFFERENCE_EXCEEDED_MINUS to finalMinus
    if (lengthDifference > MAX_LENGTH_DIFFERENCE(string1.length, string2.length)) finalMinus += MAX_LENGTH_DIFFERENCE_EXCEEDED_MINUS


    // #############################################################


    // Compare how many characters are the same
    let sameCharacters = 0
    for (let i = 0; i < string1.length; i++) {
        if (string1[i] == string2[i]) sameCharacters++
    }
    const sameCharactersPercentage = sameCharacters / string1.length

    // Calculate the Levensthein distance
    const levenstheinDistance = levensthein(string1, string2)

    // Calculate the Dices coefficient
    const coefficient = dicesCoefficient(string1, string2)

    // Combine all procentages
    const combinedPercentage = (sameCharactersPercentage * 5 + levenstheinDistance * 20 + coefficient * 75) / 100

    // #############################################################

    // Set finalScore to combinedPercentage
    finalScore = combinedPercentage

    // Subtract finalMinus from finalScore
    finalScore -= finalMinus

    // Make sure the score is between 0 and 1
    finalScore = finalScore < 0 ? 0 : finalScore
    finalScore = finalScore > 1 ? 1 : finalScore

    // Return the finalScore
    return finalScore
}

module.exports = calculateSimilarityBetweenTwoStrings