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

    // --- MORE COOKING ---
    {
      id: "cl-cook-05",
      type: "classify",
      domain: "cooking",
      difficulty: 1,
      prompt: "Sort these butter-related terms into objects (states) and morphisms (operations).",
      words: [
        { word: "Cold butter", kind: "object" },
        { word: "Melt", kind: "morphism" },
        { word: "Melted butter", kind: "object" },
        { word: "Brown", kind: "morphism" },
        { word: "Browned butter", kind: "object" },
        { word: "Cool and whip", kind: "morphism" },
        { word: "Whipped butter", kind: "object" },
      ],
      explanation: "Each form of butter (cold, melted, browned, whipped) is an object — a stable state. Melt, brown, and whip are morphisms — operations that transform one state into another."
    },
    {
      id: "cl-cook-06",
      type: "classify",
      domain: "cooking",
      difficulty: 2,
      prompt: "Sort these. Warning: 'brine' appears as both a noun and a verb.",
      words: [
        { word: "Whole chicken", kind: "object" },
        { word: "Brine solution (noun)", kind: "object" },
        { word: "Brine (verb: soak in salt water)", kind: "morphism" },
        { word: "Brined chicken", kind: "object" },
        { word: "Roast", kind: "morphism" },
        { word: "Roasted chicken", kind: "object" },
      ],
      explanation: "A brine solution is an object — a thing that exists. To brine (verb) is a morphism — an operation. This ambiguity is common: the same word can be a state or a transformation depending on grammatical role."
    },
    {
      id: "cl-cook-07",
      type: "classify",
      domain: "cooking",
      difficulty: 3,
      prompt: "Pastry terms. Use the test: can it sit on a plate? Object. Does it require active transformation? Morphism.",
      words: [
        { word: "Couverture chocolate", kind: "object" },
        { word: "Temper (stabilize crystal form)", kind: "morphism" },
        { word: "Tempered chocolate", kind: "object" },
        { word: "Ganache", kind: "object" },
        { word: "Emulsify cream into chocolate", kind: "morphism" },
        { word: "Enrobe (coat with chocolate)", kind: "morphism" },
        { word: "Chocolate truffle", kind: "object" },
      ],
      explanation: "Couverture, tempered chocolate, ganache, and the final truffle are all objects — states of matter. Tempering, emulsifying, and enrobing are morphisms — processes. Difficulty: 'temper' as a noun (a property) could seem like an object, but here it is the verb form (the operation)."
    },

    // --- MORE LOGIC ---
    {
      id: "cl-logic-04",
      type: "classify",
      domain: "logic",
      difficulty: 1,
      prompt: "Sort these from a category of propositions and inference rules.",
      words: [
        { word: "Snow is white", kind: "object" },
        { word: "Grass is green", kind: "object" },
        { word: "Conjunction introduction", kind: "morphism" },
        { word: "Snow is white and grass is green", kind: "object" },
        { word: "Simplification (drop a conjunct)", kind: "morphism" },
        { word: "Modus ponens", kind: "morphism" },
      ],
      explanation: "Propositions (statements that can be true or false) are objects. Inference rules — conjunction introduction, simplification, modus ponens — are morphisms that derive one proposition from others."
    },
    {
      id: "cl-logic-05",
      type: "classify",
      domain: "logic",
      difficulty: 2,
      prompt: "Sort these from a category of mathematical statements and proof techniques.",
      words: [
        { word: "n is even", kind: "object" },
        { word: "n = 2k for some integer k", kind: "object" },
        { word: "Substitute definition of even", kind: "morphism" },
        { word: "n² = 4k²", kind: "object" },
        { word: "Algebraic expansion", kind: "morphism" },
        { word: "n² is even", kind: "object" },
        { word: "Proof by induction", kind: "morphism" },
      ],
      explanation: "Mathematical statements ('n is even', 'n=2k') are objects. Substitution, algebraic expansion, and induction are morphisms — they transform one statement into another by a valid reasoning step."
    },

    // --- MORE FAMILY / BIOLOGY ---
    {
      id: "cl-fam-04",
      type: "classify",
      domain: "family",
      difficulty: 1,
      prompt: "Sort these from the lifecycle of a butterfly.",
      words: [
        { word: "Egg", kind: "object" },
        { word: "Hatching", kind: "morphism" },
        { word: "Larva (caterpillar)", kind: "object" },
        { word: "Pupation", kind: "morphism" },
        { word: "Pupa (chrysalis)", kind: "object" },
        { word: "Eclosion (emergence)", kind: "morphism" },
        { word: "Adult butterfly", kind: "object" },
      ],
      explanation: "Each life stage (egg, larva, pupa, adult) is an object — a biological state. Each transition event (hatching, pupation, eclosion) is a morphism — the process that advances from one stage to the next."
    },
    {
      id: "cl-fam-05",
      type: "classify",
      domain: "family",
      difficulty: 2,
      prompt: "Sort these from a category of evolutionary processes.",
      words: [
        { word: "Common ancestor species", kind: "object" },
        { word: "Natural selection", kind: "morphism" },
        { word: "Isolated population", kind: "object" },
        { word: "Genetic mutation", kind: "morphism" },
        { word: "Derived species", kind: "object" },
        { word: "Speciation", kind: "morphism" },
      ],
      explanation: "Species and populations are objects — the entities the category is about. Natural selection, mutation, and speciation are morphisms — processes that transform one evolutionary state into another."
    },
    {
      id: "cl-fam-06",
      type: "classify",
      domain: "family",
      difficulty: 2,
      prompt: "In a category of family relationships, sort these. Some are tricky.",
      words: [
        { word: "Alice", kind: "object" },
        { word: "Bob", kind: "object" },
        { word: "Is the parent of", kind: "morphism" },
        { word: "The Smith family", kind: "object" },
        { word: "Shares DNA with", kind: "morphism" },
        { word: "Biological descent", kind: "morphism" },
        { word: "Kinship (the directed relation)", kind: "morphism" },
      ],
      explanation: "People and groups are objects. 'Is the parent of,' 'shares DNA with,' 'biological descent,' and 'kinship' are all morphisms — directed relationships connecting objects. Tricky: 'kinship' sounds like a thing, but here it refers to the relational structure (a morphism class), not a family member (an object)."
    },

    // --- POLITICAL ECONOMY ---
    {
      id: "cl-pe-01",
      type: "classify",
      domain: "political_economy",
      difficulty: 1,
      prompt: "Sort these into objects (institutional states) and morphisms (political operations).",
      words: [
        { word: "Senate", kind: "object" },
        { word: "Legislate", kind: "morphism" },
        { word: "Policy", kind: "object" },
        { word: "Veto", kind: "morphism" },
        { word: "Budget", kind: "object" },
        { word: "Appropriate", kind: "morphism" },
      ],
      explanation: "The Senate, a policy document, and a budget are all objects — states of the political system at a moment in time. Legislating, vetoing, and appropriating are morphisms — operations that transform those states into new ones. 'Tax' is a useful boundary case: the tax law is an object; the act of taxing is a morphism."
    },
    {
      id: "cl-pe-02",
      type: "classify",
      domain: "political_economy",
      difficulty: 1,
      prompt: "Sort these into objects (political states) and morphisms (political processes).",
      words: [
        { word: "Electorate", kind: "object" },
        { word: "Election", kind: "morphism" },
        { word: "Mandate", kind: "object" },
        { word: "Govern", kind: "morphism" },
        { word: "Constitution", kind: "object" },
        { word: "Ratify", kind: "morphism" },
      ],
      explanation: "The electorate, a mandate, and the constitution are objects — stable states in the political system. Elections, governing, and ratification are morphisms — directed processes that convert one institutional state into another."
    },
    {
      id: "cl-pe-03",
      type: "classify",
      domain: "political_economy",
      difficulty: 2,
      prompt: "Sort these elements from Hayek's process cycle into objects and morphisms. Watch the boundary cases.",
      words: [
        { word: "Entrepreneurial plan", kind: "object" },
        { word: "Judge and select among plans", kind: "morphism" },
        { word: "Market price", kind: "object" },
        { word: "Adapt production to price signal", kind: "morphism" },
        { word: "Expected future price", kind: "object" },
        { word: "Update expectation from feedback", kind: "morphism" },
      ],
      explanation: "Plans, prices, and expectations are objects — states that actors hold or observe at a moment in time. Judging plans, adapting production, and updating expectations are morphisms — the actual processes that drive the Hayekian cycle. Boundary: 'Feedback' can be an object (the signal value itself) or a morphism (the act of feeding information back) — context determines which."
    },

    // --- CRYPTOECONOMICS ---
    {
      id: "cl-ce-01",
      type: "classify",
      domain: "cryptoeconomics",
      difficulty: 1,
      prompt: "Sort these blockchain terms into objects (states) and morphisms (operations).",
      words: [
        { word: "Wallet address", kind: "object" },
        { word: "Sign", kind: "morphism" },
        { word: "Block", kind: "object" },
        { word: "Broadcast", kind: "morphism" },
        { word: "Transaction", kind: "object" },
        { word: "Validate", kind: "morphism" },
      ],
      explanation: "A wallet address, a block, and a transaction are objects — things that exist in the blockchain state at a given moment. Signing, broadcasting, and validating are morphisms — operations that transform those states. Boundary case: 'Signature' is an object (the resulting value) while 'sign' is the morphism (the act of signing)."
    },
    {
      id: "cl-ce-02",
      type: "classify",
      domain: "cryptoeconomics",
      difficulty: 2,
      prompt: "Sort these smart contract terms. Some are tricky boundary cases.",
      words: [
        { word: "Deployed bytecode", kind: "object" },
        { word: "Execution", kind: "morphism" },
        { word: "Storage slot", kind: "object" },
        { word: "State update", kind: "morphism" },
        { word: "Gas fee", kind: "object" },
        { word: "Consume gas", kind: "morphism" },
      ],
      explanation: "Deployed bytecode, storage slots, and gas fees are objects — states of the chain. Execution, state update, and consuming gas are morphisms — operations that advance the computation. The tricky one: 'contract call' can be an object (the call data) or a morphism (the act of calling) — here 'execution' captures the morphism."
    },

    // --- SYSTEMS SCIENCE ---
    {
      id: "cl-ss-01",
      type: "classify",
      domain: "systems_science",
      difficulty: 1,
      prompt: "Sort these systems science terms into objects (system states) and morphisms (system operations).",
      words: [
        { word: "Cell", kind: "object" },
        { word: "Regulate", kind: "morphism" },
        { word: "Ecosystem", kind: "object" },
        { word: "Constrain", kind: "morphism" },
        { word: "Steady state", kind: "object" },
        { word: "Adapt", kind: "morphism" },
      ],
      explanation: "A cell, an ecosystem, and a steady state are objects — stable configurations of a system. Regulating, constraining, and adapting are morphisms — directed processes that transform one system state into another. Boundary: 'Feedback' is an object (the signal value) when measured, but a morphism (the act of feeding back) when describing the loop."
    },
    {
      id: "cl-ss-02",
      type: "classify",
      domain: "systems_science",
      difficulty: 2,
      prompt: "Sort these elements from Bunge's 8-tuple system model into objects and morphisms.",
      words: [
        { word: "Component", kind: "object" },
        { word: "Relation / connection", kind: "morphism" },
        { word: "Boundary", kind: "object" },
        { word: "Transformation function", kind: "morphism" },
        { word: "History", kind: "object" },
      ],
      explanation: "In Bunge's formal system model, components, boundaries, and history are objects — things the system has. Relations/connections and transformation functions are morphisms — the ways components interact and the system evolves. This is a precise ontological boundary: nouns vs. verbs, states vs. processes."
    },

    // --- NEUROMORPHICS ---
    {
      id: "cl-nm-01",
      type: "classify",
      domain: "neuromorphics",
      difficulty: 1,
      prompt: "Sort these neuroscience terms into objects (neural states) and morphisms (neural operations).",
      words: [
        { word: "Neuron", kind: "object" },
        { word: "Fire", kind: "morphism" },
        { word: "Synapse", kind: "object" },
        { word: "Potentiate", kind: "morphism" },
        { word: "Action potential", kind: "object" },
        { word: "Inhibit", kind: "morphism" },
      ],
      explanation: "A neuron, a synapse, and an action potential are objects — components or states of the neural system. Firing, potentiating, and inhibiting are morphisms — the operations that transform neural states. Boundary: 'Spike' can be an object (the discrete firing event, a datum in the spike train) or a morphism (the act of spiking) — context determines which."
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

    // --- POLITICAL ECONOMY ---
    {
      id: "va-pe-01",
      type: "validate",
      domain: "political_economy",
      difficulty: 1,
      objectA: "Constituency demand",
      objectB: "Legislative proposal",
      candidate: "Political entrepreneurship (Hayekian)",
      valid: true,
      direction: "AtoB",
      explanation: "In Hayek's legislative process model, the conversion of constituency feedback into new bill proposals is the morphism. This is not top-down command; it is emergent. Political entrepreneurs respond to dispersed signals (demands) by packaging them into actionable proposals — just as market entrepreneurs respond to price signals."
    },
    {
      id: "va-pe-02",
      type: "validate",
      domain: "political_economy",
      difficulty: 1,
      objectA: "Enacted law",
      objectB: "Constitutional requirement",
      candidate: "Derives authority from",
      valid: true,
      direction: "BtoA",
      explanation: "Laws derive their authority FROM the constitution, not the reverse. The direction matters categorically: the constitution is the source (domain) of validity; enacted law is the target. A law that violates its constitutional source is invalid — the morphism fails."
    },
    {
      id: "va-pe-03",
      type: "validate",
      domain: "political_economy",
      difficulty: 2,
      objectA: "Expansionary fiscal policy",
      objectB: "High unemployment",
      candidate: "Directly causes",
      valid: false,
      direction: null,
      explanation: "Expansionary fiscal policy is designed to REDUCE unemployment — the causal arrow runs the other way (high unemployment → expansionary policy as a response). 'Directly causes' in this direction is invalid. Even in economic categories where the relationship is contested, expansionary policy → high unemployment contradicts the standard Keynesian and most mainstream frameworks."
    },
    {
      id: "va-pe-04",
      type: "validate",
      domain: "political_economy",
      difficulty: 3,
      objectA: "System essential variables (Easton)",
      objectB: "Structural form of institutions",
      candidate: "Determines",
      valid: false,
      direction: null,
      explanation: "Easton's key insight is the OPPOSITE: essential variables (the capacity for binding decision-making) can be PRESERVED while structural form changes completely. It is structural change that preserves essential variables, not essential variables that determine structure. A democracy can radically restructure its institutions and remain a democracy — the essential variables survive the structural transformation."
    },

    // --- CRYPTOECONOMICS ---
    {
      id: "va-ce-01",
      type: "validate",
      domain: "cryptoeconomics",
      difficulty: 1,
      objectA: "Unsigned transaction",
      objectB: "Signed transaction",
      candidate: "Apply private key signature",
      valid: true,
      direction: "AtoB",
      explanation: "Signing is the morphism that transforms an unsigned transaction into a signed one. The private key authorizes the transaction — without this morphism, the network cannot verify authorization. This is a one-way morphism: a signed transaction cannot be 'unsigned.'"
    },
    {
      id: "va-ce-02",
      type: "validate",
      domain: "cryptoeconomics",
      difficulty: 2,
      objectA: "Confirmed transaction",
      objectB: "Unconfirmed transaction",
      candidate: "Block reorganization (reorg)",
      valid: true,
      direction: "AtoB",
      explanation: "A blockchain reorganization (reorg) can reverse confirmations — making a previously confirmed transaction unconfirmed again. This is rare but real. The pedagogical point: finality is probabilistic in proof-of-work systems, not absolute. Deep enough reorgs can 'undo' any number of confirmations, though the probability decreases exponentially with depth."
    },
    {
      id: "va-ce-03",
      type: "validate",
      domain: "cryptoeconomics",
      difficulty: 1,
      objectA: "Plaintext data",
      objectB: "SHA-256 hash",
      candidate: "Reverse SHA-256 to recover plaintext",
      valid: false,
      direction: null,
      explanation: "SHA-256 is a one-way cryptographic hash function by design. No valid inverse morphism exists: given a hash, you cannot recover the original input (without brute force). This is the categorical formulation of hash function security — it is a non-invertible morphism, which is exactly why it is useful for commitments and proof-of-work."
    },

    // --- SYSTEMS SCIENCE ---
    {
      id: "va-ss-01",
      type: "validate",
      domain: "systems_science",
      difficulty: 1,
      objectA: "Local cell interactions",
      objectB: "Emergent tissue property",
      candidate: "Emergence",
      valid: true,
      direction: "AtoB",
      explanation: "Emergence is the canonical morphism from micro-level interactions to macro-level patterns. Local cell interactions give rise to tissue properties that cannot be predicted from any single cell in isolation. This is the foundational move of systems science: the whole has properties that the parts do not."
    },
    {
      id: "va-ss-02",
      type: "validate",
      domain: "systems_science",
      difficulty: 1,
      objectA: "Negative feedback signal",
      objectB: "System oscillation / runaway escalation",
      candidate: "Amplification",
      valid: false,
      direction: null,
      explanation: "Negative feedback DAMPS oscillation — it corrects deviations back toward a set point. Amplification leading to runaway escalation is the signature of POSITIVE feedback. The two are categorically opposite morphisms: negative feedback → stability, positive feedback → escalation."
    },
    {
      id: "va-ss-03",
      type: "validate",
      domain: "systems_science",
      difficulty: 1,
      objectA: "Positive feedback loop",
      objectB: "Runaway escalation",
      candidate: "Amplification",
      valid: true,
      direction: "AtoB",
      explanation: "Positive feedback amplifies deviations from equilibrium, driving the system toward runaway escalation. Classic examples: bank runs (more withdrawals → more panic → more withdrawals), viral spread, nuclear fission. Each cycle amplifies the previous state — this IS the morphism from positive feedback to escalation."
    },

    // --- NEUROMORPHICS ---
    {
      id: "va-nm-01",
      type: "validate",
      domain: "neuromorphics",
      difficulty: 1,
      objectA: "Sensory input",
      objectB: "Motor output",
      candidate: "Sensorimotor neural pathway",
      valid: true,
      direction: "AtoB",
      explanation: "The sensorimotor pathway is the classic perception-action arc: sensory signals enter, are processed through multiple neural layers, and drive motor outputs. This is a valid directed morphism from sensory input to motor output — the basis of reflexes, voluntary movement, and skilled behavior."
    },
    {
      id: "va-nm-02",
      type: "validate",
      domain: "neuromorphics",
      difficulty: 2,
      objectA: "Motor output",
      objectB: "Sensory input",
      candidate: "Proprioceptive feedback",
      valid: true,
      direction: "AtoB",
      explanation: "Proprioception — the sense of body position and movement — closes the sensorimotor loop. Motor outputs (muscle contractions) generate proprioceptive signals that feed back as new sensory input, informing the next movement. Both directions exist: the sensorimotor loop is a genuine cycle, not a one-way pipeline."
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

    // --- POLITICAL ECONOMY ---
    {
      id: "co-pe-01",
      type: "compose",
      domain: "political_economy",
      difficulty: 2,
      prompt: "Easton's political loop: what is the composed morphism for the full cycle?",
      chain: [
        { from: "Constituency feedback", to: "Political input (demand)", morphism: "Input conversion" },
        { from: "Political input (demand)", to: "Enacted policy", morphism: "Legislative processing + authority allocation" },
      ],
      missing: "composed",
      answer: "Representative democracy cycle",
      options: [
        "Representative democracy cycle",
        "Authoritarian command",
        "Market equilibration",
        "Bureaucratic processing"
      ],
      explanation: "Composing input conversion with legislative processing gives you the full Easton loop in one morphism: constituent feedback becomes enacted policy through the representative democratic cycle. This composition is the categorical definition of representative government — a system where inputs systematically determine outputs."
    },
    {
      id: "co-pe-02",
      type: "compose",
      domain: "political_economy",
      difficulty: 2,
      prompt: "The U.S. legislative process: what is the composed outcome of all three steps?",
      chain: [
        { from: "Bill introduction", to: "Committee markup", morphism: "Committee referral" },
        { from: "Committee markup", to: "Floor vote", morphism: "Committee approval" },
        { from: "Floor vote", to: "Enacted law", morphism: "Passage and presidential signature" },
      ],
      missing: "composed",
      answer: "Full U.S. legislative cycle",
      options: [
        "Full U.S. legislative cycle",
        "Executive order",
        "Judicial review",
        "Regulatory rulemaking"
      ],
      explanation: "Three steps compose into one: a bill introduced in Congress becomes enacted law through committee markup, floor vote, and presidential signature. Each step is a valid morphism; their composition is the full U.S. legislative cycle. The composed morphism hides all the intermediate politics inside a single arrow."
    },
    {
      id: "co-pe-03",
      type: "compose",
      domain: "political_economy",
      difficulty: 2,
      prompt: "Hayek's market cycle: what is the name for the composed process?",
      chain: [
        { from: "Environmental change", to: "Price signal update", morphism: "Market exchange and feedback" },
        { from: "Price signal update", to: "New entrepreneurial plans", morphism: "Anticipatory adjustment" },
      ],
      missing: "composed",
      answer: "Market coordination",
      options: [
        "Market coordination",
        "Central planning",
        "Price fixing",
        "Regulatory arbitrage"
      ],
      explanation: "Composing market exchange with anticipatory adjustment gives you market coordination — how dispersed, local knowledge produces coordinated economic action without any central authority. This is Hayek's core insight: the price system is a composed morphism that aggregates information no single actor could possess."
    },

    // --- CRYPTOECONOMICS ---
    {
      id: "co-ce-01",
      type: "compose",
      domain: "cryptoeconomics",
      difficulty: 1,
      prompt: "What is the composed morphism for getting a transaction onto the network?",
      chain: [
        { from: "Wallet intent", to: "Signed transaction", morphism: "Sign with private key" },
        { from: "Signed transaction", to: "Broadcast message", morphism: "Serialize and propagate to network" },
      ],
      missing: "composed",
      answer: "Submit transaction to network",
      options: [
        "Submit transaction to network",
        "Mine a block",
        "Execute a smart contract",
        "Verify a signature"
      ],
      explanation: "Signing and broadcasting compose into 'submit transaction to network' — the full user-facing operation that gets a payment or contract call onto the blockchain. Each step is a valid morphism; their composition hides the cryptographic and networking details inside a single action."
    },
    {
      id: "co-ce-02",
      type: "compose",
      domain: "cryptoeconomics",
      difficulty: 3,
      prompt: "What is the composed name for the full process of running code on Ethereum?",
      chain: [
        { from: "Smart contract call", to: "EVM execution", morphism: "Transaction dispatch" },
        { from: "EVM execution", to: "State transition", morphism: "Bytecode execution" },
        { from: "State transition", to: "Block inclusion", morphism: "Gas payment + validator inclusion" },
      ],
      missing: "composed",
      answer: "On-chain computation",
      options: [
        "On-chain computation",
        "Off-chain processing",
        "Layer-2 rollup",
        "Oracle query"
      ],
      explanation: "Dispatch, execution, and inclusion compose into 'on-chain computation' — what it means for Ethereum to 'run code.' The composed morphism encapsulates the entire EVM lifecycle: a call arrives, bytecode executes, state changes, and the result is finalized in a block. Without all three steps, you don't have computation — you have incomplete morphisms."
    },

    // --- SYSTEMS SCIENCE ---
    {
      id: "co-ss-01",
      type: "compose",
      domain: "systems_science",
      difficulty: 2,
      prompt: "What is the composed name for Bunge's hierarchy from cells to organisms?",
      chain: [
        { from: "Cellular processes", to: "Tissue function", morphism: "Cell coordination" },
        { from: "Tissue function", to: "Organ behavior", morphism: "Tissue integration" },
        { from: "Organ behavior", to: "Organism function", morphism: "Organ system coordination" },
      ],
      missing: "composed",
      answer: "Biological organization",
      options: [
        "Biological organization",
        "Chemical synthesis",
        "Genetic transcription",
        "Cellular division"
      ],
      explanation: "Three levels compose into biological organization — how micro-level cellular processes give rise to whole-organism function through hierarchical composition. Each level is a valid morphism; their composition is the foundational principle of biology: life is organized hierarchically, and each level is irreducible to the one below."
    },
    {
      id: "co-ss-02",
      type: "compose",
      domain: "systems_science",
      difficulty: 2,
      prompt: "What is the composed name for the full feedback control loop?",
      chain: [
        { from: "System state", to: "Sensor reading", morphism: "Measurement" },
        { from: "Sensor reading", to: "Control signal", morphism: "Error calculation vs. goal state" },
        { from: "Control signal", to: "Actuator response", morphism: "Control law application" },
      ],
      missing: "composed",
      answer: "Closed-loop feedback control",
      options: [
        "Closed-loop feedback control",
        "Open-loop control",
        "Feedforward regulation",
        "Kalman filtering"
      ],
      explanation: "Measurement, error calculation, and control law compose into closed-loop feedback control — the basis of all regulatory systems from thermostats to immune responses. Crucially, the loop closes: actuator response feeds back to change system state, completing the cycle. An open-loop system would lack this final connection."
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

    // --- POLITICAL ECONOMY ---
    {
      id: "iso-pe-01",
      type: "isomorphism",
      domain: "political_economy",
      difficulty: 1,
      objectA: "Vote of no confidence",
      objectB: "Government dissolution",
      morphismAtoB: "Constitutional trigger",
      isIso: true,
      reverseMorphism: "New government formation restores parliamentary confidence",
      explanation: "In parliamentary systems, a vote of no confidence constitutionally triggers government dissolution, and a new government formation restores parliamentary confidence. Each implies the other within that constitutional framework — a perfect isomorphism between two institutional states."
    },
    {
      id: "iso-pe-02",
      type: "isomorphism",
      domain: "political_economy",
      difficulty: 3,
      objectA: "Market price feedback cycle",
      objectB: "Legislative demand/support cycle",
      morphismAtoB: "Abstract to Hayekian process structure",
      isIso: true,
      reverseMorphism: "Instantiate Hayekian process structure as market feedback",
      explanation: "Hayek's vault finding: both cycles compress complex environmental information into signals that guide actor decisions, form anticipatory feedback loops, and are 'functionally closed but materially open.' The isomorphism is between PROCESS STRUCTURES, not content. Markets use prices; legislatures use political support signals — but the categorical architecture is identical."
    },
    {
      id: "iso-pe-03",
      type: "isomorphism",
      domain: "political_economy",
      difficulty: 2,
      objectA: "Policy under regime A",
      objectB: "Policy under regime B",
      morphismAtoB: "Regime change",
      isIso: false,
      explanation: "Regime change is not an isomorphism between policy categories. Different regimes produce structurally non-equivalent institutional arrangements — the transformation destroys information about the previous regime's particular structure. You cannot recover regime A's policy logic from regime B's, because the category of admissible policies has changed."
    },

    // --- CRYPTOECONOMICS ---
    {
      id: "iso-ce-01",
      type: "isomorphism",
      domain: "cryptoeconomics",
      difficulty: 1,
      objectA: "Plaintext",
      objectB: "Ciphertext (AES-256)",
      morphismAtoB: "Encrypt with key K",
      isIso: true,
      reverseMorphism: "Decrypt with key K",
      explanation: "Symmetric encryption is a category-theoretic isomorphism: encrypt with key K, then decrypt with key K, and you recover the exact original plaintext. No information is destroyed. Contrast with hash functions — encrypt/decrypt is perfectly invertible (given the key), while SHA-256 is strictly one-way."
    },
    {
      id: "iso-ce-02",
      type: "isomorphism",
      domain: "cryptoeconomics",
      difficulty: 2,
      objectA: "UTXO (unspent)",
      objectB: "UTXO (spent)",
      morphismAtoB: "Spending transaction",
      isIso: false,
      explanation: "Once spent, a UTXO cannot be 'unspent' — the spending arrow is strictly one-way. This is the categorical formulation of why double-spends are impossible: the morphism from unspent to spent has no inverse in the blockchain category. The irreversibility is the security guarantee."
    },

    // --- SYSTEMS SCIENCE ---
    {
      id: "iso-ss-01",
      type: "isomorphism",
      domain: "systems_science",
      difficulty: 2,
      objectA: "Predator-prey population dynamics (Lotka-Volterra)",
      objectB: "Economic boom-bust cycle",
      morphismAtoB: "Abstract as oscillating dynamical system",
      isIso: true,
      reverseMorphism: "Instantiate oscillating dynamical system as predator-prey dynamics",
      explanation: "Both systems share the same differential equation structure: a coupled oscillation where one variable's growth feeds the other's decline and vice versa. Bertalanffy's General System Theory (GST) proposes exactly this: isomorphic patterns appear across radically different domains. The functor maps predator populations to boom phases and prey populations to bust phases (or vice versa)."
    },
    {
      id: "iso-ss-02",
      type: "isomorphism",
      domain: "systems_science",
      difficulty: 2,
      objectA: "Electrical RC circuit",
      objectB: "Mechanical spring-damper system",
      morphismAtoB: "Analogical mapping (Voltage↔Force, Current↔Velocity, R↔Damping, C↔Spring)",
      isIso: true,
      reverseMorphism: "Instantiate spring-damper system as electrical RC circuit",
      explanation: "These two systems ARE the same system, described in different physical vocabularies. The analogy is a category-theoretic isomorphism: voltage↔force, current↔velocity, resistance↔damping, capacitance↔spring constant. Every equation in one domain has a corresponding equation in the other. Engineers have always known this; category theory formalizes it."
    },

    // --- NEUROMORPHICS ---
    {
      id: "iso-nm-01",
      type: "isomorphism",
      domain: "neuromorphics",
      difficulty: 2,
      objectA: "Biological neuron (processing pattern X)",
      objectB: "Silicon artificial neuron (implementing same function)",
      morphismAtoB: "Abstract to substrate-independent computational function",
      isIso: true,
      reverseMorphism: "Instantiate function in biological substrate",
      explanation: "The FUNCTION is preserved across substrates; energy cost, spike timing, and metabolic details are lost. This is why neuromorphic computing works: the mathematics of the computation is substrate-independent, and a functor from biological to artificial implementation preserves what matters (input-output behavior). Note: not a perfect isomorphism — biological neurons have richer dynamics than formal models capture."
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
    {
      id: "cs-06",
      type: "category_switch",
      domain: "cooking",
      difficulty: 1,
      objectA: "Raw dough",
      objectB: "Baked bread",
      prompt: "The same transformation viewed through three different categorical lenses.",
      categories: [
        {
          name: "Category of cooking operations",
          morphism: "Bake at 400°F for 30 minutes",
          explanation: "The morphism is a concrete kitchen action with time and temperature parameters."
        },
        {
          name: "Category of gluten and starch chemistry",
          morphism: "Gelatinize starch, set gluten network, evaporate water",
          explanation: "The morphism describes the molecular changes: starch granules absorb water and swell, gluten proteins cross-link, moisture escapes as steam."
        },
        {
          name: "Category of aroma chemistry",
          morphism: "Maillard reaction and caramelization produce hundreds of volatile compounds",
          explanation: "The morphism is the set of browning reactions that generate bread's characteristic smell and crust color."
        }
      ],
      synthesisQuestion: "Is this transformation reversible in any of these categories?",
      synthesisAnswer: "No. In all three categories the morphism is one-way: protein cross-links cannot be broken, Maillard products cannot be reversed, and a baked loaf cannot return to dough. The three categories agree that this is not an isomorphism."
    },
    {
      id: "cs-07",
      type: "category_switch",
      domain: "logic",
      difficulty: 1,
      objectA: "True",
      objectB: "False",
      prompt: "The same two truth values in three different formalisms.",
      categories: [
        {
          name: "Category of classical logic",
          morphism: "Negation (NOT)",
          explanation: "In classical logic, the morphism is the NOT operator: True ↦ False."
        },
        {
          name: "Category of Boolean algebra",
          morphism: "Complement",
          explanation: "In Boolean algebra, every element has a complement: 1's complement is 0."
        },
        {
          name: "Category of digital circuits",
          morphism: "Inverter gate (NOT gate)",
          explanation: "In circuit logic, the morphism is a physical gate that flips a high voltage to low."
        }
      ],
      synthesisQuestion: "Is this morphism an isomorphism in all three categories?",
      synthesisAnswer: "Yes. Negation applied twice returns to the original: NOT(NOT(True)) = True. The inverse morphism is negation itself. All three formalisms agree — this is an isomorphism, and in fact it is its own inverse."
    },
    {
      id: "cs-08",
      type: "category_switch",
      domain: "family",
      difficulty: 2,
      objectA: "Parent",
      objectB: "Child",
      prompt: "The same relationship viewed in three different categories.",
      categories: [
        {
          name: "Category of kinship relations",
          morphism: "Is the parent of",
          explanation: "The morphism is the directed familial relation. A reverse morphism ('is the child of') also exists, but it is a different morphism, not an inverse."
        },
        {
          name: "Category of genetic inheritance",
          morphism: "Passes half their genome to (via meiosis and fertilization)",
          explanation: "The morphism is the biological transmission of genetic material. Information flows from parent to child, not the other way around."
        },
        {
          name: "Category of legal rights",
          morphism: "Is the legal guardian of (during minority)",
          explanation: "The morphism is a legal relationship that carries duties and rights. It dissolves when the child reaches adulthood."
        }
      ],
      synthesisQuestion: "Is the parent-child morphism an isomorphism in any of these categories?",
      synthesisAnswer: "No. In kinship, a reverse arrow exists ('child of') but it is not an inverse — it is a separate morphism in a different direction. In genetics, half-genome transmission cannot be undone. In law, the guardianship morphism is temporary and asymmetric. None are isomorphisms."
    },
    {
      id: "cs-09",
      type: "category_switch",
      domain: "cooking",
      difficulty: 2,
      objectA: "Milk",
      objectB: "Yogurt",
      prompt: "The same fermentation event described in three different categories.",
      categories: [
        {
          name: "Category of fermentation processes",
          morphism: "Incubate with Lactobacillus cultures at 40°C for 8 hours",
          explanation: "The morphism is the process specification: which bacteria, which temperature, how long."
        },
        {
          name: "Category of pH transformations",
          morphism: "Lower pH from ~6.8 to ~4.5 (increase acidity)",
          explanation: "The morphism is quantified as a change in hydrogen ion concentration. Lactic acid production acidifies the milk."
        },
        {
          name: "Category of protein structure",
          morphism: "Acid-denature casein proteins to form a gel network",
          explanation: "The morphism is a structural change: dissolved casein micelles coagulate into a semi-solid matrix when the pH drops below their isoelectric point."
        }
      ],
      synthesisQuestion: "Do these three morphisms describe the same process?",
      synthesisAnswer: "Yes — they are three different categorical lenses on the same event. The fermentation morphism describes procedure, the pH morphism describes measurement, and the protein morphism describes mechanism. All three compose with the same other morphisms (you can chain yogurt → strained yogurt → Greek yogurt consistently across all three categories)."
    },
    {
      id: "cs-10",
      type: "category_switch",
      domain: "logic",
      difficulty: 2,
      objectA: "Hypothesis",
      objectB: "Prediction",
      prompt: "The same two objects connected differently in three categories of scientific reasoning.",
      categories: [
        {
          name: "Category of deductive inference",
          morphism: "Deduce observable consequence (if hypothesis is true, prediction must hold)",
          explanation: "Given a hypothesis and auxiliary conditions, deduce what must be observable. This is a valid deductive step."
        },
        {
          name: "Category of probability theory",
          morphism: "Compute P(prediction | hypothesis) — likelihood of the prediction given the hypothesis",
          explanation: "The morphism is a conditional probability: how likely is the prediction if the hypothesis holds? This is a quantitative version of the deductive arrow."
        },
        {
          name: "Category of experimental design",
          morphism: "Design experiment whose outcome distinguishes hypothesis from alternatives",
          explanation: "The morphism is an experimental protocol — a concrete procedure that operationalizes the prediction into a measurable test."
        }
      ],
      synthesisQuestion: "Is this an isomorphism in any category?",
      synthesisAnswer: "No. Many different hypotheses entail the same prediction (prediction underdetermines hypothesis). The reverse morphism — from prediction back to hypothesis — is not uniquely defined. This asymmetry is the core of the 'problem of induction': you cannot prove a hypothesis by confirming its predictions."
    },
    {
      id: "cs-11",
      type: "category_switch",
      domain: "family",
      difficulty: 2,
      objectA: "Larva",
      objectB: "Adult insect",
      prompt: "The same metamorphosis in three different categories.",
      categories: [
        {
          name: "Category of biological development",
          morphism: "Complete metamorphosis (holometabolism) — body dissolves and rebuilds in chrysalis",
          explanation: "The biological morphism is drastic: the larval body is largely dissolved into a cellular soup, and the adult body plan is rebuilt from imaginal discs."
        },
        {
          name: "Category of genetic expression",
          morphism: "Re-express the same genome in a radically different phenotype",
          explanation: "The DNA is identical across both stages. The morphism is a change in gene expression — different genes are activated at different developmental stages."
        },
        {
          name: "Category of ecological role",
          morphism: "Shift from herbivorous terrestrial organism to flying reproductive organism",
          explanation: "The morphism is a change in ecological function: the caterpillar eats and grows, the butterfly reproduces and disperses."
        }
      ],
      synthesisQuestion: "Which category makes this most like an isomorphism?",
      synthesisAnswer: "The genetic expression category. The genome is fully preserved — the same information, expressed differently. In this sense the morphism is close to an isomorphism: larva and adult are like two 'views' of the same underlying data. In biology and ecology, however, the transformation is highly one-way."
    },
    {
      id: "cs-12",
      type: "category_switch",
      domain: "cooking",
      difficulty: 1,
      objectA: "Grape juice",
      objectB: "Wine",
      prompt: "The same fermentation in three different categories.",
      categories: [
        {
          name: "Category of fermentation chemistry",
          morphism: "Yeast consume sugars and produce ethanol and CO₂ over days to weeks",
          explanation: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. The morphism is a biochemical reaction with precise reactants and products."
        },
        {
          name: "Category of flavor development",
          morphism: "Develop esters, tannins, and complexity; consume sweetness",
          explanation: "The morphism is perceived as a transformation of taste: sweet → dry, simple → complex."
        },
        {
          name: "Category of commerce and regulation",
          morphism: "Process, clarify, barrel-age, bottle, label, and distribute as regulated product",
          explanation: "The morphism is an industrial and legal process. 'Wine' is a legally defined category that grape juice cannot enter without specific production steps."
        }
      ],
      synthesisQuestion: "Is fermentation reversible in any of these categories?",
      synthesisAnswer: "No. Ethanol cannot be enzymatically re-converted to glucose by yeast. The flavor morphism is irreversible (you cannot un-ferment a wine). The commercial morphism is also one-way — a product released to market cannot be recalled to the raw stage. All three categories agree: no isomorphism."
    },
    {
      id: "cs-13",
      type: "category_switch",
      domain: "logic",
      difficulty: 3,
      objectA: "Set of observations",
      objectB: "Scientific theory",
      prompt: "Three different categories disagree about whether a morphism even exists here.",
      categories: [
        {
          name: "Category of abductive inference",
          morphism: "Infer best explanation — select theory that most elegantly accounts for all observations",
          explanation: "Abduction is the 'inference to best explanation.' It is not deductively valid, but it is the method scientists actually use."
        },
        {
          name: "Category of deductive logic",
          morphism: "No valid morphism — observations do not deductively entail any theory",
          explanation: "This is Hume's problem of induction. No finite set of observations logically forces a particular theory. The morphism from observations to theory does not exist in deductive logic."
        },
        {
          name: "Category of Bayesian inference",
          morphism: "Update prior probability on theory given observations via Bayes' rule",
          explanation: "P(theory | observations) = P(observations | theory) · P(theory) / P(observations). The morphism is a probability update, not a definitive proof."
        }
      ],
      synthesisQuestion: "Why is the deductive morphism missing?",
      synthesisAnswer: "Because observations underdetermine theory. Infinitely many different theories are compatible with any finite set of observations. Deductive logic can only derive specific predictions from a theory (the reverse direction); it cannot derive a unique theory from predictions. This is why science uses abduction or probability, not pure deduction."
    },
    {
      id: "cs-14",
      type: "category_switch",
      domain: "family",
      difficulty: 1,
      objectA: "Sibling A",
      objectB: "Sibling B",
      prompt: "The same relationship viewed in three categories.",
      categories: [
        {
          name: "Category of kinship relations",
          morphism: "Is the sibling of (symmetric — the reverse holds equally)",
          explanation: "Siblinghood is a symmetric relation: if A is a sibling of B, then B is a sibling of A. This symmetry makes it look like an isomorphism."
        },
        {
          name: "Category of genetic inheritance",
          morphism: "Shares ~50% identical-by-descent DNA segments",
          explanation: "Full siblings share, on average, 50% of their DNA. This is also symmetric and quantitative."
        },
        {
          name: "Category of social dynamics",
          morphism: "Competes for parental resources and cooperates in coalition (asymmetric in practice)",
          explanation: "In practice, social sibling relationships can be highly asymmetric: one sibling may dominate, older siblings have more authority, etc."
        }
      ],
      synthesisQuestion: "In which category is the sibling morphism closest to an isomorphism?",
      synthesisAnswer: "In kinship and genetics: both are symmetric, so A→B and B→A exist and compose to the identity. In social dynamics, the relationship can be asymmetric, so no clean isomorphism holds. This shows that the same objects can be isomorphic in one category but not in another."
    },
    {
      id: "cs-15",
      type: "category_switch",
      domain: "mixed",
      difficulty: 2,
      objectA: "Sound wave",
      objectB: "Digital audio file",
      prompt: "Three ways to understand the morphism from sound to digital audio.",
      categories: [
        {
          name: "Category of signal processing",
          morphism: "Sample at 44.1 kHz and quantize to 16-bit integers",
          explanation: "The morphism is defined by two parameters: the sampling rate (how often per second we measure) and the bit depth (how precisely we record each measurement)."
        },
        {
          name: "Category of physics",
          morphism: "Transduce continuous air pressure variations into a discrete numerical sequence",
          explanation: "The morphism is a physical transduction: a microphone converts mechanical vibration to electrical voltage, which an ADC then converts to numbers."
        },
        {
          name: "Category of information theory",
          morphism: "Approximate a continuous signal with a finite-bandwidth representation at bounded precision",
          explanation: "By the Nyquist theorem, sampling at 44.1 kHz captures all frequencies below 22.05 kHz — above human hearing. Information above that threshold is lost."
        }
      ],
      synthesisQuestion: "Is digitization an isomorphism?",
      synthesisAnswer: "Approximately, for human listeners — at 44.1 kHz / 16-bit, the reconstruction is perceptually lossless (humans cannot hear the difference). But mathematically, quantization always loses some information: the continuous original cannot be recovered exactly from a discrete sample. It is an approximate isomorphism — good enough for practice, not perfect in theory."
    },

    // --- POLITICAL ECONOMY (mixed domain for cross-domain insight) ---
    {
      id: "cs-pe-01",
      type: "category_switch",
      domain: "mixed",
      difficulty: 3,
      prompt: "Same objects, three different categories. How does the morphism change?",
      objectA: "Environmental disturbance",
      objectB: "System adaptation",
      categories: [
        {
          name: "Category of political systems (Easton)",
          morphism: "Disturbance → stress → structural reorganization preserving essential variables",
          explanation: "In Easton's framework, environmental disturbances create system stress. The political system adapts structurally while preserving its capacity for binding decision-making. The morphism is stress-mediated structural adaptation."
        },
        {
          name: "Category of market systems (Hayek)",
          morphism: "Price shock → entrepreneurial re-planning → new production structure preserving coordination",
          explanation: "In Hayek's framework, a price shock (environmental disturbance) drives entrepreneurial re-planning. Firms adapt their production structures while preserving market coordination as the essential function. The morphism is price-mediated re-planning."
        },
        {
          name: "Category of immune systems (biology)",
          morphism: "Pathogen → immune response → new antibody profile preserving organism viability",
          explanation: "A pathogen (disturbance) triggers immune response (adaptation) that produces new antibodies while preserving the organism's viability. The morphism is immune-mediated reorganization."
        }
      ],
      synthesisQuestion: "What do these three morphisms have in common categorically?",
      synthesisAnswer: "All three preserve an 'essential variable' (binding decisions / market coordination / viability) while allowing surface structure to change completely. Easton and Hayek discovered the same categorical structure from different starting points — a functor that preserves essential variables under disturbance appears in politics, markets, AND biology."
    },
    {
      id: "cs-pe-02",
      type: "category_switch",
      domain: "mixed",
      difficulty: 2,
      prompt: "Same objects, three different categories. What changes?",
      objectA: "Labor",
      objectB: "Capital",
      categories: [
        {
          name: "Category of neoclassical economics",
          morphism: "No direct morphism (both map to Output as factor inputs)",
          explanation: "In neoclassical theory, labor and capital are both inputs to a production function. They don't have a direct morphism to each other — they both have morphisms TO output. The category has a different structure."
        },
        {
          name: "Category of Marxist political economy",
          morphism: "Labor → Capital via 'surplus value extraction'",
          explanation: "Marx argues that unpaid labor time is extracted and converted into capital accumulation. There IS a direct morphism from labor to capital — labor produces the surplus that becomes capital."
        },
        {
          name: "Category of institutional economics",
          morphism: "Capital → Labor via 'employment, wages, working conditions'",
          explanation: "Institutional economists emphasize how capital owners shape labor through employment contracts. The dominant morphism runs from capital to labor — capital structures the terms under which labor operates."
        }
      ],
      synthesisQuestion: "What does this example illustrate about the relationship between categories and morphisms?",
      synthesisAnswer: "Morphism direction — and even whether a morphism EXISTS — depends entirely on the category chosen. The same two objects (labor, capital) have no direct morphism in one theory, a labor→capital morphism in another, and a capital→labor morphism in a third. The category is not neutral — it encodes a theory of the world."
    },

    // --- CRYPTOECONOMICS (mixed domain) ---
    {
      id: "cs-ce-01",
      type: "category_switch",
      domain: "mixed",
      difficulty: 2,
      prompt: "Same relationship, three different categories. What changes?",
      objectA: "Ethereum validator",
      objectB: "Network consensus",
      categories: [
        {
          name: "Category of cryptographic operations",
          morphism: "Validator → Consensus via 'produce valid block + attestation'",
          explanation: "Cryptographically, a validator contributes to consensus by producing a valid block and attestation that passes the protocol's verification rules. The morphism is purely technical."
        },
        {
          name: "Category of token economics",
          morphism: "Validator → Consensus via 'stake 32 ETH, earn rewards for honest participation'",
          explanation: "Economically, validators are incentivized to contribute to consensus by the staking reward structure. The morphism is mediated by the incentive mechanism — economic self-interest aligns with network security."
        },
        {
          name: "Category of game theory",
          morphism: "Validator → Consensus via 'defection punished (slashing), honest play is dominant strategy'",
          explanation: "Game-theoretically, honest validation is a Nash equilibrium because defection (slashing) is more costly than honest rewards. The morphism exists because rational agents choose it."
        }
      ],
      synthesisQuestion: "Why does Ethereum's design combine all three categories?",
      synthesisAnswer: "A robust consensus mechanism must hold in all three categories simultaneously — cryptographically valid, economically incentivized, and game-theoretically stable. A design that holds in only one category is fragile. Proof-of-Stake's strength is that the three morphisms reinforce each other: the crypto, economic, and game-theoretic reasons all point the same direction."
    },

    // --- SYSTEMS SCIENCE (mixed domain) ---
    {
      id: "cs-ss-01",
      type: "category_switch",
      domain: "mixed",
      difficulty: 2,
      prompt: "Same objects, three different frameworks. What changes?",
      objectA: "Population growth",
      objectB: "Resource depletion",
      categories: [
        {
          name: "Category of ecology",
          morphism: "Population → Resource via 'consumption at rate r'",
          explanation: "In simple ecological models, population growth drives resource depletion — a one-way causal arrow. Population increases; resources decrease."
        },
        {
          name: "Category of economics",
          morphism: "Population → Resource via 'demand drives down supply (price signal)'",
          explanation: "In economic models, population growth increases demand, which depletes supply and raises prices. Still a one-way causal arrow — population drives resource economics."
        },
        {
          name: "Category of systems science (Lotka-Volterra)",
          morphism: "Population ↔ Resource via 'coupled feedback (oscillation)'",
          explanation: "Systems science reveals the bidirectional loop: population grows when resources are abundant, which depletes resources, which reduces population, which allows resource recovery — a cycle. The full structure requires BOTH arrows."
        }
      ],
      synthesisQuestion: "What does adding the second arrow (Resource → Population) reveal?",
      synthesisAnswer: "It reveals that ecology and economics are modeling only HALF the system — the causal arrow FROM population. Systems science closes the loop: resource depletion feeds back to constrain population. The resulting Lotka-Volterra cycle is richer than either one-way model. Categorical completeness requires both arrows."
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

    // --- POLITICAL ECONOMY ---
    {
      id: "se-pe-01",
      type: "spot_error",
      domain: "political_economy",
      difficulty: 2,
      prompt: "Easton's political system loop — one arrow violates the model. Which one?",
      diagram: {
        objects: ["Constituency demands", "Political system", "Authoritative allocation", "Environmental feedback"],
        morphisms: [
          { from: 0, to: 1, label: "Input conversion", valid: true },
          { from: 1, to: 2, label: "Authority processing + decision", valid: true },
          { from: 2, to: 3, label: "Output consequences", valid: true },
          { from: 3, to: 0, label: "Feedback informs new demands", valid: true },
          { from: 2, to: 0, label: "Outputs directly reprogram citizen demands", valid: false },
        ]
      },
      errorIndex: 4,
      errorType: "invalid_connection",
      explanation: "Outputs feed BACK through the environment — they don't directly reprogram demands. The feedback loop is mediated: citizens interpret outputs and respond, they don't simply obey them. A system where outputs directly set inputs would be totalitarian control, not a feedback loop. Easton's model specifically preserves this mediation."
    },

    // --- CRYPTOECONOMICS ---
    {
      id: "se-ce-01",
      type: "spot_error",
      domain: "cryptoeconomics",
      difficulty: 1,
      prompt: "A double-spend attempt — one arrow is categorically impossible. Which one?",
      diagram: {
        objects: ["UTXO balance", "Alice's wallet", "Bob's wallet"],
        morphisms: [
          { from: 0, to: 1, label: "Spend to Alice", valid: true },
          { from: 0, to: 2, label: "Spend same UTXO to Bob", valid: false },
        ]
      },
      errorIndex: 1,
      errorType: "invalid_connection",
      explanation: "The same UTXO cannot have two valid outgoing 'spend' morphisms simultaneously. A UTXO is a one-time-use object: spending it destroys it (creates new UTXOs). The second spend arrow doesn't exist — this is exactly what blockchain consensus enforces. The categorical constraint (a spent UTXO has no outgoing morphisms) IS the double-spend prevention."
    },

    // --- SYSTEMS SCIENCE ---
    {
      id: "se-ss-01",
      type: "spot_error",
      domain: "systems_science",
      difficulty: 2,
      prompt: "A feedback control chain — one arrow is wrong. Which one?",
      diagram: {
        objects: ["Goal state", "Error signal", "Control action", "System output", "Sensor reading"],
        morphisms: [
          { from: 0, to: 1, label: "Compare goal to sensor reading", valid: true },
          { from: 1, to: 2, label: "Apply control law", valid: true },
          { from: 2, to: 3, label: "Actuate system", valid: true },
          { from: 3, to: 4, label: "Measure output", valid: true },
          { from: 4, to: 0, label: "Sensor directly sets goal state", valid: false },
        ]
      },
      errorIndex: 4,
      errorType: "wrong_target",
      explanation: "The sensor reading feeds back to the COMPARATOR (which computes the error signal), not to the goal state. The goal state is set externally by the system designer — it is the reference input. If the sensor could rewrite the goal state, the system would have no meaningful objective. The correct arrow is sensor reading → error signal (via comparison with goal state)."
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
    {
      id: "fu-05",
      type: "functor_match",
      domain: "cooking",
      difficulty: 1,
      prompt: "Map each food state to its safe storage temperature range, and each operation to the temperature change it represents.",
      categoryA: {
        name: "𝒞: Food storage states",
        objects: ["Frozen meat", "Refrigerated meat", "Cooked meat"],
        morphisms: [
          { from: "Frozen meat", to: "Refrigerated meat", label: "thaw in fridge" },
          { from: "Refrigerated meat", to: "Cooked meat", label: "heat to safe temp" }
        ]
      },
      categoryB: {
        name: "𝒟: Temperature categories",
        objects: ["Below −10°C", "1–4°C", "Above 70°C"],
        morphisms: [
          { from: "Below −10°C", to: "1–4°C", label: "raise above freezing" },
          { from: "1–4°C", to: "Above 70°C", label: "raise to cooking temp" }
        ]
      },
      correctMapping: {
        objects: { "Frozen meat": "Below −10°C", "Refrigerated meat": "1–4°C", "Cooked meat": "Above 70°C" },
        morphisms: { "thaw in fridge": "raise above freezing", "heat to safe temp": "raise to cooking temp" }
      },
      explanation: "The temperature functor maps food safety states to temperature ranges, and food handling operations to temperature changes. Composition is preserved: thaw then heat = go from frozen to cooked, which matches raise above freezing then raise to cooking temp."
    },
    {
      id: "fu-06",
      type: "functor_match",
      domain: "family",
      difficulty: 1,
      prompt: "Map each life stage to its generation number, and each transition to the corresponding arrow.",
      categoryA: {
        name: "𝒞: Family tree",
        objects: ["Grandparent", "Parent", "Child"],
        morphisms: [
          { from: "Grandparent", to: "Parent", label: "is parent of" },
          { from: "Parent", to: "Child", label: "is parent of" }
        ]
      },
      categoryB: {
        name: "𝒟: Generation numbers",
        objects: ["Gen 1", "Gen 2", "Gen 3"],
        morphisms: [
          { from: "Gen 1", to: "Gen 2", label: "next generation" },
          { from: "Gen 2", to: "Gen 3", label: "next generation" }
        ]
      },
      correctMapping: {
        objects: { "Grandparent": "Gen 1", "Parent": "Gen 2", "Child": "Gen 3" },
        morphisms: { "is parent of": "next generation" }
      },
      explanation: "The generation functor maps family members to numbered generations and the 'is parent of' relation to 'next generation.' Both morphisms in 𝒞 share the same label, so both map to the single morphism in 𝒟. Composition is preserved: grandparent → parent → child maps to Gen 1 → Gen 2 → Gen 3."
    },
    {
      id: "fu-07",
      type: "functor_match",
      domain: "cooking",
      difficulty: 2,
      prompt: "Map the bread-making stages to their dominant chemical phase, and each operation to the corresponding transformation.",
      categoryA: {
        name: "𝒞: Bread-making stages",
        objects: ["Flour + water + yeast", "Dough", "Risen dough", "Bread"],
        morphisms: [
          { from: "Flour + water + yeast", to: "Dough", label: "knead" },
          { from: "Dough", to: "Risen dough", label: "proof" },
          { from: "Risen dough", to: "Bread", label: "bake" }
        ]
      },
      categoryB: {
        name: "𝒟: Chemical phases",
        objects: ["Dry mixture", "Hydrated gluten network", "CO₂-expanded network", "Gelatinized starch"],
        morphisms: [
          { from: "Dry mixture", to: "Hydrated gluten network", label: "hydrate and cross-link" },
          { from: "Hydrated gluten network", to: "CO₂-expanded network", label: "ferment" },
          { from: "CO₂-expanded network", to: "Gelatinized starch", label: "set by heat" }
        ]
      },
      correctMapping: {
        objects: {
          "Flour + water + yeast": "Dry mixture",
          "Dough": "Hydrated gluten network",
          "Risen dough": "CO₂-expanded network",
          "Bread": "Gelatinized starch"
        },
        morphisms: { "knead": "hydrate and cross-link", "proof": "ferment", "bake": "set by heat" }
      },
      explanation: "The chemistry functor maps each bread stage to its molecular structure and each kitchen operation to the chemical transformation it causes. Composition is fully preserved: the sequence knead → proof → bake corresponds exactly to hydrate → ferment → set by heat."
    },
    {
      id: "fu-08",
      type: "functor_match",
      domain: "logic",
      difficulty: 2,
      prompt: "Map the implication chain to the subset chain, and each proof step to its set-theoretic counterpart.",
      categoryA: {
        name: "𝒞: Propositions about Fido",
        objects: ["Fido is a poodle", "Fido is a dog", "Fido is an animal"],
        morphisms: [
          { from: "Fido is a poodle", to: "Fido is a dog", label: "poodles are dogs" },
          { from: "Fido is a dog", to: "Fido is an animal", label: "dogs are animals" }
        ]
      },
      categoryB: {
        name: "𝒟: Sets of individuals",
        objects: ["Poodles", "Dogs", "Animals"],
        morphisms: [
          { from: "Poodles", to: "Dogs", label: "⊂" },
          { from: "Dogs", to: "Animals", label: "⊂" }
        ]
      },
      correctMapping: {
        objects: { "Fido is a poodle": "Poodles", "Fido is a dog": "Dogs", "Fido is an animal": "Animals" },
        morphisms: { "poodles are dogs": "⊂", "dogs are animals": "⊂" }
      },
      explanation: "Each proposition 'x is a P' maps to the set of all Ps. Each logical implication 'all Ps are Qs' maps to the subset inclusion P ⊂ Q. Composition is preserved: poodles ⊂ dogs and dogs ⊂ animals implies poodles ⊂ animals, matching the composed implication."
    },
    {
      id: "fu-09",
      type: "functor_match",
      domain: "family",
      difficulty: 1,
      prompt: "Map the plant life stages to approximate ages, and each biological transition to the elapsed time it represents.",
      categoryA: {
        name: "𝒞: Plant lifecycle",
        objects: ["Seed", "Seedling", "Mature plant"],
        morphisms: [
          { from: "Seed", to: "Seedling", label: "germinate" },
          { from: "Seedling", to: "Mature plant", label: "grow" }
        ]
      },
      categoryB: {
        name: "𝒟: Age categories",
        objects: ["Day 0", "Week 1", "Year 1+"],
        morphisms: [
          { from: "Day 0", to: "Week 1", label: "days pass" },
          { from: "Week 1", to: "Year 1+", label: "months pass" }
        ]
      },
      correctMapping: {
        objects: { "Seed": "Day 0", "Seedling": "Week 1", "Mature plant": "Year 1+" },
        morphisms: { "germinate": "days pass", "grow": "months pass" }
      },
      explanation: "The time functor maps each life stage to the approximate age at which it occurs, and each transition to the time interval it spans. Composition is preserved: germinate ∘ grow = seed → mature plant maps to days pass ∘ months pass = day 0 → year 1+."
    },
    {
      id: "fu-10",
      type: "functor_match",
      domain: "logic",
      difficulty: 2,
      prompt: "Map the formal proof steps to the arithmetic operations they correspond to.",
      categoryA: {
        name: "𝒞: Proof steps",
        objects: ["Premise P", "P and Q", "P and Q and R"],
        morphisms: [
          { from: "Premise P", to: "P and Q", label: "introduce Q (conjunction)" },
          { from: "P and Q", to: "P and Q and R", label: "introduce R (conjunction)" }
        ]
      },
      categoryB: {
        name: "𝒟: Numbers (conjunct count)",
        objects: ["1", "2", "3"],
        morphisms: [
          { from: "1", to: "2", label: "+1" },
          { from: "2", to: "3", label: "+1" }
        ]
      },
      correctMapping: {
        objects: { "Premise P": "1", "P and Q": "2", "P and Q and R": "3" },
        morphisms: { "introduce Q (conjunction)": "+1", "introduce R (conjunction)": "+1" }
      },
      explanation: "The 'size' functor maps each proposition to the number of conjuncts it contains, and each conjunction introduction step to the operation +1. Composition is preserved: introducing Q then R = going from 1 conjunct to 3, which equals +1 then +1 = +2."
    },
    {
      id: "fu-11",
      type: "functor_match",
      domain: "cooking",
      difficulty: 2,
      prompt: "Map each egg cooking stage to its visual appearance, and each operation to what changes in the yolk.",
      categoryA: {
        name: "𝒞: Egg cooking states",
        objects: ["Raw egg", "Soft-boiled egg", "Hard-boiled egg"],
        morphisms: [
          { from: "Raw egg", to: "Soft-boiled egg", label: "boil 6 minutes" },
          { from: "Soft-boiled egg", to: "Hard-boiled egg", label: "boil 6 more minutes" }
        ]
      },
      categoryB: {
        name: "𝒟: Yolk textures",
        objects: ["Liquid", "Jammy", "Firm"],
        morphisms: [
          { from: "Liquid", to: "Jammy", label: "partially set" },
          { from: "Jammy", to: "Firm", label: "fully set" }
        ]
      },
      correctMapping: {
        objects: { "Raw egg": "Liquid", "Soft-boiled egg": "Jammy", "Hard-boiled egg": "Firm" },
        morphisms: { "boil 6 minutes": "partially set", "boil 6 more minutes": "fully set" }
      },
      explanation: "The texture functor maps each egg cooking stage to the state of its yolk. Boiling for 6 minutes partially coagulates the yolk proteins (liquid → jammy), and another 6 minutes fully coagulates them (jammy → firm). Composition is preserved and irreversible — you cannot un-set proteins."
    },
    {
      id: "fu-12",
      type: "functor_match",
      domain: "mixed",
      difficulty: 2,
      prompt: "Map the musical key relationships to their arithmetic counterparts in clock arithmetic (ℤ₁₂).",
      categoryA: {
        name: "𝒞: Musical keys",
        objects: ["C major", "G major", "D major"],
        morphisms: [
          { from: "C major", to: "G major", label: "up a perfect fifth" },
          { from: "G major", to: "D major", label: "up a perfect fifth" }
        ]
      },
      categoryB: {
        name: "𝒟: Integers mod 12",
        objects: ["0", "7", "2"],
        morphisms: [
          { from: "0", to: "7", label: "+7 (mod 12)" },
          { from: "7", to: "2", label: "+7 (mod 12)" }
        ]
      },
      correctMapping: {
        objects: { "C major": "0", "G major": "7", "D major": "2" },
        morphisms: { "up a perfect fifth": "+7 (mod 12)" }
      },
      explanation: "Each musical key corresponds to a pitch class (C=0, G=7, D=2) in the 12-tone system. Moving up a perfect fifth always adds 7 semitones, modulo 12. So G major (0+7=7) and D major (7+7=14 mod 12 = 2). Composition is preserved: two fifths up from C = D, which matches +7 twice in ℤ₁₂."
    },
    {
      id: "fu-13",
      type: "functor_match",
      domain: "logic",
      difficulty: 3,
      prompt: "Map the parity category to the arithmetic category. Each object is a parity class; morphisms are transformations.",
      categoryA: {
        name: "𝒞: Parity (even/odd)",
        objects: ["Even", "Odd"],
        morphisms: [
          { from: "Even", to: "Odd", label: "add 1" },
          { from: "Odd", to: "Even", label: "add 1" }
        ]
      },
      categoryB: {
        name: "𝒟: Integers mod 2",
        objects: ["0", "1"],
        morphisms: [
          { from: "0", to: "1", label: "+1 (mod 2)" },
          { from: "1", to: "0", label: "+1 (mod 2)" }
        ]
      },
      correctMapping: {
        objects: { "Even": "0", "Odd": "1" },
        morphisms: { "add 1": "+1 (mod 2)" }
      },
      explanation: "Even numbers correspond to 0 mod 2, odd numbers to 1 mod 2. Adding 1 to an even number gives an odd number, and vice versa — matching +1 in ℤ₂. Both 'add 1' morphisms (even→odd and odd→even) share the same label, and both map to '+1 (mod 2).' This functor is an isomorphism of categories."
    },
    {
      id: "fu-14",
      type: "functor_match",
      domain: "cooking",
      difficulty: 2,
      prompt: "Map the wine production stages to the sugar content category.",
      categoryA: {
        name: "𝒞: Wine production",
        objects: ["Fresh grapes", "Crushed must", "Fermented wine"],
        morphisms: [
          { from: "Fresh grapes", to: "Crushed must", label: "crush and press" },
          { from: "Crushed must", to: "Fermented wine", label: "ferment with yeast" }
        ]
      },
      categoryB: {
        name: "𝒟: Sugar levels",
        objects: ["High sugar (15–25% Brix)", "Medium sugar (10–15% Brix)", "Low sugar (<1% Brix)"],
        morphisms: [
          { from: "High sugar (15–25% Brix)", to: "Medium sugar (10–15% Brix)", label: "release and dilute" },
          { from: "Medium sugar (10–15% Brix)", to: "Low sugar (<1% Brix)", label: "consume sugars" }
        ]
      },
      correctMapping: {
        objects: {
          "Fresh grapes": "High sugar (15–25% Brix)",
          "Crushed must": "Medium sugar (10–15% Brix)",
          "Fermented wine": "Low sugar (<1% Brix)"
        },
        morphisms: { "crush and press": "release and dilute", "ferment with yeast": "consume sugars" }
      },
      explanation: "The sugar functor maps each wine stage to its sugar concentration. Crushing dilutes the concentrated grape sugar into the must; fermentation consumes the remaining sugar as yeast metabolize it into ethanol. Composition is preserved: crush then ferment = fresh grapes all the way to dry wine."
    },
    {
      id: "fu-15",
      type: "functor_match",
      domain: "mixed",
      difficulty: 1,
      prompt: "Map each day to a number, and each 'next day' step to its arithmetic counterpart.",
      categoryA: {
        name: "𝒞: Days of the week",
        objects: ["Monday", "Tuesday", "Wednesday"],
        morphisms: [
          { from: "Monday", to: "Tuesday", label: "next day" },
          { from: "Tuesday", to: "Wednesday", label: "next day" }
        ]
      },
      categoryB: {
        name: "𝒟: Numbers",
        objects: ["1", "2", "3"],
        morphisms: [
          { from: "1", to: "2", label: "+1" },
          { from: "2", to: "3", label: "+1" }
        ]
      },
      correctMapping: {
        objects: { "Monday": "1", "Tuesday": "2", "Wednesday": "3" },
        morphisms: { "next day": "+1" }
      },
      explanation: "The simplest possible functor: map each day to its ordinal number and 'next day' to +1. Composition is preserved: next day twice from Monday = Wednesday, and +1 twice from 1 = 3. This illustrates that any ordered sequence has a natural functor to the natural numbers."
    },

    // --- POLITICAL ECONOMY ---
    {
      id: "fu-pe-01",
      type: "functor_match",
      domain: "political_economy",
      difficulty: 3,
      prompt: "Hayek's core finding: markets and legislatures share the same categorical process architecture. Map the objects and morphisms.",
      categoryA: {
        name: "𝒞: Market process (Hayek)",
        objects: ["Entrepreneurial plans", "Market exchange", "Price signals", "Capital structure"],
        morphisms: [
          { from: "Entrepreneurial plans", to: "Market exchange", label: "Production + offering" },
          { from: "Market exchange", to: "Price signals", label: "Competitive selection" },
          { from: "Price signals", to: "Entrepreneurial plans", label: "Anticipatory adjustment" },
          { from: "Entrepreneurial plans", to: "Capital structure", label: "Investment commitment" }
        ]
      },
      categoryB: {
        name: "𝒟: Legislative process (Hayek)",
        objects: ["Political proposals", "Deliberation / negotiation", "Legislative support signals", "Enacted law"],
        morphisms: [
          { from: "Political proposals", to: "Deliberation / negotiation", label: "Political entrepreneurship" },
          { from: "Deliberation / negotiation", to: "Legislative support signals", label: "Engagement + vote counting" },
          { from: "Legislative support signals", to: "Political proposals", label: "Adaptation to political feasibility" },
          { from: "Political proposals", to: "Enacted law", label: "Drafting + passage" }
        ]
      },
      correctMapping: {
        objects: {
          "Entrepreneurial plans": "Political proposals",
          "Market exchange": "Deliberation / negotiation",
          "Price signals": "Legislative support signals",
          "Capital structure": "Enacted law"
        },
        morphisms: {
          "Production + offering": "Political entrepreneurship",
          "Competitive selection": "Engagement + vote counting",
          "Anticipatory adjustment": "Adaptation to political feasibility",
          "Investment commitment": "Drafting + passage"
        }
      },
      explanation: "The functor preserves the process architecture — how information flows and guides decisions — while objects and morphisms change completely. Entrepreneurial plans map to political proposals; price signals map to legislative support signals; capital investment maps to enacted law. Hayek could describe markets, legislatures, science, and brains with one framework because they are categorically equivalent at the process level."
    },

    // --- CRYPTOECONOMICS ---
    {
      id: "fu-ce-01",
      type: "functor_match",
      domain: "cryptoeconomics",
      difficulty: 3,
      prompt: "The blockchain isomorphism: Bitcoin and Ethereum share the same 4-subsystem governance architecture. Map the objects and morphisms.",
      categoryA: {
        name: "𝒞: Bitcoin architecture",
        objects: ["Core developers", "Miners", "Protocol rules", "Proof-of-Work consensus"],
        morphisms: [
          { from: "Core developers", to: "Protocol rules", label: "BIP proposals" },
          { from: "Protocol rules", to: "Miners", label: "Enforce rules" },
          { from: "Miners", to: "Proof-of-Work consensus", label: "Produce blocks" },
          { from: "Proof-of-Work consensus", to: "Protocol rules", label: "Validate" }
        ]
      },
      categoryB: {
        name: "𝒟: Ethereum architecture",
        objects: ["Ethereum Foundation / EIPs", "Validators", "Protocol rules", "Proof-of-Stake consensus"],
        morphisms: [
          { from: "Ethereum Foundation / EIPs", to: "Protocol rules", label: "EIP proposals" },
          { from: "Protocol rules", to: "Validators", label: "Enforce rules" },
          { from: "Validators", to: "Proof-of-Stake consensus", label: "Attest + propose blocks" },
          { from: "Proof-of-Stake consensus", to: "Protocol rules", label: "Validate" }
        ]
      },
      correctMapping: {
        objects: {
          "Core developers": "Ethereum Foundation / EIPs",
          "Miners": "Validators",
          "Protocol rules": "Protocol rules",
          "Proof-of-Work consensus": "Proof-of-Stake consensus"
        },
        morphisms: {
          "BIP proposals": "EIP proposals",
          "Enforce rules": "Enforce rules",
          "Produce blocks": "Attest + propose blocks",
          "Validate": "Validate"
        }
      },
      explanation: "Despite radically different consensus mechanisms (mining vs. staking), both blockchains share the identical 4-subsystem governance architecture. The functor reveals structural isomorphism: the way developers propose, validators enforce, consensus produces, and rules validate is the same categorical pattern in Bitcoin and Ethereum — and also in Cosmos, Solana, and other chains."
    },

    // --- SYSTEMS SCIENCE ---
    {
      id: "fu-ss-01",
      type: "functor_match",
      domain: "systems_science",
      difficulty: 3,
      prompt: "Bertalanffy's GST: cell biology and social organization share the same structural pattern. Map the objects and morphisms.",
      categoryA: {
        name: "𝒞: Cell biology",
        objects: ["Nucleus", "Membrane", "Mitochondria", "Cytoplasm"],
        morphisms: [
          { from: "Nucleus", to: "Cytoplasm", label: "Gene expression" },
          { from: "Mitochondria", to: "Cytoplasm", label: "Energy supply" },
          { from: "Membrane", to: "Cytoplasm", label: "Selective import/export" }
        ]
      },
      categoryB: {
        name: "𝒟: Social organization",
        objects: ["Central governance", "Boundary / law", "Resource production", "Operating units"],
        morphisms: [
          { from: "Central governance", to: "Operating units", label: "Policy implementation" },
          { from: "Resource production", to: "Operating units", label: "Resource allocation" },
          { from: "Boundary / law", to: "Operating units", label: "Constraint enforcement" }
        ]
      },
      correctMapping: {
        objects: {
          "Nucleus": "Central governance",
          "Membrane": "Boundary / law",
          "Mitochondria": "Resource production",
          "Cytoplasm": "Operating units"
        },
        morphisms: {
          "Gene expression": "Policy implementation",
          "Energy supply": "Resource allocation",
          "Selective import/export": "Constraint enforcement"
        }
      },
      explanation: "Bertalanffy's General System Theory proposes that deep structural patterns repeat across scales and domains. The nucleus (information/control) maps to central governance; the membrane (selective boundary) maps to law; mitochondria (energy) maps to resource production; cytoplasm (working space) maps to operating units. The functor preserves the organizational logic while the physical substrate changes completely."
    },

    // --- NEUROMORPHICS ---
    {
      id: "fu-nm-01",
      type: "functor_match",
      domain: "neuromorphics",
      difficulty: 2,
      prompt: "The substrate-independence functor: biological neural circuits and artificial neural networks share the same computational architecture. Map the objects and morphisms.",
      categoryA: {
        name: "𝒞: Biological neural circuit",
        objects: ["Neuron", "Synapse", "Neural population", "Brain region"],
        morphisms: [
          { from: "Neuron", to: "Neural population", label: "Collective firing" },
          { from: "Synapse", to: "Neuron", label: "Weight input" },
          { from: "Neural population", to: "Brain region", label: "Functional organization" }
        ]
      },
      categoryB: {
        name: "𝒟: Artificial neural network",
        objects: ["Unit / node", "Weight", "Layer", "Network"],
        morphisms: [
          { from: "Unit / node", to: "Layer", label: "Activation aggregation" },
          { from: "Weight", to: "Unit / node", label: "Weighted input" },
          { from: "Layer", to: "Network", label: "Hierarchical composition" }
        ]
      },
      correctMapping: {
        objects: {
          "Neuron": "Unit / node",
          "Synapse": "Weight",
          "Neural population": "Layer",
          "Brain region": "Network"
        },
        morphisms: {
          "Collective firing": "Activation aggregation",
          "Weight input": "Weighted input",
          "Functional organization": "Hierarchical composition"
        }
      },
      explanation: "The functor preserves computational structure (what is computed) while abstracting away biological detail (how it is implemented). Neurons map to nodes; synapses map to weights; populations map to layers; brain regions map to networks. This is why artificial neural networks can approximate biological computation — the mathematics is substrate-independent, and the functor formalizes that independence."
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
    {
      id: "fc-09",
      type: "free_construction",
      domain: "cooking",
      difficulty: 1,
      objectA: "Flour",
      objectB: "Bread",
      steps: [
        {
          question: "In a category of cooking operations, does a direct morphism exist from flour to bread?",
          options: ["Yes — just bake the flour", "No — bread requires additional objects (water, yeast, salt)", "It depends on the recipe"],
          answer: "No — bread requires additional objects (water, yeast, salt)"
        },
        {
          question: "What kind of categorical structure is 'flour + water + yeast → bread'?",
          options: [
            "A morphism from a product object (flour × water × yeast) to bread",
            "A functor between categories",
            "A morphism from flour alone to bread"
          ],
          answer: "A morphism from a product object (flour × water × yeast) to bread"
        },
        {
          question: "Is the morphism from (flour × water × yeast) to bread an isomorphism?",
          options: [
            "Yes — you can un-bake bread back to ingredients",
            "No — baking is irreversible; ingredients cannot be recovered from the bread"
          ],
          answer: "No — baking is irreversible; ingredients cannot be recovered from the bread"
        }
      ],
      authorAnalysis: {
        category: "Cooking operations",
        morphism: "No direct morphism from flour alone; the source must be the product flour × water × yeast",
        direction: "product → bread",
        isIso: false,
        explanation: "Flour alone is not sufficient as a source object for the bread morphism — this is a common categorical mistake of specifying the wrong source. The real source is a product object. Product types appear constantly in category theory: A × B represents 'an A and a B together.' The bread-making morphism is a perfect example."
      }
    },
    {
      id: "fc-10",
      type: "free_construction",
      domain: "logic",
      difficulty: 2,
      objectA: "A question",
      objectB: "An answer",
      steps: [
        {
          question: "In a category of epistemic states, what is the morphism from a question to an answer?",
          options: [
            "Inquiry — the process of gathering evidence and reasoning to a conclusion",
            "Guessing — arbitrarily selecting a response",
            "There is no morphism; questions and answers are unrelated"
          ],
          answer: "Inquiry — the process of gathering evidence and reasoning to a conclusion"
        },
        {
          question: "Can multiple morphisms exist between the same question and answer?",
          options: [
            "Yes — many different inquiry methods can reach the same answer (experiment, deduction, testimony)",
            "No — there is only one valid inquiry method per question"
          ],
          answer: "Yes — many different inquiry methods can reach the same answer (experiment, deduction, testimony)"
        },
        {
          question: "Is this an isomorphism?",
          options: [
            "Yes — an answer determines its question",
            "No — the same answer can answer many different questions, so you cannot recover the question from the answer"
          ],
          answer: "No — the same answer can answer many different questions, so you cannot recover the question from the answer"
        }
      ],
      authorAnalysis: {
        category: "Epistemic inquiry",
        morphism: "Inquiry — any valid process that derives an answer from a question",
        direction: "AtoB",
        isIso: false,
        explanation: "Many different morphisms (inquiry methods) can connect the same question to the same answer. The category is rich: parallel morphisms show that truth is multiply accessible. And the morphism is not invertible — knowing '42' is the answer does not tell you which question was asked."
      }
    },
    {
      id: "fc-11",
      type: "free_construction",
      domain: "family",
      difficulty: 1,
      objectA: "Grandparent",
      objectB: "Grandchild",
      steps: [
        {
          question: "In a category of kinship relations, is there a direct morphism from grandparent to grandchild?",
          options: [
            "Yes — 'is the grandparent of' is a direct morphism",
            "No — the relationship must be mediated by a parent",
            "Only if they live in the same house"
          ],
          answer: "Yes — 'is the grandparent of' is a direct morphism"
        },
        {
          question: "Is this morphism the composition of simpler morphisms?",
          options: [
            "Yes — 'is grandparent of' = 'is parent of' ∘ 'is parent of'",
            "No — 'is grandparent of' is a primitive relation that cannot be decomposed",
            "Only in small families"
          ],
          answer: "Yes — 'is grandparent of' = 'is parent of' ∘ 'is parent of'"
        },
        {
          question: "Is 'is the grandparent of' an isomorphism?",
          options: [
            "Yes — the grandchild is also the grandchild of the grandparent",
            "No — 'is the grandchild of' is a different morphism, not an inverse; the relationship is directed"
          ],
          answer: "No — 'is the grandchild of' is a different morphism, not an inverse; the relationship is directed"
        }
      ],
      authorAnalysis: {
        category: "Kinship relations",
        morphism: "'is the grandparent of' — a morphism that is itself the composition of two 'is parent of' morphisms",
        direction: "AtoB",
        isIso: false,
        explanation: "This illustrates that morphisms can be composed: grandparent-of = parent-of ∘ parent-of. The composed morphism exists as a direct arrow in the category, even though it decomposes into two steps. The reverse ('is grandchild of') exists but is a different morphism, not an inverse."
      }
    },
    {
      id: "fc-12",
      type: "free_construction",
      domain: "cooking",
      difficulty: 2,
      objectA: "A menu",
      objectB: "A meal",
      steps: [
        {
          question: "In a category of restaurant operations, what is the morphism from menu to meal?",
          options: [
            "An order — a customer selects items and cooks prepare them",
            "The menu is a morphism, not an object",
            "No morphism exists; menus and meals are in different categories"
          ],
          answer: "An order — a customer selects items and cooks prepare them"
        },
        {
          question: "What role does the menu play categorically?",
          options: [
            "The menu is a set of available morphisms from 'raw ingredients' to 'prepared dishes'",
            "The menu is a functor",
            "The menu is an identity morphism"
          ],
          answer: "The menu is a set of available morphisms from 'raw ingredients' to 'prepared dishes'"
        },
        {
          question: "Can the same menu produce different meals?",
          options: [
            "Yes — different orders from the same menu yield different meals (different morphisms, same source)",
            "No — each menu has exactly one corresponding meal"
          ],
          answer: "Yes — different orders from the same menu yield different meals (different morphisms, same source)"
        }
      ],
      authorAnalysis: {
        category: "Restaurant operations",
        morphism: "An order — selects and instantiates a morphism from the menu's set of available operations",
        direction: "AtoB",
        isIso: false,
        explanation: "A menu is a specification of available morphisms, not itself a morphism. The act of ordering selects and executes one. Different orders from the same menu are parallel morphisms from the same source (raw ingredients) to different targets (different dishes). This is a case where the 'source' is really a product of ingredients."
      }
    },
    {
      id: "fc-13",
      type: "free_construction",
      domain: "family",
      difficulty: 2,
      objectA: "Sibling A",
      objectB: "Sibling B",
      steps: [
        {
          question: "In a category of kinship relations, is there a morphism from Sibling A to Sibling B?",
          options: [
            "Yes — 'is the sibling of' is a morphism",
            "No — siblings are not connected by morphisms, only by shared parents",
            "Only if they are twins"
          ],
          answer: "Yes — 'is the sibling of' is a morphism"
        },
        {
          question: "Is the sibling morphism symmetric (does a reverse also exist)?",
          options: [
            "Yes — if A is a sibling of B, then B is a sibling of A",
            "No — sibling relationships are directional"
          ],
          answer: "Yes — if A is a sibling of B, then B is a sibling of A"
        },
        {
          question: "Does symmetry make 'is the sibling of' an isomorphism?",
          options: [
            "Yes — the morphisms compose to identity: going A→B→A returns you to A",
            "No — in category theory, isomorphism requires that f ∘ g = id and g ∘ f = id, which holds here in a poset sense but not in a strict structural sense"
          ],
          answer: "Yes — the morphisms compose to identity: going A→B→A returns you to A"
        }
      ],
      authorAnalysis: {
        category: "Kinship relations (as a preorder/graph)",
        morphism: "'is the sibling of' — a symmetric morphism with a natural inverse",
        direction: "both",
        isIso: true,
        explanation: "In the category of kinship, 'is the sibling of' is symmetric: A is sibling of B iff B is sibling of A. Composing A→B with B→A gives A→A, which is the identity. This makes it an isomorphism. Compare with 'is the parent of,' which is not symmetric — a clean example of how different kinship morphisms have different categorical properties."
      }
    },
    {
      id: "fc-14",
      type: "free_construction",
      domain: "logic",
      difficulty: 3,
      objectA: "A set of axioms",
      objectB: "A theorem",
      steps: [
        {
          question: "In a category of formal proofs, what is the morphism from axioms to theorem?",
          options: [
            "A proof — a finite sequence of inference steps that derives the theorem from the axioms",
            "The axioms are morphisms, not objects",
            "No morphism exists if the theorem is unprovable"
          ],
          answer: "A proof — a finite sequence of inference steps that derives the theorem from the axioms"
        },
        {
          question: "Can multiple morphisms exist between the same axioms and the same theorem?",
          options: [
            "Yes — many different proofs can prove the same theorem from the same axioms",
            "No — each theorem has exactly one proof"
          ],
          answer: "Yes — many different proofs can prove the same theorem from the same axioms"
        },
        {
          question: "What does it mean categorically when no morphism exists from axioms to a statement?",
          options: [
            "The statement is unprovable from those axioms — it is independent of the axiom system",
            "The axioms are inconsistent",
            "The statement is false"
          ],
          answer: "The statement is unprovable from those axioms — it is independent of the axiom system"
        }
      ],
      authorAnalysis: {
        category: "Formal proof theory",
        morphism: "A proof — a morphism in the category of propositions under provability",
        direction: "AtoB",
        isIso: false,
        explanation: "This is the Curry-Howard correspondence in its simplest form: proofs are morphisms. Multiple proofs of the same theorem are parallel morphisms. Gödel's incompleteness theorem says some morphisms simply do not exist in sufficiently powerful axiom systems — some statements are true but unprovable, i.e., there is no morphism. This is one of the deepest facts about the category of proofs."
      }
    },
    {
      id: "fc-15",
      type: "free_construction",
      domain: "mixed",
      difficulty: 2,
      objectA: "A lock",
      objectB: "An open door",
      steps: [
        {
          question: "In a category of access control states, what is the morphism from lock to open door?",
          options: [
            "The correct key — only the right key unlocks the door",
            "Any physical force — the door can be forced open",
            "There is no morphism; locks and doors are different object types"
          ],
          answer: "The correct key — only the right key unlocks the door"
        },
        {
          question: "Is this an isomorphism?",
          options: [
            "Yes — you can lock the door again (re-lock = reverse morphism)",
            "No — once open, the door stays open permanently"
          ],
          answer: "Yes — you can lock the door again (re-lock = reverse morphism)"
        },
        {
          question: "What makes the key categorically special?",
          options: [
            "The key is itself a morphism — it encodes the specific transformation needed to change the state",
            "The key is an object that happens to be carried by a person",
            "The key is a functor between security categories"
          ],
          answer: "The key is itself a morphism — it encodes the specific transformation needed to change the state"
        }
      ],
      authorAnalysis: {
        category: "Access control states",
        morphism: "The correct key — a morphism encoding the unique transformation that unlocks this particular lock",
        direction: "AtoB",
        isIso: true,
        explanation: "Lock → open door is an isomorphism: the key unlocks, and re-locking with the same key reverses it. The key is both an object (a physical thing) and a morphism (a transformation specification) — this dual role is common in category theory. In cryptography, keys are formally modeled as morphisms in categories of encrypted states."
      }
    },

    // --- POLITICAL ECONOMY ---
    {
      id: "fc-pe-01",
      type: "free_construction",
      domain: "political_economy",
      difficulty: 2,
      objectA: "Tax policy",
      objectB: "Income inequality",
      steps: [
        {
          question: "Does a morphism exist between tax policy and income inequality?",
          options: ["Yes", "No", "Depends on the category"],
          answer: "Yes"
        },
        {
          question: "In a category of policy effects, what direction does the morphism go?",
          options: [
            "Tax policy → Income inequality (policy shapes distribution)",
            "Income inequality → Tax policy (inequality drives policy)",
            "Both directions simultaneously"
          ],
          answer: "Tax policy → Income inequality (policy shapes distribution)"
        },
        {
          question: "Is this an isomorphism?",
          options: [
            "Yes — you can read the exact tax policy back from observed inequality",
            "No — many different policies could produce similar distributions; the morphism is lossy"
          ],
          answer: "No — many different policies could produce similar distributions; the morphism is lossy"
        }
      ],
      authorAnalysis: {
        category: "Policy effects",
        morphism: "Tax policy shapes income distribution",
        direction: "AtoB",
        isIso: false,
        explanation: "In a causal-policy category, tax policy → income inequality is a valid one-way morphism. It is not an isomorphism: many different policies can produce similar distributional outcomes, so you cannot uniquely recover the policy from the distribution. The morphism is informationally lossy."
      }
    },
    {
      id: "fc-pe-02",
      type: "free_construction",
      domain: "political_economy",
      difficulty: 3,
      objectA: "System under stress (Easton)",
      objectB: "Structurally transformed system",
      steps: [
        {
          question: "Does a morphism exist between a political system under stress and its structurally transformed successor?",
          options: ["Yes", "No", "Only in authoritarian systems"],
          answer: "Yes"
        },
        {
          question: "What direction does the morphism go?",
          options: [
            "System under stress → Structurally transformed system (stress drives adaptation)",
            "Structurally transformed system → System under stress (change creates instability)",
            "Neither — stress and transformation are unrelated"
          ],
          answer: "System under stress → Structurally transformed system (stress drives adaptation)"
        },
        {
          question: "Easton's key claim: is this an isomorphism?",
          options: [
            "Yes — essential variables (binding decision-making capacity) are preserved across transformation",
            "No — structural transformation destroys the original system's identity"
          ],
          answer: "Yes — essential variables (binding decision-making capacity) are preserved across transformation"
        }
      ],
      authorAnalysis: {
        category: "Political systems with essential-variable functor",
        morphism: "Structural adaptation preserving essential variables",
        direction: "AtoB",
        isIso: true,
        explanation: "Easton's key insight: a political system's essential variables — the capacity to make and enforce binding decisions — can be preserved even as the surface institutions are completely restructured. The old and new structures are isomorphic at the level of essential variables. A revolution that preserves democratic governance is categorically an isomorphism; one that abolishes it is not."
      }
    },

    // --- CRYPTOECONOMICS ---
    {
      id: "fc-ce-01",
      type: "free_construction",
      domain: "cryptoeconomics",
      difficulty: 2,
      objectA: "Private key",
      objectB: "Bitcoin ownership",
      steps: [
        {
          question: "Does a morphism exist between private key possession and Bitcoin ownership?",
          options: ["Yes", "No", "Only on certain blockchains"],
          answer: "Yes"
        },
        {
          question: "What direction does the morphism go?",
          options: [
            "Private key → Bitcoin ownership (possessing the key IS ownership)",
            "Bitcoin ownership → Private key (ownership implies a key exists somewhere)",
            "Both directions simultaneously"
          ],
          answer: "Private key → Bitcoin ownership (possessing the key IS ownership)"
        },
        {
          question: "Is this an isomorphism?",
          options: [
            "Yes — key possession and Bitcoin ownership are cryptographically identical; a perfect bijection",
            "No — you can own Bitcoin without knowing your private key (e.g., custodial exchange)"
          ],
          answer: "Yes — key possession and Bitcoin ownership are cryptographically identical; a perfect bijection"
        }
      ],
      authorAnalysis: {
        category: "Cryptographic ownership",
        morphism: "Key possession ↔ asset control",
        direction: "AtoB",
        isIso: true,
        explanation: "In the non-custodial Bitcoin category, private key possession IS ownership — a real-world ownership claim that happens to be a mathematical isomorphism. Own the key ↔ control the Bitcoin, with no information lost. This is unusual: most ownership claims are social/legal constructs that are not isomorphisms. Bitcoin makes ownership a cryptographic fact."
      }
    },
    {
      id: "fc-ce-02",
      type: "free_construction",
      domain: "cryptoeconomics",
      difficulty: 3,
      objectA: "Cross-chain bridge (IBC/CCIP)",
      objectB: "Preserved transaction semantics",
      steps: [
        {
          question: "Does a morphism exist between a cross-chain bridge and preserved transaction semantics?",
          options: ["Yes", "No", "Only for wrapped tokens"],
          answer: "Yes"
        },
        {
          question: "What direction does the morphism go?",
          options: [
            "Bridge → Preserved semantics (the bridge maps transactions across chains while preserving meaning)",
            "Preserved semantics → Bridge (semantic requirements constrain bridge design)",
            "Neither — bridges don't preserve semantics"
          ],
          answer: "Bridge → Preserved semantics (the bridge maps transactions across chains while preserving meaning)"
        },
        {
          question: "Is a cross-chain bridge an isomorphism between chains?",
          options: [
            "Yes — bridges perfectly translate all transaction properties between chains",
            "No — bridges lose context (gas models differ, finality guarantees differ); it is a functor, not an isomorphism"
          ],
          answer: "No — bridges lose context (gas models differ, finality guarantees differ); it is a functor, not an isomorphism"
        }
      ],
      authorAnalysis: {
        category: "Cross-chain protocol category",
        morphism: "Structure-preserving translation between chain semantics",
        direction: "AtoB",
        isIso: false,
        explanation: "A cross-chain bridge is a functor: it maps transactions and their relationships from one chain's category to another's, preserving compositionality (chained operations stay chained). But it is not an isomorphism — gas models, finality guarantees, and execution semantics differ between chains. Information is lost or transformed. The functor captures what is preserved; the failure of isomorphism captures what is not."
      }
    },

    // --- SYSTEMS SCIENCE ---
    {
      id: "fc-ss-01",
      type: "free_construction",
      domain: "systems_science",
      difficulty: 2,
      objectA: "System perturbation",
      objectB: "System resilience",
      steps: [
        {
          question: "Does a morphism exist between system perturbation and system resilience?",
          options: ["Yes", "No", "Depends on the system type"],
          answer: "Yes"
        },
        {
          question: "What direction does the morphism go?",
          options: [
            "Perturbation → System resilience (perturbation reveals whether resilience exists)",
            "System resilience → Perturbation (resilient systems attract disturbances)",
            "Both equally"
          ],
          answer: "Perturbation → System resilience (perturbation reveals whether resilience exists)"
        },
        {
          question: "Is this an isomorphism?",
          options: [
            "Yes — knowing the perturbation tells you the system's resilience",
            "No — knowing the perturbation doesn't tell you resilience, and knowing resilience doesn't specify the perturbation"
          ],
          answer: "No — knowing the perturbation doesn't tell you resilience, and knowing resilience doesn't specify the perturbation"
        }
      ],
      authorAnalysis: {
        category: "Causal-functional relationships",
        morphism: "Perturbation tests/reveals resilience",
        direction: "AtoB",
        isIso: false,
        explanation: "Resilience is a property of the system itself, independent of any particular perturbation. The morphism runs from perturbation to resilience (the perturbation probes whether resilience exists) but is one-way: the perturbation doesn't create resilience, and knowing a system is resilient doesn't tell you which perturbation it faced. Non-invertible."
      }
    },

    // --- NEUROMORPHICS ---
    {
      id: "fc-nm-01",
      type: "free_construction",
      domain: "neuromorphics",
      difficulty: 3,
      objectA: "Hebbian learning ('neurons that fire together wire together')",
      objectB: "Gradient descent (backpropagation)",
      steps: [
        {
          question: "Does a morphism exist between Hebbian learning and gradient descent?",
          options: ["Yes — both are learning algorithms", "No — they are entirely incompatible", "Only in hybrid architectures"],
          answer: "Yes — both are learning algorithms"
        },
        {
          question: "What direction does the morphism go?",
          options: [
            "Hebbian → Gradient descent (Hebbian is a local rule; backprop generalizes to global optimization)",
            "Gradient descent → Hebbian (backprop is the general case; Hebbian is a special case)",
            "Neither direction — they are incomparable"
          ],
          answer: "Hebbian → Gradient descent (Hebbian is a local rule; backprop generalizes to global optimization)"
        },
        {
          question: "Is this an isomorphism?",
          options: [
            "Yes — Hebbian learning and gradient descent are equivalent for all purposes",
            "No — backpropagation requires a global error signal that Hebbian rules cannot provide; locality is lost"
          ],
          answer: "No — backpropagation requires a global error signal that Hebbian rules cannot provide; locality is lost"
        }
      ],
      authorAnalysis: {
        category: "Learning algorithms",
        morphism: "Generalization from local to global optimization",
        direction: "AtoB",
        isIso: false,
        explanation: "Hebbian learning is a purely local rule (each synapse updates based only on the activity of its two connected neurons). Gradient descent requires propagating a global error signal backward through the entire network — a fundamentally non-local operation. The morphism from Hebbian to backprop is a generalization that adds information (the global loss function). It is not invertible because locality is a structural property that gradient descent abandons."
      }
    },
  ],
};

export default challenges;
