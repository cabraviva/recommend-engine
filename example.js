const { SimilarityItem } = require('.') // Require the local module

const item1 = SimilarityItem.create(['geodreieck', 'zeichnen', 'geometrie'], 'Foo', 'Foo description')
const item2 = SimilarityItem.create(['geobrett', 'geometrische formen', 'mathe', 'geometrie'], 'Bar', 'Foo description')

const similarity = item1.calculateSimilarity(item2)
const highestScoringKeyword = item1.getHighestScoringKeyword(item2)
const averageScore = item1.getAverageScore(item2)

console.log('Similarity:', similarity)
console.log('Highest scoring keyword:', highestScoringKeyword)
console.log('Average Score:', averageScore)