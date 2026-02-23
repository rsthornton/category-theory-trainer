// ============================================================
// CATEGORY THEORY TRAINER — CHALLENGE DATABASE
// ============================================================
// 8 challenge types × 3 domains (cooking, logic, family/biology)
// Each challenge has distractors and precise categorical explanations.
//
// SCHEMA NOTES:
// - Every challenge has: id, type, domain, difficulty (1-3)
// - Type-specific fields documented at each section
// - Designed to be API-extensible: same schema works for generated content
// ============================================================

const challenges = {

  // ============================================================
  // TYPE 1: CLASSIFY
  // Sort a mixed bag of words into "objects" and "morphisms"
  // ============================================================
  // Schema: { words: [{word, kind: "object"|"morphism"}], hint? }
  // ============================================================
  classify: [
    // --- COOKING ---
    {
      id: "cl-cook-01",
      type: "classify",
      domain: "cooking",
      difficulty: 1,
      prompt: "Sort these into objects (states of food) and morphisms (operations that transform food).",
      words: [
        { word: "Raw chicken", kind: "object" },
        { word: "Marinate", kind: "morphism" },
        { word: "Grilled steak", kind: "object" },
        { word: "Dice", kind: "morphism" },
        { word: "Frozen fish", kind: "object" },
        { word: "Blanch", kind: "morphism" },
      ],
      explanation: "Objects are states — they describe what something IS at a given moment. Morphisms are operations — they describe what you DO to move between states."
    },
    {
      id: "cl-cook-02",
      type: "classify",
      domain: "cooking",
      difficulty: 1,
      prompt: "Sort these into objects and morphisms.",
      words: [
        { word: "Flour and water", kind: "object" },
        { word: "Knead", kind: "morphism" },
        { word: "Dough", kind: "object" },
        { word: "Proof", kind: "morphism" },
        { word: "Risen dough", kind: "object" },
        { word: "Bake", kind: "morphism" },
        { word: "Bread", kind: "object" },
      ],
      explanation: "The bread-making chain: each object is a state, each morphism is the operation that advances to the next state."
    },
    {
      id: "cl-cook-03",
      type: "classify",
      domain: "cooking",
      difficulty: 2,
      prompt: "Sort these. Be careful — some words could seem like either depending on context.",
      words: [
        { word: "Caramelized onion", kind: "object" },
        { word: "Reduce", kind: "morphism" },
        { word: "Stock", kind: "object" },
        { word: "Emulsify", kind: "morphism" },
        { word: "Vinaigrette", kind: "object" },
        { word: "Whisk", kind: "morphism" },
        { word: "Simmer", kind: "morphism" },
        { word: "Broth", kind: "object" },
      ],
      explanation: "'Whisk' and 'simmer' are both morphisms (operations). 'Stock' and 'broth' are both objects (states of a liquid). The key test: can it sit on a counter? Object. Does it require time and action? Morphism."
    },
    {
      id: "cl-cook-04",
      type: "classify",
      domain: "cooking",
      difficulty: 2,
      prompt: "Sort these into objects and morphisms.",
      words: [
        { word: "Julienned carrots", kind: "object" },
        { word: "Ferment", kind: "morphism" },
        { word: "Sauerkraut", kind: "object" },
        { word: "Shredded cabbage with salt", kind: "object" },
        { word: "Deglaze", kind: "morphism" },
        { word: "Pan sauce", kind: "object" },
        { word: "Cure", kind: "morphism" },
      ],
      explanation: "Fermentation and curing are morphisms — they transform one food state into another over time. The fact that they happen slowly doesn't change their categorical role."
    },

    // --- LOGIC ---
    {
      id: "cl-logic-01",
      type: "classify",
      domain: "logic",
      difficulty: 1,
      prompt: "Sort these into objects (propositions) and morphisms (logical operations / proofs).",
      words: [
        { word: "It is raining", kind: "object" },
        { word: "Therefore", kind: "morphism" },
        { word: "The ground is wet", kind: "object" },
        { word: "If...then", kind: "morphism" },
        { word: "All dogs are mammals", kind: "object" },
        { word: "Contrapositive", kind: "morphism" },
      ],
      explanation: "Propositions (statements that can be true or false) are objects. Logical connectives and proof techniques that derive one proposition from another are morphisms."
    },
    {
      id: "cl-logic-02",
      type: "classify",
      domain: "logic",
      difficulty: 2,
      prompt: "Sort these into objects and morphisms in a category of propositions.",
      words: [
        { word: "x > 5", kind: "object" },
        { word: "Substitute x = 10", kind: "morphism" },
        { word: "10 > 5", kind: "object" },
        { word: "Modus ponens", kind: "morphism" },
        { word: "All primes > 2 are odd", kind: "object" },
        { word: "Proof by contradiction", kind: "morphism" },
      ],
      explanation: "Mathematical statements are objects. Proof techniques and logical rules that derive one statement from another are morphisms."
    },
    {
      id: "cl-logic-03",
      type: "classify",
      domain: "logic",
      difficulty: 2,
      prompt: "Sort these. Some are tricky.",
      words: [
        { word: "The cat is on the mat", kind: "object" },
        { word: "Negation", kind: "morphism" },
        { word: "The cat is not on the mat", kind: "object" },
        { word: "If P then Q", kind: "object" },
        { word: "Conjunction elimination", kind: "morphism" },
        { word: "P and Q", kind: "object" },
      ],
      explanation: "'If P then Q' is itself a proposition — a statement that can be true or false — so it is an object. 'Conjunction elimination' is a rule that derives P from 'P and Q', so it is a morphism."
    },

    // --- FAMILY / BIOLOGY ---
    {
      id: "cl-fam-01",
      type: "classify",
      domain: "family",
      difficulty: 1,
      prompt: "Sort these into objects (entities or facts) and morphisms (relationships or deductions).",
      words: [
        { word: "Emily", kind: "object" },
        { word: "Is the daughter of", kind: "morphism" },
        { word: "Gordon", kind: "object" },
        { word: "Is the sibling of", kind: "morphism" },
        { word: "The Smith family", kind: "object" },
        { word: "Inherits genes from", kind: "morphism" },
      ],
      explanation: "People and groups are objects. Relationships between them — daughter-of, sibling-of, inherits-from — are morphisms connecting objects."
    },
    {
      id: "cl-fam-02",
      type: "classify",
      domain: "family",
      difficulty: 2,
      prompt: "In a category of biological facts (propositions about organisms), sort these.",
      words: [
        { word: "Wolves are carnivores", kind: "object" },
        { word: "Carnivores eat meat", kind: "object" },
        { word: "Wolves eat meat", kind: "object" },
        { word: "Syllogistic deduction", kind: "morphism" },
        { word: "All mammals are warm-blooded", kind: "object" },
        { word: "Taxonomic classification", kind: "morphism" },
      ],
      explanation: "In a category of propositions, factual statements are objects. The reasoning steps that derive one fact from others are morphisms. 'Wolves eat meat' is a proposition (object); the syllogism that derives it from the other two propositions is a morphism."
    },
    {
      id: "cl-fam-03",
      type: "classify",
      domain: "family",
      difficulty: 1,
      prompt: "Sort these into objects and morphisms.",
      words: [
        { word: "Seed", kind: "object" },
        { word: "Germinate", kind: "morphism" },
        { word: "Seedling", kind: "object" },
        { word: "Photosynthesize", kind: "morphism" },
        { word: "Mature plant", kind: "object" },
        { word: "Pollinate", kind: "morphism" },
        { word: "Fruiting plant", kind: "object" },
      ],
      explanation: "Life stages are objects. Biological processes that advance from one stage to the next are morphisms."
    },
  ],

  // ============================================================
  // TYPE 2: VALIDATE
  // Given two objects and a candidate morphism, is it valid?
  // In which direction?
  // ============================================================
  // Schema: { objectA, objectB, candidate, valid: bool,
  //           direction?: "AtoB"|"BtoA", explanation,
  //           distractorExplanation? }
  // ============================================================
  validate: [
    // --- COOKING ---
    {
      id: "va-cook-01",
      type: "validate",
      domain: "cooking",
      difficulty: 1,
      objectA: "Raw egg",
      objectB: "Hard-boiled egg",
      candidate: "Boil for 12 minutes",
      valid: true,
      direction: "AtoB",
      explanation: "Boiling a raw egg for 12 minutes produces a hard-boiled egg. The morphism is valid from A to B."
    },
    {
      id: "va-cook-02",
      type: "validate",
      domain: "cooking",
      difficulty: 1,
      objectA: "Hard-boiled egg",
      objectB: "Raw egg",
      candidate: "Unboil",
      valid: false,
      direction: null,
      explanation: "Boiling an egg denatures proteins irreversibly. No morphism exists from hard-boiled back to raw. This is a non-isomorphism: information (protein structure) is destroyed."
    },
    {
      id: "va-cook-03",
      type: "validate",
      domain: "cooking",
      difficulty: 1,
      objectA: "Whole onion",
      objectB: "Diced onion",
      candidate: "Sauté",
      valid: false,
      direction: null,
      explanation: "Sautéing does not transform a whole onion into a diced onion. The correct morphism would be 'dice' or 'chop.' Sautéing transforms diced onion into soft translucent onion — different source, different target."
    },
    {
      id: "va-cook-04",
      type: "validate",
      domain: "cooking",
      difficulty: 2,
      objectA: "Cream",
      objectB: "Butter",
      candidate: "Churn",
      valid: true,
      direction: "AtoB",
      explanation: "Churning cream separates fat from buttermilk, producing butter. Valid morphism from cream to butter."
    },
    {
      id: "va-cook-05",
      type: "validate",
      domain: "cooking",
      difficulty: 2,
      objectA: "Butter",
      objectB: "Cream",
      candidate: "Melt and remix",
      valid: false,
      direction: null,
      explanation: "Melting butter does not reconstitute cream. The fat-buttermilk separation is irreversible. No valid morphism from butter back to cream."
    },
    {
      id: "va-cook-06",
      type: "validate",
      domain: "cooking",
      difficulty: 2,
      objectA: "Water",
      objectB: "Ice",
      candidate: "Freeze",
      valid: true,
      direction: "AtoB",
      explanation: "Freezing water produces ice. And notably, a reverse morphism (thaw) also exists — making this an isomorphism in a category of physical states."
    },
    {
      id: "va-cook-07",
      type: "validate",
      domain: "cooking",
      difficulty: 2,
      objectA: "Flour",
      objectB: "Cake",
      candidate: "Bake",
      valid: false,
      direction: null,
      explanation: "Baking flour alone does not produce a cake. You would need flour + eggs + sugar + butter (a product of multiple objects) as the source. The morphism 'bake' is valid, but the source object is wrong."
    },
    {
      id: "va-cook-08",
      type: "validate",
      domain: "cooking",
      difficulty: 1,
      objectA: "Frozen meat",
      objectB: "Thawed meat",
      candidate: "Refrigerate overnight",
      valid: true,
      direction: "AtoB",
      explanation: "Placing frozen meat in the refrigerator overnight thaws it. This is one of several valid morphisms between these objects (fridge, cold water, microwave)."
    },

    // --- LOGIC ---
    {
      id: "va-logic-01",
      type: "validate",
      domain: "logic",
      difficulty: 1,
      objectA: "It is raining",
      objectB: "The ground is wet",
      candidate: "Rain deposits water on the ground",
      valid: true,
      direction: "AtoB",
      explanation: "The causal/logical chain 'rain deposits water on surfaces' is a valid proof that raining implies wet ground."
    },
    {
      id: "va-logic-02",
      type: "validate",
      domain: "logic",
      difficulty: 2,
      objectA: "The ground is wet",
      objectB: "It is raining",
      candidate: "Wet ground implies rain",
      valid: false,
      direction: null,
      explanation: "The ground could be wet from a sprinkler, a spill, or morning dew. Wet ground does not imply rain. No valid morphism in this direction."
    },
    {
      id: "va-logic-03",
      type: "validate",
      domain: "logic",
      difficulty: 1,
      objectA: "All humans are mortal",
      objectB: "Socrates is mortal",
      candidate: "Socrates is human, therefore mortal (syllogism)",
      valid: true,
      direction: "AtoB",
      explanation: "Given the additional premise 'Socrates is human,' the syllogism is valid. Strictly, the source object is the conjunction 'All humans are mortal AND Socrates is human.' The morphism is the deductive step."
    },
    {
      id: "va-logic-04",
      type: "validate",
      domain: "logic",
      difficulty: 2,
      objectA: "P and Q",
      objectB: "P",
      candidate: "Conjunction elimination",
      valid: true,
      direction: "AtoB",
      explanation: "Conjunction elimination is the rule that from 'P and Q' you can derive P. Valid morphism from the conjunction to either conjunct."
    },
    {
      id: "va-logic-05",
      type: "validate",
      domain: "logic",
      difficulty: 2,
      objectA: "P",
      objectB: "P or Q",
      candidate: "Disjunction introduction",
      valid: true,
      direction: "AtoB",
      explanation: "From P alone, you can always derive 'P or Q' for any Q. This is disjunction introduction — a valid morphism."
    },
    {
      id: "va-logic-06",
      type: "validate",
      domain: "logic",
      difficulty: 3,
      objectA: "P or Q",
      objectB: "P",
      candidate: "Disjunction elimination",
      valid: false,
      direction: null,
      explanation: "You cannot derive P from 'P or Q' alone — Q might be the true disjunct. Disjunction elimination requires additional premises (proofs from both P→R and Q→R). The morphism is invalid as stated."
    },
    {
      id: "va-logic-07",
      type: "validate",
      domain: "logic",
      difficulty: 2,
      objectA: "If P then Q",
      objectB: "If not Q then not P",
      candidate: "Contrapositive",
      valid: true,
      direction: "AtoB",
      explanation: "The contrapositive is logically equivalent to the original implication. This is a valid morphism — and the reverse is also valid, making it an isomorphism."
    },

    // --- FAMILY / BIOLOGY ---
    {
      id: "va-fam-01",
      type: "validate",
      domain: "family",
      difficulty: 1,
      objectA: "X is Y's biological parent",
      objectB: "X and Y share DNA",
      candidate: "Biological parent entails shared DNA",
      valid: true,
      direction: "AtoB",
      explanation: "Biological parentage entails shared DNA through inheritance. Valid morphism from A to B."
    },
    {
      id: "va-fam-02",
      type: "validate",
      domain: "family",
      difficulty: 2,
      objectA: "X and Y share DNA",
      objectB: "X is Y's biological parent",
      candidate: "Shared DNA entails parentage",
      valid: false,
      direction: null,
      explanation: "Shared DNA could result from sibling, grandparent, aunt/uncle, or cousin relationships. Shared DNA does not entail parentage specifically. No valid morphism."
    },
    {
      id: "va-fam-03",
      type: "validate",
      domain: "family",
      difficulty: 1,
      objectA: "Seed",
      objectB: "Seedling",
      candidate: "Germinate",
      valid: true,
      direction: "AtoB",
      explanation: "Germination transforms a seed into a seedling. Valid morphism."
    },
    {
      id: "va-fam-04",
      type: "validate",
      domain: "family",
      difficulty: 2,
      objectA: "Seedling",
      objectB: "Seed",
      candidate: "Reverse germination",
      valid: false,
      direction: null,
      explanation: "Germination is irreversible — a seedling cannot become a seed again. No morphism exists in this direction."
    },
    {
      id: "va-fam-05",
      type: "validate",
      domain: "family",
      difficulty: 2,
      objectA: "Caterpillar",
      objectB: "Butterfly",
      candidate: "Metamorphosis",
      valid: true,
      direction: "AtoB",
      explanation: "Metamorphosis is the biological process that transforms a caterpillar into a butterfly. Valid morphism — and irreversible, so not an isomorphism."
    },
    {
      id: "va-fam-06",
      type: "validate",
      domain: "family",
      difficulty: 1,
      objectA: "X is Y's mother",
      objectB: "Y is X's child",
      candidate: "If X is Y's mother, then Y is X's child",
      valid: true,
      direction: "AtoB",
      explanation: "The deduction is immediate and valid. And the reverse holds too — this is an isomorphism."
    },
  ],

  // ============================================================
  // TYPE 3: COMPOSE
  // Given a chain with one piece missing, fill it in
  // ============================================================
  // Schema: { chain: [{from, to, morphism}], missing: "from"|"to"|"morphism"|"composed",
  //           missingIndex?, answer, options[], explanation }
  // ============================================================
  compose: [
    // --- COOKING ---
    {
      id: "co-cook-01",
      type: "compose",
      domain: "cooking",
      difficulty: 1,
      prompt: "What is the composed morphism from Raw to Caramelized?",
      chain: [
        { from: "Raw onion", to: "Soft onion", morphism: "sauté" },
        { from: "Soft onion", to: "Caramelized onion", morphism: "keep cooking on low heat" }
      ],
      missing: "composed",
      answer: "Caramelize (cook on medium then low for 30+ min)",
      options: [
        "Caramelize (cook on medium then low for 30+ min)",
        "Deep fry",
        "Blanch",
        "Dehydrate"
      ],
      explanation: "The composition of sauté ∘ keep cooking = caramelize. The composed morphism accomplishes in one named operation what the chain does in two steps."
    },
    {
      id: "co-cook-02",
      type: "compose",
      domain: "cooking",
      difficulty: 1,
      prompt: "What is the missing target object?",
      chain: [
        { from: "Flour + water + yeast", to: "Dough", morphism: "knead" },
        { from: "Dough", to: "?", morphism: "proof for 1 hour" }
      ],
      missing: "to",
      missingIndex: 1,
      answer: "Risen dough",
      options: ["Risen dough", "Bread", "Batter", "Flatbread"],
      explanation: "Proofing dough allows yeast to produce gas, creating risen dough. Bread requires an additional morphism (bake)."
    },
    {
      id: "co-cook-03",
      type: "compose",
      domain: "cooking",
      difficulty: 2,
      prompt: "What morphism is missing?",
      chain: [
        { from: "Whole tomatoes", to: "Crushed tomatoes", morphism: "crush by hand" },
        { from: "Crushed tomatoes", to: "Tomato sauce", morphism: "?" }
      ],
      missing: "morphism",
      missingIndex: 1,
      answer: "Simmer with seasoning for 30 min",
      options: [
        "Simmer with seasoning for 30 min",
        "Freeze",
        "Dice",
        "Strain"
      ],
      explanation: "Simmering crushed tomatoes with seasoning reduces and concentrates them into sauce. This is the morphism that connects these two objects."
    },
    {
      id: "co-cook-04",
      type: "compose",
      domain: "cooking",
      difficulty: 2,
      prompt: "What is the missing source object?",
      chain: [
        { from: "?", to: "Browned meat", morphism: "sear in hot pan" },
        { from: "Browned meat", to: "Braised meat", morphism: "braise in liquid for 3 hours" }
      ],
      missing: "from",
      missingIndex: 0,
      answer: "Seasoned raw meat",
      options: ["Seasoned raw meat", "Frozen meat", "Ground meat", "Cured meat"],
      explanation: "Searing requires seasoned raw meat as input. Frozen meat would need thawing first; ground meat would crumble; cured meat is already preserved differently."
    },
    {
      id: "co-cook-05",
      type: "compose",
      domain: "cooking",
      difficulty: 2,
      prompt: "Name the composed morphism for the full chain.",
      chain: [
        { from: "Raw potatoes", to: "Peeled potatoes", morphism: "peel" },
        { from: "Peeled potatoes", to: "Boiled potatoes", morphism: "boil until tender" },
        { from: "Boiled potatoes", to: "Mashed potatoes", morphism: "mash with butter and cream" }
      ],
      missing: "composed",
      answer: "Make mashed potatoes (peel, boil, mash)",
      options: [
        "Make mashed potatoes (peel, boil, mash)",
        "Make french fries",
        "Make potato soup",
        "Make hash browns"
      ],
      explanation: "The three-step composition peel ∘ boil ∘ mash = make mashed potatoes. Each intermediate object is a necessary waypoint."
    },

    // --- LOGIC ---
    {
      id: "co-logic-01",
      type: "compose",
      domain: "logic",
      difficulty: 1,
      prompt: "What is the composed implication?",
      chain: [
        { from: "It is raining", to: "The ground is wet", morphism: "rain deposits water" },
        { from: "The ground is wet", to: "The sidewalk is slippery", morphism: "water reduces friction" }
      ],
      missing: "composed",
      answer: "Rain causes slippery sidewalks",
      options: [
        "Rain causes slippery sidewalks",
        "Slippery sidewalks cause rain",
        "The ground is always wet",
        "Rain causes drought"
      ],
      explanation: "Composing the two proofs: rain → wet ground → slippery sidewalk. The composed morphism is the direct proof that rain implies slippery sidewalks."
    },
    {
      id: "co-logic-02",
      type: "compose",
      domain: "logic",
      difficulty: 2,
      prompt: "What is the missing intermediate proposition?",
      chain: [
        { from: "All dogs are mammals", to: "?", morphism: "dogs are a subset of mammals" },
        { from: "?", to: "All dogs are warm-blooded", morphism: "warm-bloodedness is a property of mammals" }
      ],
      missing: "to",
      missingIndex: 0,
      answer: "All mammals are warm-blooded",
      options: [
        "All mammals are warm-blooded",
        "Some dogs are warm-blooded",
        "All warm-blooded animals are dogs",
        "All animals are warm-blooded"
      ],
      explanation: "The intermediate proposition is 'All mammals are warm-blooded.' The chain is: dogs ⊂ mammals, mammals → warm-blooded, therefore dogs → warm-blooded."
    },
    {
      id: "co-logic-03",
      type: "compose",
      domain: "logic",
      difficulty: 2,
      prompt: "What proof technique connects these?",
      chain: [
        { from: "If P then Q", to: "If not-Q then not-P", morphism: "?" }
      ],
      missing: "morphism",
      missingIndex: 0,
      answer: "Contrapositive",
      options: ["Contrapositive", "Modus ponens", "Proof by induction", "Conjunction elimination"],
      explanation: "The contrapositive rule states: 'If P then Q' is logically equivalent to 'If not-Q then not-P.' This is the specific morphism (proof technique) that connects these two propositions."
    },

    // --- FAMILY / BIOLOGY ---
    {
      id: "co-fam-01",
      type: "compose",
      domain: "family",
      difficulty: 1,
      prompt: "What is the composed morphism?",
      chain: [
        { from: "Seed", to: "Seedling", morphism: "germinate" },
        { from: "Seedling", to: "Mature plant", morphism: "grow" },
        { from: "Mature plant", to: "Fruiting plant", morphism: "flower and fruit" }
      ],
      missing: "composed",
      answer: "Full plant lifecycle (seed to fruit)",
      options: [
        "Full plant lifecycle (seed to fruit)",
        "Photosynthesis",
        "Pollination only",
        "Decomposition"
      ],
      explanation: "The composition germinate ∘ grow ∘ fruit = full lifecycle. Each morphism advances one stage."
    },
    {
      id: "co-fam-02",
      type: "compose",
      domain: "family",
      difficulty: 2,
      prompt: "What is the missing relationship?",
      chain: [
        { from: "Alice is Bob's mother", to: "Bob is Carol's father", morphism: "Bob is Alice's son" },
        { from: "Bob is Carol's father", to: "Alice is Carol's grandmother", morphism: "?" }
      ],
      missing: "morphism",
      missingIndex: 1,
      answer: "If X's son is Y's parent, then X is Y's grandparent",
      options: [
        "If X's son is Y's parent, then X is Y's grandparent",
        "If X is Y's parent, then X is Y's grandparent",
        "If X is Y's sibling, then X is Y's aunt",
        "If X is Y's cousin, then X is Y's uncle"
      ],
      explanation: "The morphism is the deductive step: mother-of-father = grandmother. This is composition of family relationships."
    },
    {
      id: "co-fam-03",
      type: "compose",
      domain: "family",
      difficulty: 2,
      prompt: "What is the missing intermediate stage?",
      chain: [
        { from: "Egg", to: "?", morphism: "hatch" },
        { from: "?", to: "Adult frog", morphism: "metamorphose" }
      ],
      missing: "to",
      missingIndex: 0,
      answer: "Tadpole",
      options: ["Tadpole", "Larva", "Pupa", "Newt"],
      explanation: "A frog egg hatches into a tadpole, which then metamorphoses into an adult frog. The tadpole is the intermediate object in this composition."
    },
  ],

  // ============================================================
  // TYPE 4: ISOMORPHISM CHECK
  // Given two objects with a morphism, is it an isomorphism?
  // ============================================================
  // Schema: { objectA, objectB, morphismAtoB, isIso: bool,
  //           reverseMorphism?, explanation }
  // ============================================================
  isomorphism: [
    // --- COOKING ---
    {
      id: "iso-cook-01",
      type: "isomorphism",
      domain: "cooking",
      difficulty: 1,
      objectA: "Water",
      objectB: "Ice",
      morphismAtoB: "Freeze",
      isIso: true,
      reverseMorphism: "Thaw",
      explanation: "Freezing water produces ice, and thawing ice produces water. Both morphisms exist and compose to identity. No information is lost — the H₂O molecules are unchanged. Isomorphism."
    },
    {
      id: "iso-cook-02",
      type: "isomorphism",
      domain: "cooking",
      difficulty: 1,
      objectA: "Raw egg",
      objectB: "Scrambled egg",
      morphismAtoB: "Scramble in pan",
      isIso: false,
      reverseMorphism: null,
      explanation: "Scrambling denatures egg proteins irreversibly. You cannot unscramble an egg. No reverse morphism exists. Not an isomorphism."
    },
    {
      id: "iso-cook-03",
      type: "isomorphism",
      domain: "cooking",
      difficulty: 2,
      objectA: "Dissolved sugar in water",
      objectB: "Sugar crystals + water (separated)",
      morphismAtoB: "Evaporate water to crystallize",
      isIso: true,
      reverseMorphism: "Dissolve crystals in water",
      explanation: "You can dissolve sugar in water and later recover the crystals by evaporation. Both transformations are reversible and compose to identity. Isomorphism."
    },
    {
      id: "iso-cook-04",
      type: "isomorphism",
      domain: "cooking",
      difficulty: 2,
      objectA: "Cream",
      objectB: "Whipped cream",
      morphismAtoB: "Whip with air",
      isIso: false,
      reverseMorphism: null,
      explanation: "While whipped cream does eventually deflate back toward liquid cream, the process is not a clean inverse — it loses structure progressively and unevenly. In a strict categorical sense, the deflated result is not identical to the original cream. Not an isomorphism."
    },
    {
      id: "iso-cook-05",
      type: "isomorphism",
      domain: "cooking",
      difficulty: 3,
      objectA: "Dry pasta",
      objectB: "Cooked pasta",
      morphismAtoB: "Boil in water for 10 minutes",
      isIso: false,
      reverseMorphism: null,
      explanation: "Boiling pasta hydrates and gelatinizes the starch. Drying cooked pasta does not restore it to its original dry state — it becomes brittle and cracked, not the same as the original. Not an isomorphism."
    },

    // --- LOGIC ---
    {
      id: "iso-logic-01",
      type: "isomorphism",
      domain: "logic",
      difficulty: 1,
      objectA: "If P then Q",
      objectB: "If not-Q then not-P",
      morphismAtoB: "Contrapositive",
      isIso: true,
      reverseMorphism: "Contrapositive (applied again)",
      explanation: "A conditional and its contrapositive are logically equivalent. Applying the contrapositive rule twice returns to the original. Isomorphism."
    },
    {
      id: "iso-logic-02",
      type: "isomorphism",
      domain: "logic",
      difficulty: 2,
      objectA: "P and Q",
      objectB: "P",
      morphismAtoB: "Conjunction elimination (drop Q)",
      isIso: false,
      reverseMorphism: null,
      explanation: "From 'P and Q' you can derive P by dropping Q. But from P alone you cannot recover 'P and Q' — you've lost the information about Q. Information is destroyed. Not an isomorphism."
    },
    {
      id: "iso-logic-03",
      type: "isomorphism",
      domain: "logic",
      difficulty: 2,
      objectA: "not (P and Q)",
      objectB: "(not P) or (not Q)",
      morphismAtoB: "De Morgan's law",
      isIso: true,
      reverseMorphism: "De Morgan's law (reverse direction)",
      explanation: "De Morgan's laws establish that these two propositions are logically equivalent. Each can be derived from the other. Isomorphism."
    },
    {
      id: "iso-logic-04",
      type: "isomorphism",
      domain: "logic",
      difficulty: 2,
      objectA: "P",
      objectB: "P or Q",
      morphismAtoB: "Disjunction introduction",
      isIso: false,
      reverseMorphism: null,
      explanation: "From P you can derive 'P or Q', but from 'P or Q' you cannot determine which disjunct is true. Information about which one holds is added (P is definitely true) going one way but absent going the other. Not an isomorphism."
    },

    // --- FAMILY / BIOLOGY ---
    {
      id: "iso-fam-01",
      type: "isomorphism",
      domain: "family",
      difficulty: 1,
      objectA: "Emily's father is Gordon",
      objectB: "Emily is Gordon's daughter",
      morphismAtoB: "If X's father is Y, then X is Y's daughter",
      isIso: true,
      reverseMorphism: "If X is Y's daughter, then Y is X's father",
      explanation: "Each statement entails the other through a single deductive step. No information is gained or lost. Isomorphism."
    },
    {
      id: "iso-fam-02",
      type: "isomorphism",
      domain: "family",
      difficulty: 2,
      objectA: "Gordon is Emily's biological father",
      objectB: "Gordon and Emily share DNA",
      morphismAtoB: "Biological parent entails shared DNA",
      isIso: false,
      reverseMorphism: null,
      explanation: "Shared DNA could come from any familial relationship (sibling, grandparent, cousin). The specific 'father' relationship is lost. Not an isomorphism."
    },
    {
      id: "iso-fam-03",
      type: "isomorphism",
      domain: "family",
      difficulty: 2,
      objectA: "Caterpillar",
      objectB: "Butterfly",
      morphismAtoB: "Metamorphosis",
      isIso: false,
      reverseMorphism: null,
      explanation: "Metamorphosis is a one-way biological transformation. A butterfly cannot revert to a caterpillar. Not an isomorphism."
    },
    {
      id: "iso-fam-04",
      type: "isomorphism",
      domain: "family",
      difficulty: 1,
      objectA: "The whale is a mammal",
      objectB: "The whale is a warm-blooded animal that nurses its young",
      morphismAtoB: "Definition of mammal",
      isIso: true,
      reverseMorphism: "These properties define mammal",
      explanation: "Being a mammal is definitionally equivalent to being warm-blooded and nursing young. Each statement entails the other by definition. Isomorphism."
    },
  ],

  // ============================================================
  // TYPE 5: CATEGORY SWITCH
  // Same objects, different category — how do the morphisms change?
  // ============================================================
  // Schema: { objectA, objectB,
  //           categories: [{name, morphism, explanation}],
  //           synthesisQuestion, synthesisAnswer }
  // ============================================================
  category_switch: [
    {
      id: "cs-01",
      type: "category_switch",
      domain: "mixed",
      difficulty: 2,
      objectA: "Chicken",
      objectB: "Nuggets",
      prompt: "The same two objects appear in three different categories. Identify the morphism in each.",
      categories: [
        {
          name: "Category of cooking operations",
          morphism: "Bread and deep fry",
          explanation: "In a kitchen context, the morphism is the physical transformation: cut, bread, fry."
        },
        {
          name: "Category of supply chain steps",
          morphism: "Process at factory and package",
          explanation: "In a supply chain, the morphism is an industrial process — the chicken undergoes factory processing."
        },
        {
          name: "Category of chemical transformations",
          morphism: "Denature proteins via heat, Maillard reaction on breading",
          explanation: "In a chemistry context, the morphism describes molecular changes: protein denaturation and browning reactions."
        }
      ],
      synthesisQuestion: "What determines the morphism between two objects?",
      synthesisAnswer: "The category you place them in. The objects are the same, but the arrows are entirely determined by what kind of structure-preserving maps the category defines."
    },
    {
      id: "cs-02",
      type: "category_switch",
      domain: "mixed",
      difficulty: 2,
      objectA: "New York",
      objectB: "London",
      prompt: "Same two cities, three different categories. What is the morphism in each?",
      categories: [
        {
          name: "Category of flight routes",
          morphism: "Direct flight (~7 hours)",
          explanation: "The morphism is a specific air route with a duration."
        },
        {
          name: "Category of time zone relationships",
          morphism: "Add 5 hours (EST → GMT)",
          explanation: "The morphism is a time offset function."
        },
        {
          name: "Category of cultural exchange",
          morphism: "Historical influence via shared English language and legal tradition",
          explanation: "The morphism is a diffuse cultural-historical relationship — much less precise than the others, which shows that some categories have sharper morphisms than others."
        }
      ],
      synthesisQuestion: "Why does the cultural exchange morphism feel less precise?",
      synthesisAnswer: "Because the category of cultural exchange has poorly defined composition — it is hard to say what it means to compose two cultural influence relationships. A well-defined category requires morphisms that compose cleanly."
    },
    {
      id: "cs-03",
      type: "category_switch",
      domain: "mixed",
      difficulty: 3,
      objectA: "Integer 6",
      objectB: "Integer 12",
      prompt: "Same two numbers in three different categories.",
      categories: [
        {
          name: "Category of divisibility (poset)",
          morphism: "6 divides 12 (6 | 12)",
          explanation: "In the divisibility poset, a morphism from a to b exists if and only if a divides b. 6 divides 12, so the arrow exists."
        },
        {
          name: "Category of addition (ℤ as monoid)",
          morphism: "+6 (add 6 to get from 6 to 12)",
          explanation: "In the integers under addition viewed as a single-object category, the morphism is the operation +6."
        },
        {
          name: "Category of ordering (poset ≤)",
          morphism: "6 ≤ 12",
          explanation: "In the standard ordering, the morphism is simply the fact that 6 is less than or equal to 12."
        }
      ],
      synthesisQuestion: "In which of these categories does a reverse morphism exist?",
      synthesisAnswer: "Only in the addition monoid — the morphism −6 goes from 12 back to 6. In the divisibility poset, 12 does not divide 6. In the ordering poset, 12 is not ≤ 6. So only the monoid gives an isomorphism."
    },
    {
      id: "cs-04",
      type: "category_switch",
      domain: "mixed",
      difficulty: 2,
      objectA: "English sentence",
      objectB: "French sentence",
      prompt: "Same two objects in different categories.",
      categories: [
        {
          name: "Category of semantic translation",
          morphism: "Translate meaning (preserves semantic content)",
          explanation: "The morphism preserves meaning across languages. Composition works: English → French → German should equal English → German."
        },
        {
          name: "Category of word-count functions",
          morphism: "Map to word count (English sentence has n words → French translation has m words)",
          explanation: "This is actually a functor from sentences to numbers, not a morphism within one category. The word counts are generally different, so this mapping loses information."
        },
        {
          name: "Category of syntactic transformations",
          morphism: "Apply French grammar rules (SVO → SVO but adjective-noun → noun-adjective)",
          explanation: "The morphism preserves syntactic structure up to language-specific reordering rules."
        }
      ],
      synthesisQuestion: "Which of these morphisms is an isomorphism?",
      synthesisAnswer: "Semantic translation is the closest to an isomorphism — you can translate back and (ideally) recover the original meaning. Syntactic transformation loses information about the source syntax. Word-count mapping is not even a morphism within one category — it is a functor to a different category (numbers)."
    },
    {
      id: "cs-05",
      type: "category_switch",
      domain: "mixed",
      difficulty: 2,
      objectA: "Seed",
      objectB: "Mature tree",
      prompt: "Same two objects in different categories.",
      categories: [
        {
          name: "Category of biological development",
          morphism: "Grow over 10 years (germinate → sapling → mature)",
          explanation: "The morphism is a biological process composed of many sub-stages."
        },
        {
          name: "Category of carbon accounting",
          morphism: "Sequester 22kg of CO₂ per year for 10 years",
          explanation: "The morphism is measured in carbon absorbed — a quantitative transformation."
        },
        {
          name: "Category of economic value",
          morphism: "Appreciate from $0.10 (seed) to $500 (mature tree for lumber)",
          explanation: "The morphism is a change in market value."
        }
      ],
      synthesisQuestion: "Do all three morphisms compose the same way?",
      synthesisAnswer: "No. Biological stages compose sequentially (seed → sapling → tree). Carbon sequestration composes additively (sum of CO₂ per year). Economic value does not compose cleanly at all — a sapling is not worth half a tree. This shows that composition rules differ across categories."
    },
  ],

  // ============================================================
  // TYPE 6: SPOT THE ERROR
  // A diagram is shown with one invalid element. Find it.
  // ============================================================
  // Schema: { diagram: {objects:[], morphisms:[]},
  //           errorIndex, errorType, explanation, corrected? }
  // ============================================================
  spot_error: [
    {
      id: "se-01",
      type: "spot_error",
      domain: "cooking",
      difficulty: 1,
      prompt: "One arrow in this diagram is invalid. Which one?",
      diagram: {
        objects: ["Raw egg", "Fried egg", "Raw egg"],
        morphisms: [
          { from: 0, to: 1, label: "Fry in pan", valid: true },
          { from: 1, to: 2, label: "Unfry", valid: false },
        ]
      },
      errorIndex: 1,
      errorType: "invalid_morphism",
      explanation: "There is no operation 'unfry' that returns a fried egg to a raw egg. Frying denatures proteins irreversibly. This diagram falsely claims an isomorphism."
    },
    {
      id: "se-02",
      type: "spot_error",
      domain: "cooking",
      difficulty: 2,
      prompt: "One arrow has the wrong label. Which one?",
      diagram: {
        objects: ["Flour + water + yeast", "Dough", "Risen dough", "Bread"],
        morphisms: [
          { from: 0, to: 1, label: "Knead", valid: true },
          { from: 1, to: 2, label: "Bake", valid: false },
          { from: 2, to: 3, label: "Bake", valid: true },
        ]
      },
      errorIndex: 1,
      errorType: "wrong_label",
      explanation: "Dough becomes risen dough through proofing (letting yeast ferment), not baking. Baking is the morphism from risen dough to bread. The label should be 'Proof' or 'Let rise.'"
    },
    {
      id: "se-03",
      type: "spot_error",
      domain: "logic",
      difficulty: 2,
      prompt: "One arrow in this diagram is invalid. Which one?",
      diagram: {
        objects: ["P or Q", "P", "R"],
        morphisms: [
          { from: 0, to: 1, label: "Disjunction elimination", valid: false },
          { from: 1, to: 2, label: "P implies R (given)", valid: true },
        ]
      },
      errorIndex: 0,
      errorType: "invalid_morphism",
      explanation: "You cannot derive P from 'P or Q' alone — Q might be the true disjunct. Disjunction elimination requires proofs from both P→R and Q→R to conclude R, not to extract a single disjunct."
    },
    {
      id: "se-04",
      type: "spot_error",
      domain: "logic",
      difficulty: 2,
      prompt: "One morphism has the wrong direction. Which one?",
      diagram: {
        objects: ["It is raining", "The ground is wet", "Someone turned on a sprinkler"],
        morphisms: [
          { from: 0, to: 1, label: "Rain deposits water", valid: true },
          { from: 1, to: 2, label: "Wet ground implies sprinkler", valid: false },
        ]
      },
      errorIndex: 1,
      errorType: "wrong_direction",
      explanation: "Wet ground does not imply a sprinkler — the ground could be wet for many reasons. The valid morphism goes the other direction: sprinkler → wet ground. This is the classic fallacy of affirming the consequent."
    },
    {
      id: "se-05",
      type: "spot_error",
      domain: "family",
      difficulty: 2,
      prompt: "One arrow is invalid. Which one?",
      diagram: {
        objects: ["X and Y share DNA", "X is Y's biological parent", "X and Y are related"],
        morphisms: [
          { from: 0, to: 1, label: "Shared DNA entails parentage", valid: false },
          { from: 0, to: 2, label: "Shared DNA entails relatedness", valid: true },
        ]
      },
      errorIndex: 0,
      errorType: "invalid_morphism",
      explanation: "Shared DNA does not entail parentage — siblings, cousins, and grandparents also share DNA. The arrow from shared DNA to relatedness is valid because any DNA sharing implies some family relationship."
    },
    {
      id: "se-06",
      type: "spot_error",
      domain: "cooking",
      difficulty: 2,
      prompt: "The composition claim is wrong. Why?",
      diagram: {
        objects: ["Frozen meat", "Thawed meat", "Grilled meat"],
        morphisms: [
          { from: 0, to: 1, label: "Microwave thaw", valid: true },
          { from: 1, to: 2, label: "Grill", valid: true },
          { from: 0, to: 2, label: "Fridge thaw then grill (composed)", valid: false },
        ]
      },
      errorIndex: 2,
      errorType: "wrong_composition",
      explanation: "The individual morphisms use microwave thaw, but the composed morphism claims fridge thaw then grill. The composition must use the same morphisms: microwave thaw ∘ grill ≠ fridge thaw ∘ grill. Different morphisms compose to different results."
    },
    {
      id: "se-07",
      type: "spot_error",
      domain: "family",
      difficulty: 1,
      prompt: "One arrow is invalid. Which one?",
      diagram: {
        objects: ["Seed", "Mature plant", "Seedling"],
        morphisms: [
          { from: 0, to: 1, label: "Germinate", valid: false },
          { from: 0, to: 2, label: "Germinate", valid: true },
        ]
      },
      errorIndex: 0,
      errorType: "wrong_target",
      explanation: "Germination produces a seedling, not a mature plant. The morphism from seed to mature plant would be a composition of germinate ∘ grow, not germination alone."
    },
  ],

  // ============================================================
  // TYPE 7: FUNCTOR MATCH
  // Two categories shown side by side. Map objects and morphisms.
  // ============================================================
  // Schema: { categoryA: {name, objects[], morphisms:[]},
  //           categoryB: {name, objects[], morphisms:[]},
  //           correctMapping: {objects: {}, morphisms: {}},
  //           explanation }
  // ============================================================
  functor_match: [
    {
      id: "fu-01",
      type: "functor_match",
      domain: "mixed",
      difficulty: 2,
      prompt: "Map each object and morphism in 𝒞 to its counterpart in 𝒟 so that composition is preserved.",
      categoryA: {
        name: "𝒞: Physical objects",
        objects: ["Bowling ball", "Tennis ball", "Ping pong ball"],
        morphisms: [
          { from: "Bowling ball", to: "Tennis ball", label: "heavier than" },
          { from: "Tennis ball", to: "Ping pong ball", label: "heavier than" },
          { from: "Bowling ball", to: "Ping pong ball", label: "heavier than (composed)" }
        ]
      },
      categoryB: {
        name: "𝒟: Numbers (kg)",
        objects: ["6.35", "0.058", "0.003"],
        morphisms: [
          { from: "6.35", to: "0.058", label: "≥" },
          { from: "0.058", to: "0.003", label: "≥" },
          { from: "6.35", to: "0.003", label: "≥ (composed)" }
        ]
      },
      correctMapping: {
        objects: { "Bowling ball": "6.35", "Tennis ball": "0.058", "Ping pong ball": "0.003" },
        morphisms: { "heavier than": "≥" }
      },
      explanation: "The weight functor maps each physical object to its mass and preserves the 'heavier than' ordering as '≥'. Composition is preserved: if A is heavier than B and B is heavier than C, then F(A) ≥ F(B) ≥ F(C)."
    },
    {
      id: "fu-02",
      type: "functor_match",
      domain: "mixed",
      difficulty: 2,
      prompt: "Map each object and morphism from the biology category to the size category.",
      categoryA: {
        name: "𝒞: Frog lifecycle",
        objects: ["Egg", "Tadpole", "Frog"],
        morphisms: [
          { from: "Egg", to: "Tadpole", label: "hatch" },
          { from: "Tadpole", to: "Frog", label: "metamorphose" }
        ]
      },
      categoryB: {
        name: "𝒟: Size categories",
        objects: ["Tiny", "Small", "Medium"],
        morphisms: [
          { from: "Tiny", to: "Small", label: "grows larger" },
          { from: "Small", to: "Medium", label: "grows larger" }
        ]
      },
      correctMapping: {
        objects: { "Egg": "Tiny", "Tadpole": "Small", "Frog": "Medium" },
        morphisms: { "hatch": "grows larger", "metamorphose": "grows larger" }
      },
      explanation: "The size functor maps life stages to size categories. Both 'hatch' and 'metamorphose' map to 'grows larger' — the functor collapses two distinct biological morphisms into one size morphism. Information is lost, but structure (ordering) is preserved."
    },
    {
      id: "fu-03",
      type: "functor_match",
      domain: "mixed",
      difficulty: 3,
      prompt: "This is a monoid-to-monoid functor. Map the morphisms.",
      categoryA: {
        name: "𝒞: (ℤ, +) — integers under addition",
        objects: ["ℤ"],
        morphisms: [
          { from: "ℤ", to: "ℤ", label: "+0 (identity)" },
          { from: "ℤ", to: "ℤ", label: "+1" },
          { from: "ℤ", to: "ℤ", label: "+2" },
          { from: "ℤ", to: "ℤ", label: "+3" },
        ]
      },
      categoryB: {
        name: "𝒟: (ℝ⁺, ×) — positive reals under multiplication",
        objects: ["ℝ⁺"],
        morphisms: [
          { from: "ℝ⁺", to: "ℝ⁺", label: "×1 (identity)" },
          { from: "ℝ⁺", to: "ℝ⁺", label: "×e" },
          { from: "ℝ⁺", to: "ℝ⁺", label: "×e²" },
          { from: "ℝ⁺", to: "ℝ⁺", label: "×e³" },
        ]
      },
      correctMapping: {
        objects: { "ℤ": "ℝ⁺" },
        morphisms: { "+0 (identity)": "×1 (identity)", "+1": "×e", "+2": "×e²", "+3": "×e³" }
      },
      explanation: "The exponential functor F = exp maps addition to multiplication. F(+n) = ×eⁿ. Composition is preserved because e^(a+b) = e^a · e^b. This is why exponentials convert addition to multiplication."
    },
    {
      id: "fu-04",
      type: "functor_match",
      domain: "mixed",
      difficulty: 2,
      prompt: "Map the logical category to the set-theoretic category.",
      categoryA: {
        name: "𝒞: Propositions",
        objects: ["P: x is a dog", "Q: x is a mammal", "R: x is an animal"],
        morphisms: [
          { from: "P: x is a dog", to: "Q: x is a mammal", label: "dogs are mammals" },
          { from: "Q: x is a mammal", to: "R: x is an animal", label: "mammals are animals" }
        ]
      },
      categoryB: {
        name: "𝒟: Sets with inclusion",
        objects: ["Dogs", "Mammals", "Animals"],
        morphisms: [
          { from: "Dogs", to: "Mammals", label: "⊆" },
          { from: "Mammals", to: "Animals", label: "⊆" }
        ]
      },
      correctMapping: {
        objects: { "P: x is a dog": "Dogs", "Q: x is a mammal": "Mammals", "R: x is an animal": "Animals" },
        morphisms: { "dogs are mammals": "⊆", "mammals are animals": "⊆" }
      },
      explanation: "The functor maps propositions to the sets of things satisfying them, and logical implications to subset inclusions. 'Dogs are mammals' (a proof) maps to Dogs ⊆ Mammals (a set inclusion). Structure is preserved: if A implies B and B implies C, then A ⊆ B ⊆ C."
    },
  ],

  // ============================================================
  // TYPE 8: FREE CONSTRUCTION (the Emily game)
  // Two random objects given. Build the relationship from scratch.
  // ============================================================
  // Schema: { objectA, objectB, steps: [question + options],
  //           authorAnalysis: {category, morphism, direction, isIso, explanation} }
  // ============================================================
  free_construction: [
    {
      id: "fc-01",
      type: "free_construction",
      domain: "mixed",
      difficulty: 1,
      objectA: "Thunderstorm",
      objectB: "Wet grass",
      steps: [
        {
          question: "Does a morphism exist between these two objects?",
          options: ["Yes", "No", "Depends on the category"],
          answer: "Depends on the category"
        },
        {
          question: "In a category of causal events, what direction does the morphism go?",
          options: ["Thunderstorm → Wet grass", "Wet grass → Thunderstorm", "Both directions", "Neither"],
          answer: "Thunderstorm → Wet grass"
        },
        {
          question: "Is this an isomorphism in the causal category?",
          options: ["Yes — wet grass implies a thunderstorm", "No — wet grass could have other causes"],
          answer: "No — wet grass could have other causes"
        }
      ],
      authorAnalysis: {
        category: "Causal events",
        morphism: "Thunderstorm causes rain which wets grass",
        direction: "AtoB",
        isIso: false,
        explanation: "In a causal category, the morphism exists A→B because storms cause wet grass. It is not an isomorphism because wet grass does not imply a storm (sprinklers, dew, etc.). In a category of co-occurring weather observations, the relationship might be different."
      }
    },
    {
      id: "fc-02",
      type: "free_construction",
      domain: "mixed",
      difficulty: 2,
      objectA: "A map of Paris",
      objectB: "Paris",
      steps: [
        {
          question: "What kind of categorical relationship might exist here?",
          options: ["Morphism within one category", "Functor between categories", "No relationship"],
          answer: "Functor between categories"
        },
        {
          question: "If it's a functor, what does it preserve?",
          options: [
            "Spatial relationships (if A is north of B on the map, A is north of B in reality)",
            "Colors (the map's colors match reality)",
            "Size (the map is the same size as Paris)"
          ],
          answer: "Spatial relationships (if A is north of B on the map, A is north of B in reality)"
        },
        {
          question: "Is this functor an isomorphism of categories?",
          options: ["Yes — the map perfectly represents Paris", "No — the map loses information (altitude, smells, sounds, etc.)"],
          answer: "No — the map loses information (altitude, smells, sounds, etc.)"
        }
      ],
      authorAnalysis: {
        category: "Spatial representations → Physical geography",
        morphism: "The map is a functor — it maps points to points and spatial relationships to spatial relationships",
        direction: "AtoB",
        isIso: false,
        explanation: "A map is a classic example of a functor. It maps the category of locations-on-paper to the category of locations-in-reality, preserving adjacency and direction. But it is not an equivalence — it collapses three dimensions to two, drops sensory information, and discretizes continuous space. 'The map is not the territory' is a statement about functors not being isomorphisms."
      }
    },
    {
      id: "fc-03",
      type: "free_construction",
      domain: "mixed",
      difficulty: 2,
      objectA: "A recipe",
      objectB: "A finished dish",
      steps: [
        {
          question: "What is the relationship between a recipe and a finished dish?",
          options: [
            "The recipe is a morphism (it describes the transformation)",
            "The recipe is an object (it is a thing in itself)",
            "The recipe is a functor"
          ],
          answer: "The recipe is a morphism (it describes the transformation)"
        },
        {
          question: "If the recipe is a morphism, what is the source object?",
          options: ["The raw ingredients", "The recipe itself", "The kitchen"],
          answer: "The raw ingredients"
        },
        {
          question: "Can two different recipes be morphisms between the same source and target?",
          options: ["Yes — like two different paths to the same dish", "No — each dish has exactly one recipe"],
          answer: "Yes — like two different paths to the same dish"
        }
      ],
      authorAnalysis: {
        category: "Cooking operations",
        morphism: "A recipe is a composed morphism: a specific sequence of operations from ingredients to finished dish",
        direction: "ingredients → dish",
        isIso: false,
        explanation: "A recipe is a morphism from raw ingredients to finished dish. Multiple recipes can connect the same source to the same target (different parallel morphisms). This is exactly the thawing meat example — multiple arrows between the same pair of objects."
      }
    },
    {
      id: "fc-04",
      type: "free_construction",
      domain: "mixed",
      difficulty: 2,
      objectA: "A photograph of a person",
      objectB: "The person",
      steps: [
        {
          question: "Does a morphism exist, and in which direction?",
          options: ["Photo → Person", "Person → Photo", "Both", "Neither — different categories"],
          answer: "Person → Photo"
        },
        {
          question: "What is the morphism?",
          options: [
            "Taking the photograph (capturing light reflected by the person)",
            "Recognizing the person in the photo",
            "Printing the photo"
          ],
          answer: "Taking the photograph (capturing light reflected by the person)"
        },
        {
          question: "Is this an isomorphism?",
          options: [
            "Yes — you can reconstruct the person from the photo",
            "No — the photo loses depth, motion, and all non-visual information"
          ],
          answer: "No — the photo loses depth, motion, and all non-visual information"
        }
      ],
      authorAnalysis: {
        category: "Representations",
        morphism: "Photography — captures visual information and maps a 3D person to a 2D image",
        direction: "BtoA",
        isIso: false,
        explanation: "The morphism goes from person to photo (the camera acts on the person). It is not an isomorphism — enormous amounts of information (depth, motion, sound, smell, the back of their head) are lost. Like the map example, this is a lossy functor."
      }
    },
    {
      id: "fc-05",
      type: "free_construction",
      domain: "mixed",
      difficulty: 1,
      objectA: "An English word",
      objectB: "Its Spanish translation",
      steps: [
        {
          question: "In a category of semantic content, what direction does translation go?",
          options: ["English → Spanish", "Spanish → English", "Both directions"],
          answer: "Both directions"
        },
        {
          question: "Is translation an isomorphism?",
          options: [
            "Yes for most words — you can translate back and recover the original meaning",
            "No — many words have no exact equivalent (untranslatable concepts)",
            "It depends on the specific word"
          ],
          answer: "It depends on the specific word"
        },
        {
          question: "Give an example where translation is NOT an isomorphism.",
          options: [
            "'Sobremesa' (Spanish for lingering at the table after a meal) — no single English equivalent",
            "'Cat' ↔ 'Gato' — exact equivalence",
            "'Water' ↔ 'Agua' — exact equivalence"
          ],
          answer: "'Sobremesa' (Spanish for lingering at the table after a meal) — no single English equivalent"
        }
      ],
      authorAnalysis: {
        category: "Semantic content",
        morphism: "Translation — attempts to preserve meaning across languages",
        direction: "both (when exact equivalents exist)",
        isIso: false,
        explanation: "Translation is an isomorphism for some word pairs (cat ↔ gato) but not others (sobremesa has no English equivalent). This shows that isomorphism can hold for some objects in a category but fail for others. The category of semantic content has a rich, uneven structure."
      }
    },
    {
      id: "fc-06",
      type: "free_construction",
      domain: "mixed",
      difficulty: 3,
      objectA: "A musical chord (C major)",
      objectB: "A musical chord (G major)",
      steps: [
        {
          question: "In a category of musical keys under transposition, what is the morphism?",
          options: [
            "Transpose up 7 semitones",
            "Play louder",
            "Change tempo",
            "No morphism exists"
          ],
          answer: "Transpose up 7 semitones"
        },
        {
          question: "Is this an isomorphism?",
          options: [
            "Yes — transposing down 7 semitones reverses it exactly",
            "No — the chords sound different so information is lost"
          ],
          answer: "Yes — transposing down 7 semitones reverses it exactly"
        },
        {
          question: "What makes this a monoid?",
          options: [
            "All 12 transpositions are morphisms from the single object 'pitch class' to itself",
            "Chords are objects and melodies are morphisms",
            "It is not a monoid"
          ],
          answer: "All 12 transpositions are morphisms from the single object 'pitch class' to itself"
        }
      ],
      authorAnalysis: {
        category: "Pitch classes under transposition (ℤ₁₂ monoid)",
        morphism: "Transpose up 7 semitones (equivalent to +7 in ℤ₁₂)",
        direction: "both (transposition is always invertible)",
        isIso: true,
        explanation: "Musical transposition forms the cyclic group ℤ₁₂ (integers mod 12). Every transposition is an isomorphism because it can be reversed. The 12 transpositions are morphisms in a single-object category (monoid). Composing 'up 7' with 'up 5' gives 'up 12' = identity. This is the same algebraic structure as clock arithmetic."
      }
    },
    {
      id: "fc-07",
      type: "free_construction",
      domain: "mixed",
      difficulty: 2,
      objectA: "A promise",
      objectB: "A fulfilled obligation",
      steps: [
        {
          question: "In a category of contractual states, what is the morphism?",
          options: [
            "Fulfillment — performing the promised action",
            "Negotiation — discussing the terms",
            "Breach — failing to perform"
          ],
          answer: "Fulfillment — performing the promised action"
        },
        {
          question: "Is this an isomorphism?",
          options: [
            "Yes — you can un-fulfill an obligation",
            "No — once fulfilled, the obligation is discharged and cannot return to the 'promise' state"
          ],
          answer: "No — once fulfilled, the obligation is discharged and cannot return to the 'promise' state"
        },
        {
          question: "What other morphisms might exist from 'promise' in this category?",
          options: [
            "Breach, renegotiation, expiration — each leading to a different target object",
            "Only fulfillment exists",
            "Promises have no morphisms"
          ],
          answer: "Breach, renegotiation, expiration — each leading to a different target object"
        }
      ],
      authorAnalysis: {
        category: "Contractual states",
        morphism: "Fulfillment — the act of performing what was promised",
        direction: "AtoB",
        isIso: false,
        explanation: "A promise can be transformed into a fulfilled obligation, a breached contract, a renegotiated agreement, or an expired commitment. Each is a different morphism from the same source to different targets. Fulfillment is irreversible. This category has a rich branching structure — one source object, many possible morphisms to different targets."
      }
    },
    {
      id: "fc-08",
      type: "free_construction",
      domain: "mixed",
      difficulty: 3,
      objectA: "A company's org chart",
      objectB: "The company's communication patterns",
      steps: [
        {
          question: "What kind of relationship is this?",
          options: [
            "Functor — the org chart is one category, communication patterns are another, and there's a structure-preserving map between them",
            "Morphism within a single category",
            "No categorical relationship"
          ],
          answer: "Functor — the org chart is one category, communication patterns are another, and there's a structure-preserving map between them"
        },
        {
          question: "Does the functor preserve composition?",
          options: [
            "Ideally yes — if A reports to B reports to C, then A's messages should flow through B to C",
            "No — people communicate across hierarchical levels all the time",
            "Only in small companies"
          ],
          answer: "No — people communicate across hierarchical levels all the time"
        },
        {
          question: "What does the failure of composition preservation tell us?",
          options: [
            "The mapping is not actually a functor — the org chart does not faithfully represent real communication",
            "The org chart is wrong",
            "Communication is random"
          ],
          answer: "The mapping is not actually a functor — the org chart does not faithfully represent real communication"
        }
      ],
      authorAnalysis: {
        category: "Hierarchical structure → Communication networks",
        morphism: "The naive mapping 'reports-to → messages' fails as a functor",
        direction: "AtoB",
        isIso: false,
        explanation: "This is a case where the proposed functor FAILS. The org chart category has clean composition (A reports to B, B reports to C, therefore A is under C). But real communication doesn't respect this — people Slack their CEO directly. The failure of the functor is itself informative: it tells you the org chart is an incomplete model of how the company actually operates. Category theory is useful even when the mapping breaks."
      }
    },
  ],
};

export default challenges;
