const SimilarityItem = require("../classes/SimilarityItem");
const calculateSimilarityBetweenTwoStrings = require("./calcSimilarityBetweenTwoStrings")

/**
 * @description Calculates the similarity between two SimilarityItems
 * @param {SimilarityItem} item1 
 * @param {SimilarityItem} item2
 * @param {Boolean|String} butReturn If a string, return a special value instead of the similarity (e.g. 'highestScoringKeyword', 'averageScore')
 * @returns {Number} A number between 0 and 1
 */
module.exports = function calculateSimilarity (item1, item2, butReturn = false) {
    let score = 0

    // Create an array of objects with the keyword and the highest score for item1.keywords, compared to any keyword from item2.keywords
    let keywords1 = item1.keywords.map(keyword => {
        // Get the highest score for the keyword from item2.keywords
        let highestScore = 0
        item2.keywords.forEach(keyword2 => {
            let score = calculateSimilarityBetweenTwoStrings(keyword, keyword2)
            if (score > highestScore) highestScore = score
        })

        const __score = highestScore

        return {
            keyword: keyword,
            score: __score
        }
    })

    // And now for item2.keywords
    let keywords2 = item2.keywords.map(keyword => {
        // Get the highest score for the keyword from item1.keywords
        let highestScore = 0
        item1.keywords.forEach(keyword1 => {
            let score = calculateSimilarityBetweenTwoStrings(keyword, keyword1)
            if (score > highestScore) highestScore = score
        })

        const __score = highestScore

        return {
            keyword: keyword,
            score: __score
        }
    })

    // Combine both keyword arrays and make sure that the keywords are unique
    const keywords = [...new Set([...keywords1, ...keywords2])]

    // Get the highest scoring keyword
    let $kwsHighestScore = 0
    let highestScoringKeyword = {
        keyword: '',
        score: 0
    }
    keywords.forEach(keyword => {
        if (keyword.score > $kwsHighestScore) {
            $kwsHighestScore = keyword.score
            highestScoringKeyword = keyword
        }
    })

    // Get average score
    let $kwsAverageScore = 0
    keywords.forEach(keyword => {
        $kwsAverageScore += keyword.score
    })
    $kwsAverageScore = $kwsAverageScore / keywords.length

    // Set score
    score = (
        $kwsAverageScore * 45 + // 45% of the average score
        $kwsHighestScore * 55 // 55% of the highest scoring keyword
    ) / 100

    // Return score
    if (butReturn === 'highestScoringKeyword') return highestScoringKeyword
    if (butReturn === 'averageScore') return $kwsAverageScore

    return score
}