LevenshteinDistance = function (a, b) {
    if (a.length == 0) return b.length
    if (b.length == 0) return a.length

    var matrix = []

    // increment along the first column of each row
    var i
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i]
    }

    // increment each column in the first row
    var j
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1]
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1
                    )
                ) // deletion
            }
        }
    }

    return matrix[b.length][a.length]
}


module.exports = function levensthein (string1, string2) {
    // Calculate the levensthein distance
    const charactersToChange = LevenshteinDistance(string1, string2)

    // Calculate the percentage of characters that are the same
    const percentageOfCharactersThatAreTheSameStr1 = charactersToChange / string1.length
    const percentageOfCharactersThatAreTheSameStr2 = charactersToChange / string2.length

    // Minimum percentage of characters that are the same
    const minimumPercentageOfCharactersThatAreTheSame = Math.min(percentageOfCharactersThatAreTheSameStr1, percentageOfCharactersThatAreTheSameStr2)

    return minimumPercentageOfCharactersThatAreTheSame
}