# Useful regular expressions

## Allowing one or more alternative words: (word1|word2|... )

 Example:
 
 ```javascript
  var re1 = /(it is|it's|it) (.+)/i;
  var parse_array = user_said.match(re1) 
```

  - Input: It is good 
    
    parse_array = ["It is good", "It is", "good"]


## Ignoring contents of the parenthesis in the output: (?: )

 Example:

```javascript
  var re2 = /(?:it is|it's|it) (.+)/i;
  var parse_array = user_said.match(re2) 
```

  - Input: It is good 

    parse_array = ["It is good", "good"]


## Comparing input with dictionaries

```javascript
good_words = ['good', 'excellent', 'nice']
bad_words = ['bad', 'terrible', 'sucks']

var re2 = /(?:it is|it's|it) (.+)/i;
var parse_array = user_said.match(re2) 
var mood = ""

if (parse_array) {
 mood = parse_array[1]
}

if (good_words.indexOf(str) >= 0) {
    //do something in case the answer is positive
} else if (bad_words.indexOf(str) >= 0) {
    //do something in case the answer is negative
} else {
    //do something in case the answer is not recognized as positive or negative
}
```

  - Input: It is good
    
    parser_array = ["It is good", "good"]
    
    good_words.indexOf(str) = 0
    
    bad_words.indexOf(str) = -1

  - Input: It's nice
  
    parser_array = ["It's nice", "nice"]

    good_words.indexOf(str) = 2
  
    bad_words.indexOf(str) = -1

  - Input: It sucks
    
    parser_array = ["It sucks", "sucks"]
    
    good_words.indexOf(str) = -1
    
    bad_words.indexOf(str) = 2
