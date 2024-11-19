/*
Everyone knows passphrases. 
One can choose passphrases from poems, songs, movies names and so on 
but frequently they can be guessed due to common cultural references. 

You can get your passphrases stronger by different means. One is the following:
choose a text in capital letters including or not digits and non alphabetic characters,
shift each letter by a given number but the transformed letter must be a letter (circular shift),
replace each digit by its complement to 9,
keep such as non alphabetic and non digit characters,
downcase each letter in odd position, upcase each letter in even position (the first character is in position 0),
reverse the whole result.

Example:
  your text: "BORN IN 2015!", shift 1
  1 + 2 + 3 -> "CPSO JO 7984!"
  4 "CpSo jO 7984!"
  5 "!4897 Oj oSpC"
*/


// Solution

const alphabet = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
  'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];
  
  const downcase = letter => String(letter).toLowerCase();
  const uppercase = letter => String(letter).toUpperCase();
  
  const shift = pos => letter => {
    const isUpper = letter.toUpperCase() === letter;
    const index = alphabet.findIndex(el => el === letter.toLowerCase());
    const resultLetter = alphabet[(index + pos) % 26];
    return isUpper ? uppercase(resultLetter) : resultLetter;
  };
  
  const digitReplace = dig => 9 - (+dig);
  
  const isAlpha = char => RegExp(/[a-zA-Z]/).test(char);
  const isDigit = char => RegExp(/\d/).test(char);
  
  const isOddPos = pos => pos % 2 !== 0;
  
  const filterCase = (shifter, digitReplace) => char => {
    if (isAlpha(char)) return shifter(char);
    if (isDigit(char)) return digitReplace(char);
    return char;
  };
  
  function playPass(s, n) {
      const arr = s.split('');
      const shifter = shift(n);
      const filter = filterCase(shifter, digitReplace);
  
      return arr
        .map(filter)
        .map((el, pos) => isOddPos(pos) ? downcase(el) : uppercase(el))
        .reverse()
        .join('');
  }