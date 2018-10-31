
# 目录

## Get Catalog

```js
let result = ''
const list = document.querySelectorAll('.react-menu-container a')
list.forEach((item, i) => {result += `${i+1} ${item.innerText} \n`})
console.log(result)
```

## Array

> [Array 1 - 10](https://github.com/zhanghao-zhoushan/record/issues/17)

- _.chunk
- _.compact
- _.concat
- _.difference
- _.differenceBy
- _.differenceWith
- _.drop
- _.dropRight
- _.dropRightWhile
- _.dropWhile

> [Array 11 - 20](https://github.com/zhanghao-zhoushan/record/issues/18)

- _.fill
- _.findIndex
- _.findLastIndex
- _.first -> head
- _.flatten
- _.flattenDeep
- _.flattenDepth
- _.fromPairs
- _.head
- _.indexOf

> [Array 21 - 33](https://github.com/zhanghao-zhoushan/record/issues/19)

- _.initial
- _.intersection
- _.intersectionBy
- _.intersectionWith
- _.join
- _.last
- _.lastIndexOf
- _.nth
- _.pull
- _.pullAll
- _.pullAllBy
- _.pullAllWith
- _.pullAt

> [Array 34 - 44](https://github.com/zhanghao-zhoushan/record/issues/20)

- _.remove
- _.reverse
- _.slice
- _.sortedIndex
- _.sortedIndexBy
- _.sortedIndexOf
- _.sortedLastIndex
- _.sortedLastIndexBy
- _.sortedLastIndexOf
- _.sortedUniq
- _.sortedUniqBy

> [Array 45 - 57](https://github.com/zhanghao-zhoushan/record/issues/21)

- _.tail
- _.take
- _.takeRight
- _.takeRightWhile
- _.takeWhile
- _.union
- _.unionBy
- _.unionWith
- _.uniq
- _.uniqBy
- _.uniqWith
- _.unzip
- _.unzipWith

> [Array 58 - 65](https://github.com/zhanghao-zhoushan/record/issues/22)

- _.without
- _.xor
- _.xorBy
- _.xorWith
- _.zip
- _.zipObject
- _.zipObjectDeep
- _.zipWith

## Collection

> [Collection 66 - 80](https://github.com/zhanghao-zhoushan/record/issues/23)

- _.countBy"
- _.each -> forEach"
- _.eachRight -> forEachRight"
- _.every"
- _.filter"
- _.find"
- _.findLast"
- _.flatMap"
- _.flatMapDeep"
- _.flatMapDepth"
- _.forEach"
- _.forEachRight"
- _.groupBy"
- _.includes"
- _.invokeMap"

> [Collection 80 - 93](https://github.com/zhanghao-zhoushan/record/issues/24)

- _.keyBy
- _.map
- _.orderBy
- _.partition
- _.reduce
- _.reduceRight
- _.reject
- _.sample
- _.sampleSize
- _.shuffle
- _.size
- _.some
- _.sortBy

## Date

> [Date 94](https://github.com/zhanghao-zhoushan/record/issues/25)

- _.now

## Function

> [Function 95 - 105](https://github.com/zhanghao-zhoushan/record/issues/26)

- _.after
- _.ary
- _.before
- _.bind
- _.bindKey
- _.curry
- _.curryRight
- _.debounce
- _.defer
- _.delay
- _.flip

> [Function 106 - 117](https://github.com/zhanghao-zhoushan/record/issues/27)

- _.memoize
- _.negate
- _.once
- _.overArgs
- _.partial
- _.partialRight
- _.rearg
- _.rest
- _.spread
- _.throttle
- _.unary
- _.wrap

## Lang

> [Lang 118 - 131](https://github.com/zhanghao-zhoushan/record/issues/28)

- _.castArray
- _.clone
- _.cloneDeep
- _.cloneDeepWith
- _.cloneWith
- _.conformsTo
- _.eq
- _.gt
- _.gte
- _.isArguments
- _.isArray
- _.isArrayBuffer
- _.isArrayLike
- _.isArrayLikeObject

> [Lang 132 - 143](https://github.com/zhanghao-zhoushan/record/issues/29)

- _.isBoolean
- _.isBuffer
- _.isDate
- _.isElement
- _.isEmpty
- _.isEqual
- _.isEqualWith
- _.isError
- _.isFinite
- _.isFunction
- _.isInteger
- _.isLength

> [Lang 144 - 160](https://github.com/zhanghao-zhoushan/record/issues/30)

- _.isMap
- _.isMatch
- _.isMatchWith
- _.isNaN
- _.isNative
- _.isNil
- _.isNull
- _.isNumber
- _.isObject
- _.isObjectLike
- _.isPlainObject
- _.isRegExp
- _.isSafeInteger
- _.isSet
- _.isString
- _.isSymbol
- _.isTypedArray

> [Lang 161 - 173](https://github.com/zhanghao-zhoushan/record/issues/31)

- _.isUndefined
- _.isWeakMap
- _.isWeakSet
- _.lt
- _.lte
- _.toArray
- _.toFinite
- _.toInteger
- _.toLength
- _.toNumber
- _.toPlainObject
- _.toSafeInteger
- _.toString

## Math

> [Math 174 - 188](https://github.com/zhanghao-zhoushan/record/issues/32)

- _.add
- _.ceil
- _.divide
- _.floor
- _.max
- _.maxBy
- _.mean
- _.meanBy
- _.min
- _.minBy
- _.multiply
- _.round
- _.subtract
- _.sum
- _.sumBy

## Number

> [Number 189 - 191](https://github.com/zhanghao-zhoushan/record/issues/33)

- _.clamp
- _.inRange
- _.random

## Object

> [Object 192 - 201](https://github.com/zhanghao-zhoushan/record/issues/34)

- _.assign
- _.assignIn
- _.assignInWith
- _.assignWith
- _.at
- _.create
- _.defaults
- _.defaultsDeep
- _.entries -> toPairs
- _.entriesIn -> toPairsIn

> [Object 202 - 211](https://github.com/zhanghao-zhoushan/record/issues/35)

- _.extend -> assignIn
- _.extendWith -> assignInWith
- _.findKey
- _.findLastKey
- _.forIn
- _.forInRight
- _.forOwn
- _.forOwnRight
- _.functions
- _.functionsIn

> [Object 212 - 221](https://github.com/zhanghao-zhoushan/record/issues/36)

- _.get
- _.has
- _.hasIn
- _.invert
- _.invertBy
- _.invoke
- _.keys
- _.keysIn
- _.mapKeys
- _.mapValues

> [Object 222 - 230](https://github.com/zhanghao-zhoushan/record/issues/37)

- _.merge
- _.mergeWith
- _.omit
- _.omitBy
- _.pick
- _.pickBy
- _.result
- _.set
- _.setWith

> [Object 231 - 238](https://github.com/zhanghao-zhoushan/record/issues/38)

- _.toPairs
- _.toPairsIn
- _.transform
- _.unset
- _.update
- _.updateWith
- _.values
- _.valuesIn

## Seq

> [Seq 239 - 242](https://github.com/zhanghao-zhoushan/record/issues/39)

- _
- _.chain
- _.tap
- _.thru

> [Seq 243 - 252](https://github.com/zhanghao-zhoushan/record/issues/40)

- _.prototype[Symbol.iterator]
- _.prototype.at
- _.prototype.chain
- _.prototype.commit
- _.prototype.next
- _.prototype.plant
- _.prototype.reverse
- _.prototype.toJSON -> value
- _.prototype.value
- _.prototype.valueOf -> value

## String

> [String 253 - 261](https://github.com/zhanghao-zhoushan/record/issues/41)

- "_.camelCase
- "_.capitalize
- "_.deburr
- "_.endsWith
- "_.escape
- "_.escapeRegExp
- "_.kebabCase
- "_.lowerCase
- "_.lowerFirst

> [String 262 - 272](https://github.com/zhanghao-zhoushan/record/issues/42)

- "_.pad
- "_.padEnd
- "_.padStart
- "_.parseInt
- "_.repeat
- "_.replace
- "_.snakeCase
- "_.split
- "_.startCase
- "_.startsWith
- "_.template

> [String 273 - 282](https://github.com/zhanghao-zhoushan/record/issues/43)

- "_.toLower
- "_.toUpper
- "_.trim
- "_.trimEnd
- "_.trimStart
- "_.truncate
- "_.unescape
- "_.upperCase
- "_.upperFirst
- "_.words

## Util

> [Util 283 - 290](https://github.com/zhanghao-zhoushan/record/issues/44)

- _.attempt
- _.bindAll
- _.cond
- _.conforms
- _.constant
- _.defaultTo
- _.flow
- _.flowRight

> [Util 291 - 300](https://github.com/zhanghao-zhoushan/record/issues/45)

- _.identity
- _.iteratee
- _.matches
- _.matchesProperty
- _.method
- _.methodOf
- _.mixin
- _.noConflict
- _.noop
- _.nthArg

> [Util 301 - 316](https://github.com/zhanghao-zhoushan/record/issues/46)

- _.over
- _.overEvery
- _.overSome
- _.property
- _.propertyOf
- _.range
- _.rangeRight
- _.runInContext
- _.stubArray
- _.stubFalse
- _.stubObject
- _.stubString
- _.stubTrue
- _.times
- _.toPath
- _.uniqueId

## Properties

> [Collection 317 - 323](https://github.com/zhanghao-zhoushan/record/issues/47)

- _.VERSION
- _.templateSettings
- _.templateSettings.escape
- _.templateSettings.evaluate
- _.templateSettings.imports
- _.templateSettings.interpolate
- _.templateSettings.variable

## Methods

> [Methods](https://github.com/zhanghao-zhoushan/record/issues/48)

- _.templateSettings.imports._


