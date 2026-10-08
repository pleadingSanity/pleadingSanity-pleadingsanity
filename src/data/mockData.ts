import { Product, SolfeggioFrequency, Constellation, Story } from '../types';
import hoodieImg from '../assets/images/pleading_sanity_hoodie_1791492411940.jpg';
import teeImg from '../assets/images/pleading_sanity_tee_1791492430764.jpg';
import nebulaImg from '../assets/images/cosmic_nebula_hub_1791492447859.jpg';

export { hoodieImg, teeImg, nebulaImg };

export const PRODUCTS: Product[] = [
  {
    id: 'ps-hoodie-01',
    name: 'The "Rise From Madness" Heavyweight Hoodie',
    subtitle: 'Signature 450 GSM Organic French Terry',
    price: 85,
    category: 'hoodies',
    image: hoodieImg,
    badge: 'Signature Piece',
    description: 'Constructed from custom-milled 450 GSM organic French terry cotton. Features the sacred celestial constellation sigil screenprinted with water-based discharge ink on the back, and discreet "STILL BREATHING" inner sleeve cuff embroidery.',
    details: [
      '450 GSM 100% GOTS-certified organic cotton',
      'Double-lined hood with heavyweight drawstrings & matte hardware',
      'Secret inner cuff reminder: "Still Breathing"',
      'Drop-shoulder boxy oversized drape',
      'Pre-shrunk & enzyme washed for vintage softness'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stockStatus: 'In Stock',
    pledgeAmount: '£8.50'
  },
  {
    id: 'ps-tee-01',
    name: '"Evolution, Not Erasure" Mineral Acid-Wash Tee',
    subtitle: '280 GSM Heavy Combed Cotton',
    price: 42,
    category: 'tees',
    image: teeImg,
    badge: 'Best Seller',
    description: 'Hand-dyed mineral wash boxy tee celebrating neural diversity and personal survival. Distressed serif typography across chest with the Ursa Major constellation guiding the heart center.',
    details: [
      '280 GSM premium combed cotton',
      'Individual artisan mineral acid wash — every piece unique',
      'Reinforced 1.25" ribbed collar that never sags',
      'Relaxed skate-ready silhouette',
      '100% water-based discharge screenprint'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stockStatus: 'In Stock',
    pledgeAmount: '£4.20'
  },
  {
    id: 'ps-crew-02',
    name: '"Quiet the Static" Midnight Astral Crewneck',
    subtitle: '400 GSM Reverse-Weave Heavyweight Fleece',
    price: 75,
    category: 'hoodies',
    image: hoodieImg,
    badge: 'Limited Drop',
    description: 'Designed for high-sensory overwhelm days. Soft interior brushing with acoustic dampening tactile weight. Tonal black-on-black celestial sigil embroidery across left chest.',
    details: [
      '400 GSM reverse-weave cross-grain fleece',
      'Sensory-friendly flatlock seams without irritating interior neck labels',
      'Tonal starlight embroidery on chest and nape',
      'Deep midnight hue',
      'Spun in small limited batches'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stockStatus: 'Limited Batch',
    pledgeAmount: '£7.50'
  },
  {
    id: 'ps-tee-02',
    name: '"Neurodivergent & Unbroken" Oversized Tee',
    subtitle: '260 GSM Carbon Washed Jersey',
    price: 40,
    category: 'tees',
    image: teeImg,
    description: 'An unapologetic statement honoring those whose brains perceive reality through intense frequencies. Raw edge shoulder seams and subtle geometric celestial glyphs.',
    details: [
      '260 GSM organic ringspun cotton',
      'Carbon enzyme wash for lived-in feel',
      'Split side hems for effortless layering',
      'Soft-hand screenprinted artwork'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stockStatus: 'In Stock',
    pledgeAmount: '£4.00'
  },
  {
    id: 'ps-bottom-01',
    name: '"Heavy Mind, Light Feet" Utility Fleece Pants',
    subtitle: '420 GSM Brushed Fleece Joggers',
    price: 70,
    category: 'bottoms',
    image: hoodieImg,
    description: 'The ultimate sanctuary loungewear. Deep zippered safety pockets for phones and grounding stones. Thick ribbed cuffs that lock in warmth during anxious chill.',
    details: [
      '420 GSM heavy brushed interior fleece',
      'Concealed waterproof YKK zippered pockets',
      'Thick elastic waistband with knotted cotton cords',
      'Subtle constellation embroidery on calf'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stockStatus: 'In Stock',
    pledgeAmount: '£7.00'
  },
  {
    id: 'ps-ess-01',
    name: 'Sanity Sigil Merino Wool Beanie',
    subtitle: '100% Extra-Fine Merino Wool',
    price: 32,
    category: 'essentials',
    image: teeImg,
    badge: 'Essential',
    description: 'Breathable, temperature-regulating extra-fine merino wool with an etched brass and woven reflective starlight sigil tag. Deep fold cuff fits snugly.',
    details: [
      '100% ethical non-mulesed merino wool',
      'Seamless circular knit construction',
      'Woven reflective 3M starlight tab',
      'One size fits all'
    ],
    sizes: ['One Size'],
    stockStatus: 'In Stock',
    pledgeAmount: '£3.20'
  }
];

export const SOLFEGGIO_FREQUENCIES: SolfeggioFrequency[] = [
  {
    hz: 174,
    name: 'Pain Release & Grounding',
    title: 'The Foundation Anchor',
    benefit: 'Soothes physical tension, deep bodily security, and provides an anesthetic grounding frequency.',
    chakraOrFocus: 'Physical Body & Security',
    color: 'from-amber-700/30 to-amber-900/30',
    accentHex: '#D97706'
  },
  {
    hz: 285,
    name: 'Restoration & Cellular Vitality',
    title: 'The Rejuvenation Field',
    benefit: 'Helps return tissues to original blueprint, boosting energetic recuperation after nervous breakdown.',
    chakraOrFocus: 'Energy Regeneration',
    color: 'from-orange-700/30 to-orange-900/30',
    accentHex: '#EA580C'
  },
  {
    hz: 396,
    name: 'Liberation from Guilt & Fear',
    title: 'The Fear Breaker',
    benefit: 'Dissolves unconscious guilt, grief, and terror. Turns grief into joy and clears catastrophic ruminations.',
    chakraOrFocus: 'Root Chakra (Muladhara)',
    color: 'from-rose-800/30 to-red-950/30',
    accentHex: '#E11D48'
  },
  {
    hz: 417,
    name: 'Undoing Trauma & Enabling Change',
    title: 'The Catalyst Wave',
    benefit: 'Clears accumulated emotional debris, breaks destructive cognitive loops, and ignites fresh life paths.',
    chakraOrFocus: 'Sacral Chakra (Swadhisthana)',
    color: 'from-orange-600/30 to-amber-950/30',
    accentHex: '#F97316'
  },
  {
    hz: 432,
    name: 'Cosmic Order & Organic Equilibrium',
    title: 'Verdi Harmonic Tuning',
    benefit: 'The natural frequency of the cosmos. Decreases heart rate, regulates cortisol, and eases sensory overload.',
    chakraOrFocus: 'Universal Harmony & Calm',
    color: 'from-emerald-700/30 to-teal-950/30',
    accentHex: '#10B981'
  },
  {
    hz: 528,
    name: 'The Miracle Frequency & Rebirth',
    title: 'Transformation & DNA Clarity',
    benefit: 'The heart of Solfeggio. Awakens deep self-compassion, cellular restoration, and clarity in mental fog.',
    chakraOrFocus: 'Solar Plexus & Heart Bridge',
    color: 'from-cyan-600/30 to-sky-950/30',
    accentHex: '#06B6D4'
  },
  {
    hz: 639,
    name: 'Harmonizing Connection & Empathy',
    title: 'The Relational Bridge',
    benefit: 'Eases feelings of isolation and alien disconnection. Opens mutual empathy and healing with loved ones.',
    chakraOrFocus: 'Heart Chakra (Anahata)',
    color: 'from-blue-600/30 to-indigo-950/30',
    accentHex: '#3B82F6'
  },
  {
    hz: 741,
    name: 'Intuitive Expression & Problem Solving',
    title: 'The Awakening Voice',
    benefit: 'Dissolves mental static, toxins, and self-doubt. Empowers authentic honest speech and emotional expression.',
    chakraOrFocus: 'Throat Chakra (Vishuddha)',
    color: 'from-indigo-600/30 to-violet-950/30',
    accentHex: '#6366F1'
  },
  {
    hz: 852,
    name: 'Returning to Spiritual Order',
    title: 'The Clarity Lens',
    benefit: 'Quiets severe overthinking and existential dread. Re-anchors mental focus to quiet, unshakeable truth.',
    chakraOrFocus: 'Third Eye (Ajna)',
    color: 'from-purple-600/30 to-fuchsia-950/30',
    accentHex: '#8B5CF6'
  },
  {
    hz: 963,
    name: 'Crown Awakening & Cosmic Oneness',
    title: 'The Pure Consciousness Gate',
    benefit: 'Connects with the infinite light within. Reminds you that you are part of an unbroken, eternal universe.',
    chakraOrFocus: 'Crown Chakra (Sahasrara)',
    color: 'from-violet-500/30 to-pink-950/30',
    accentHex: '#A855F7'
  }
];

export const CONSTELLATIONS: Constellation[] = [
  {
    id: 'c-anchor',
    title: 'The Anchor of Stillness',
    symbol: '⚓',
    meaning: 'Grounding when the stormy mind feels like it will tear you away from reality.',
    affirmation: 'I am not my racing thoughts. The ground beneath me holds firm, and so do I.',
    nodes: [
      { id: 1, x: 200, y: 80, name: 'Apex of Breath' },
      { id: 2, x: 200, y: 220, name: 'Core Pillar' },
      { id: 3, x: 120, y: 270, name: 'Left Fluke' },
      { id: 4, x: 280, y: 270, name: 'Right Fluke' },
      { id: 5, x: 200, y: 310, name: 'Deep Seabed' }
    ],
    connections: [
      [1, 2],
      [2, 3],
      [2, 4],
      [3, 5],
      [4, 5]
    ]
  },
  {
    id: 'c-phoenix',
    title: 'The Phoenix of Rebirth',
    symbol: '🦅',
    meaning: 'Rising transformed from rock bottom. Every collapse is material for your next evolution.',
    affirmation: 'From ashes and madness, I do not just survive — I evolve into an unshakeable form.',
    nodes: [
      { id: 1, x: 200, y: 70, name: 'Crown Crest' },
      { id: 2, x: 200, y: 160, name: 'Solar Heart' },
      { id: 3, x: 90, y: 130, name: 'Ascending Wing Left' },
      { id: 4, x: 310, y: 130, name: 'Ascending Wing Right' },
      { id: 5, x: 140, y: 280, name: 'Flame Plume L' },
      { id: 6, x: 260, y: 280, name: 'Flame Plume R' }
    ],
    connections: [
      [1, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [5, 6]
    ]
  },
  {
    id: 'c-compass',
    title: 'The North Guiding Star',
    symbol: '🧭',
    meaning: 'Orientation when dissociation or grief steals your sense of direction.',
    affirmation: 'Even when the path is shrouded in fog, my internal compass knows the next true step.',
    nodes: [
      { id: 1, x: 200, y: 60, name: 'True North' },
      { id: 2, x: 320, y: 180, name: 'East Horizon' },
      { id: 3, x: 200, y: 300, name: 'Deep South' },
      { id: 4, x: 80, y: 180, name: 'West Horizon' },
      { id: 5, x: 200, y: 180, name: 'Central Origin' }
    ],
    connections: [
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 1]
    ]
  }
];

export const CRISIS_LINES = [
  {
    name: 'Samaritans (UK & ROI)',
    phone: '116 123',
    href: 'tel:116123',
    availability: '24 hours a day, 365 days a year',
    cost: 'Free from any phone in the UK & Ireland',
    description: 'Whatever you’re going through, a Samaritan will face it with you. No judgment, no pressure.',
    highlight: true,
    action: 'Call 116 123'
  },
  {
    name: 'Shout Crisis Text Line',
    phone: 'Text "SHOUT" to 85258',
    href: 'sms:85258?body=SHOUT',
    availability: '24/7 Free & Confidential Texting',
    cost: 'Free on all major UK networks',
    description: 'For moments when speaking out loud feels impossible. Text with trained crisis volunteers.',
    highlight: true,
    action: 'Text SHOUT to 85258'
  },
  {
    name: 'CALM (Campaign Against Living Miserably)',
    phone: '0800 58 58 58',
    href: 'tel:0800585858',
    availability: '5pm – Midnight every day',
    cost: 'Free and anonymous UK call',
    description: 'Dedicated helpline and webchat for anyone who is down, in crisis, or struggling to see tomorrow.',
    highlight: false,
    action: 'Call 0800 58 58 58'
  },
  {
    name: 'Papyrus HOPELINE247',
    phone: '0800 068 4141',
    href: 'tel:08000684141',
    availability: '24/7 confidential service',
    cost: 'Free for children and young people under 35',
    description: 'Specialist suicide prevention advisors supporting young people struggling with dark thoughts.',
    highlight: false,
    action: 'Call 0800 068 4141'
  },
  {
    name: 'Mind Infoline',
    phone: '0300 123 3393',
    href: 'tel:03001233393',
    availability: 'Mon to Fri, 9am to 6pm',
    cost: 'Standard local rate',
    description: 'Support, advocacy, and comprehensive guidance on mental health laws, rights, and treatments in the UK.',
    highlight: false,
    action: 'Call 0300 123 3393'
  },
  {
    name: 'International Helpline Directory',
    phone: 'Find A Helpline Worldwide',
    href: 'https://findahelpline.com',
    availability: 'Immediate Global Access',
    cost: 'Free directories by country',
    description: 'Connecting over 130 countries with verified suicide helplines and domestic support services.',
    highlight: false,
    action: 'Browse Global Lines'
  }
];

export const COMMUNITY_STORIES: Story[] = [
  {
    id: 'story-1',
    author: 'Liam K.',
    location: 'Manchester, UK',
    title: 'From Section 136 to Building My Tribe',
    text: 'Two years ago, police held me under Section 136 outside Piccadilly. I felt so intensely shattered that I believed my brain was irreversibly defective. When I found Pleading Sanity and the motto "Evolution, Not Erasure", something clicked. I stopped trying to delete who I was and started transmuting the hyper-sensitivity into painting. Now 700 days sober.',
    tag: 'Neurodivergent & Bipolar',
    flames: 142,
    date: '3 days ago'
  },
  {
    id: 'story-2',
    author: 'Sarah M.',
    location: 'Edinburgh, Scotland',
    title: 'The Frequency that Broke My Panic Loop',
    text: 'I used to get panic spikes so violent my hands seized into claws. During a 3 AM attack last winter, I put on the 528 Hz frequency with the rain filter while wearing my oversized Pleading hoodie. The tactile weight on my shoulders plus the steady tone pulled my vagus nerve back into rhythm. You are not broken, you are just running high voltage.',
    tag: 'Panic & Sensory Overwhelm',
    flames: 218,
    date: '1 week ago'
  },
  {
    id: 'story-3',
    author: 'Devon R.',
    location: 'Bristol, UK',
    title: 'Men Cry Too. The Silence Was What Was Killing Me.',
    text: 'In construction, you learn to swallow everything until your liver or your chest gives out. Calling CALM at 11 PM on a Sunday night saved my daughter from growing up without a dad. To anyone reading this in the quiet darkness: picking up the phone is the bravest, hardest thing you will ever do. Do it anyway.',
    tag: 'Depression & Men’s Health',
    flames: 389,
    date: '2 weeks ago'
  }
];
