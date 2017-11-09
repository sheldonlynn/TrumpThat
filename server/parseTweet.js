const nlp = require('compromise');
const _ = require('lodash');

const negAdj = [
  "Liddle",
  "Major Loser",
  "Bankrupt",
  "Loser",
  "Weak",
  "stupid",
  "Failing",
  "Moron",
  "Dangerous",
  "Bad",
  "Bad Hombré",
  "Lightweight",
  "Crooked",
  "Clown",
  "Out of Control",
  "Traitor",
  "Fake News",
  "Terrible",
  "Horrible",
  "Low Energy",
  "Low Stamina",
  "Disgraceful",
  "Fake",
  "Vicious",
  "Nasty Woman",
  "Nasty",
  "Pathetic",
  "So-Called",
  "Rigged",
  "Cheater",
  "Degenerate",
  "Crazy",
  "Covfefe",
  "Lying",
  "Worst Ever",
  "Dummy",
  "Easy",
  "Rocketman",
  "One-sided",
  "Biased",
  "Lying",
  "Zero",
  "Flunky",
  "Lyin",
  "Hostile",
  "Dishonest",
  "Failed",
  "Russian Hoax",
  "Dumb as a Rock",
  "Goofball",
  "Disgraceful",
  "Overrated",
  "Desperate",
  "Total Loser"
];

const positiveAdj = [
  "Tremendous",
  "Massive",
  "Huge",
  "Hugely",
  "Bigly",
  "Big League",
  "Great",
  "Beautiful",
  "Major",
  "Incredible",
  "Positively",
  "Smart",
  "Talented"
];

const prePend = [
  "I have great confidence that",
  "Believe me",
  "I have heard",
  "Everyone says",
  "I have the best people!",
  "I have the best words!",
  "Everyone knows",
  "People always say",
  "It is a disgrace that",
  "Classified:",
  "Nobody knows",
  "It is tremendous that",
  "I've always said",
  "I am very smart.",
  "Covfefe",
  "@FoxAndFriends",
  "The lying Mainstream Media says",
  "Disastrous",
  "The Lying Media",
  "The Media won't tell you: ",
  "The Biased Media",
  "@IvankaTrump",
  "Climate Change is a lie.",
  "In the past",
  "These are the facts:",
  "I have the solution:"
];

const postPend = [
  "Make America Great Again!",
  "#MAGA",
  "Lock her up!",
  "No puppet, you're the puppet.",
  "Trump Russia - NO COLLUSION",
  "No Collusion!",
  "NO COLLUSION.",
  "Drain the Swamp!",
  "Election was rigged!",
  "I won the popular vote!",
  "One of the great memories of all time.",
  "I went to an Ivy League college!",
  "Covfefe!",
  "Covfefe.",
  "Rigged!",
  "But Hillary!",
  "Disaster!",
  "Totally biased!",
  "Really!",
  "Russian Hoax!",
  "Impeach!",
  "Who's Tiffany? Never heard of her.",
  "Important!",
  "Working hard!",
  "Great for America!",
  "Coal country!",
  "Rust belt!",
  "JOBS! JOBS! JOBS!",
  "Total loser!",
  "Total chaos!",
  "American Carnage!",
  "Should be ashamed!",
  "What is taking so long?",
  "Investigate!",
  "Never had a chance!",
  "I will sue.",
  "I will be suing!",
  "Apology needed!",
  "A lot of problems!",
  "I alone can fix this!",
  "#ACAsucks",
  "#healthcare"
];

const adverb = [
  "bigly",
  "massively",
  "humongously",
  "terribly",
  "sadly",
  "awfully",
  "hugely",
  "nastily",
  "viciously",
  "pathetically",
  "truly",
  "totally",
  "desperately",
  "definitely",
  "completely",
  "very",
  "really",
  "lazily"
];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spliceString(a, b, position) {
  return [a.slice(0, position), b, a.slice(position)].join('');
}

function applySentenceCase(str) {
  return str.replace(/.+?[\.\?\!\:](\s|$)/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
}

function cleanText(str) {
  str = str.trim();

  if (!str.charAt(str.length - 1).match(/[a-z]/i))
    str = str.slice(0, str.length - 1);

  return str;
}

function endsPunct(str) {
  return str.charAt(str.length - 1).match(/[.!?\\-]/);
}

function toLowerFirst(str) {
  return str.charAt(0).toLowerCase() + str.slice(1, str.length);
}

module.exports = {
  trumpThat: function(phrase) {
    if (phrase.length !== 0 && !endsPunct(phrase)) {
      phrase = phrase + ".";
    }

    let withAdj = this.adjective(phrase);
    let noAdj = withAdj.length === phrase.length;

    let withAdv = this.adverb(withAdj);
    let noAdv = withAdv.length === withAdj.length;

    let withAppend = this.append(withAdv, noAdj, noAdv);

    return phrase;
    return applySentenceCase(nlp(withAppend).all().out());
  },

  adjective: function(phrase) {
    //parse phrase
    let input = nlp(phrase);

    //get people and nouns
    let people = input.people();
    let nouns = input.nouns();

    // filter out people from nouns
    nouns.list = _.filter(nouns.list, function(noun) {
      let lowerNoun = noun.out('text').toLowerCase().trim();
      let peopleArray = people.out('array');

      return peopleArray.indexOf(lowerNoun) < 0;
    });

    //add adjectives to people
    _.forEach(people.data(), (person) => {
      let random = getRandom(0, 30);
      let adjective = random % 4 === 0 ? _.sample(positiveAdj) : _.sample(negAdj);

      phrase = input.match(cleanText(person.text)).insertBefore(adjective).all().out();
    });

    //add adjectives to nouns
    _.forEach(nouns.data(), (noun) => {
      let random = getRandom(0, 30);
      let adjective = random % 6 === 0 ? _.sample(positiveAdj) : _.sample(negAdj);

      adjective = adjective.toLowerCase();

      if (random % 3 === 0) {
        phrase = input.match(cleanText(noun.text)).insertBefore(adjective).all().out();
      }
    });

    return phrase;
  },

  append: function(phrase, noAdj, noAdv) {
    let random = getRandom(0,100);
    let pre = _.sample(prePend);
    let post = _.sample(postPend);

    //no adj or adv so must pre + post
    if (!noAdj && !noAdv) {
      return phrase = pre + " " + phrase + " " + post;
    }

    if (!endsPunct(pre)) phrase = toLowerFirst(phrase);

    if (random % 3 === 0) {
      return phrase = pre + " " + phrase + " " + post;
    }

    if (random % 2 === 0) {
      return phrase = phrase + " " + post;
    }

    if (random % 4 === 0) {
      return phrase = pre + " " + phrase;
    }

    return phrase;
  },

  adverb: function(phrase) {
    let input = nlp(phrase);
    let verbs = input.verbs();

    _.forEach(verbs.data(), (verb) => {
      let random = getRandom(0, 30);
      let randAdverb = (random % 2 === 0) ? _.sample(adverb) : "";

      phrase = input.match(verb.text.trim()).insertBefore(randAdverb).all().out();
    });

    return phrase;
  }
};