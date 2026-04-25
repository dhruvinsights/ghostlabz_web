// Blog imagery is served from the public catalog folder so we never depend on
// flaky third-party CDNs. Each post can reference one or more local images.
const img = (n: number) =>
  `/images/catalog/Cat${n.toString().padStart(2, '0')}.jpg`;

export interface Blog {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  inlineImages?: string[];
  content: string;
}

export const blogs: Blog[] = [
  {
    id: 'b1',
    title: 'Peptide Batch Variability: Why Results Can Differ Between Samples',
    slug: 'peptide-batch-variability',
    date: 'April 24, 2026',
    author: 'GhostLabz Research Team',
    excerpt:
      'An investigation into the chemical factors that contribute to variance in peptide synthesis outcomes.',
    image: img(1),
    inlineImages: [img(2), img(3)],
    content: 'Long form content about batch variability...',
  },
  {
    id: 'b2',
    title:
      'Peptide Adsorption: Why Peptides Stick to Surfaces in Research Settings',
    slug: 'peptide-adsorption',
    date: 'April 24, 2026',
    author: 'Dr. Alistair Ghost',
    excerpt:
      'Understanding the electrostatic interactions that cause peptide loss on laboratory glassware.',
    image: img(2),
    inlineImages: [img(4), img(5)],
    content: 'Full analysis of surface chemistry and peptide adhesion...',
  },
  {
    id: 'b3',
    title:
      'Peptide Oxidation vs Hydrolysis: Key Differences in Degradation Pathways',
    slug: 'peptide-oxidation-vs-hydrolysis',
    date: 'April 24, 2026',
    author: 'GhostLabz Research Team',
    excerpt:
      'A comparison of the two primary chemical processes that compromise peptide integrity over time.',
    image: img(3),
    inlineImages: [img(6), img(7)],
    content: 'Deep dive into chemical stability...',
  },
  {
    id: 'b4',
    title:
      'FDA-Approved Peptides vs Research Peptides: What It Means for the RUO Industry',
    slug: 'fda-vs-research-peptides',
    date: 'April 21, 2026',
    author: 'Legal & Regulatory Dept',
    excerpt:
      'Clarifying the legal boundaries and quality standards of Research Use Only (RUO) materials.',
    image: img(4),
    inlineImages: [img(8), img(9)],
    content: 'Regulatory compliance overview...',
  },
  {
    id: 'b5',
    title:
      'Peptide Reconstitution Mistakes: Common Errors and How to Avoid Them',
    slug: 'peptide-reconstitution-mistakes',
    date: 'April 21, 2026',
    author: 'Lab Protocols',
    excerpt:
      'Practical guide to effective peptide mixing and avoidance of denaturation.',
    image: img(5),
    inlineImages: [img(10), img(11)],
    content: 'Step by step reconstitution guide...',
  },
  {
    id: 'b6',
    title:
      'Peptide Freeze-Thaw Cycles: How Repeated Freezing Impacts Stability',
    slug: 'peptide-freeze-thaw-cycles',
    date: 'April 20, 2026',
    author: 'Stability Lab',
    excerpt:
      'Evaluating the structural impact of temperature fluctuations on delicate peptide chains.',
    image: img(6),
    inlineImages: [img(12), img(1)],
    content: 'Cryogenic stability studies...',
  },
  {
    id: 'b7',
    title: 'How Air Exposure Affects Peptide Stability in Laboratory Conditions',
    slug: 'air-exposure-stability',
    date: 'April 19, 2026',
    author: 'Atmospheric Research',
    excerpt:
      'Preventing oxidation by minimizing oxygen exposure during handling.',
    image: img(7),
    inlineImages: [img(2), img(8)],
    content: 'Impact of inert gas blanketing...',
  },
  {
    id: 'b8',
    title:
      'Peptide Degradation Kinetics in Research: Modeling Breakdown Over Time',
    slug: 'peptide-degradation-kinetics',
    date: 'April 18, 2026',
    author: 'GhostLabz Analytics',
    excerpt:
      'Calculating half-lives and degradation rates for common research peptides.',
    image: img(8),
    inlineImages: [img(9), img(10)],
    content: 'Kinetic modeling for researchers...',
  },
];
