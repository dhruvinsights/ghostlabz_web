// Local catalog images live under /public/images/catalog and are served as
// static assets. Centralising the asset map keeps data records concise and
// makes it trivial to swap photography later.
const catalog = (n: number) =>
  `/images/catalog/Cat${n.toString().padStart(2, '0')}.jpg`;

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductRating {
  value: number;
  reviews: number;
}

export interface ProductPricing {
  originalPrice: number;
  salePrice: number;
  currency: string;
}

export interface ProductDescription {
  overview: string;
  mechanism: string;
  researchFindings: string[];
  disclaimer: string;
}

export interface ProductResearchApplication {
  title: string;
  description: string;
}

export interface ProductMolecularProfile {
  sequence: string;
  molecularFormula: string;
  molecularWeight: string;
  appearance: string;
  form: string;
}

export interface ProductStorage {
  preReconstitution: string;
  postReconstitution: string;
  shelfLife: string;
  sensitivity: string;
}

export interface ProductRegulatory {
  fdaStatus: string;
  clinicalStatus: string;
  wadaStatus: string;
  researchUseOnly: boolean;
}

export interface ProductCompoundProfile {
  molecularProfile: ProductMolecularProfile;
  storage: ProductStorage;
  regulatory: ProductRegulatory;
}

export interface ProductCOA {
  purity: string;
  lab: string;
  lotNumber: string;
  labelledAmount: string;
  actualAmount: string;
  testDate: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductRelated {
  name: string;
  slug: string;
  price?: number;
  priceRange?: string;
}

export interface ProductShipping {
  methods: string[];
  deliveryWindow: string;
  freeShippingThreshold: number;
}

export interface Product {
  // Identity & quick-access fields (used by cards, cart, listings)
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  dosage: string;
  stock: boolean;

  // Pricing & rating
  pricing: ProductPricing;
  rating: ProductRating;

  // Media
  images: ProductImage[];

  // Copy
  shortDescription: string;
  description: ProductDescription;

  // Deep data
  researchApplications: ProductResearchApplication[];
  compoundProfile: ProductCompoundProfile;
  coa: ProductCOA;
  faq: ProductFAQ[];
  shipping: ProductShipping;
  features: string[];
  relatedProducts: ProductRelated[];

  // Convenience aliases for legacy components (cards / cart)
  price: number;
  image: string;
  description_short: string;
  purity: string;
  batchId: string;
}

const standardShipping: ProductShipping = {
  methods: ['FedEx 2-Day'],
  deliveryWindow: '2–3 business days',
  freeShippingThreshold: 200,
};

const standardFeatures = [
  'Fast US Shipping',
  'Batch-Level Traceability',
  'Dedicated Research Support',
  'Secure Checkout (SSL)',
];

type ProductInput = Omit<
  Product,
  'price' | 'image' | 'description_short' | 'purity' | 'batchId'
>;

const buildProduct = (p: ProductInput): Product => ({
  ...p,
  price: p.pricing.salePrice,
  image: p.images[0]?.url ?? '',
  description_short: p.shortDescription,
  purity: p.coa.purity,
  batchId: p.coa.lotNumber,
});

export const products: Product[] = [
  buildProduct({
    id: 'adipotide-10mg',
    name: 'Adipotide 10mg Vial',
    slug: 'adipotide-10mg',
    category: 'Metabolic Peptide',
    brand: 'GhostLabz',
    dosage: '10mg',
    stock: true,
    pricing: { originalPrice: 74.99, salePrice: 59.99, currency: 'USD' },
    rating: { value: 4.9, reviews: 21 },
    images: [{ url: catalog(1), alt: 'Adipotide 10mg vial' }],
    shortDescription:
      'Adipotide (CKGGRAKDC-GG-D(KLAKLAK)2) is a peptidomimetic targeting adipose tissue vasculature, studied for fat cell apoptosis and weight reduction.',
    description: {
      overview:
        'Adipotide is a synthetic peptidomimetic composed of a targeting sequence (CKGGRAKDC) that binds to prohibitin receptors on adipose tissue vasculature and a pro-apoptotic sequence (D(KLAKLAK)2) that disrupts mitochondrial membranes.',
      mechanism:
        'It induces apoptosis in fat tissue blood vessel cells, effectively cutting off nutrient supply to fat deposits.',
      researchFindings: [
        'Significant weight reduction observed in obese primates',
        'Improved insulin resistance',
        'Reversible kidney-related effects noted',
      ],
      disclaimer:
        'Experimental compound not approved for human use. For laboratory research only.',
    },
    researchApplications: [
      {
        title: 'Targeted Adipose Vascular Disruption',
        description:
          'Selective targeting of blood vessels supplying white adipose tissue via prohibitin binding.',
      },
      {
        title: 'Weight Reduction Research',
        description: 'Observed body weight reduction in primate models.',
      },
      {
        title: 'Insulin Sensitivity',
        description: 'Studied for improvements in insulin resistance.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'CKGGRAKDC GG D (KLAKLAK)2',
        molecularFormula: 'Peptidomimetic (chimeric)',
        molecularWeight: '~2500 g/mol',
        appearance: 'White lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, dry, protected from light',
        postReconstitution: 'Refrigerate 2–8°C, avoid freeze-thaw cycles',
        shelfLife: '24 months',
        sensitivity: 'Sensitive to heat, light, and moisture',
      },
      regulatory: {
        fdaStatus: 'Not approved',
        clinicalStatus: 'Preclinical (rhesus monkey studies)',
        wadaStatus: 'Not listed',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.81%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-ADIPOTIDE-10MG-A',
      labelledAmount: '10mg',
      actualAmount: '9.48mg',
      testDate: '2026-03-29',
    },
    faq: [
      {
        question: 'What is Adipotide?',
        answer:
          'A synthetic peptidomimetic targeting fat tissue vasculature for research purposes.',
      },
      {
        question: 'How does Adipotide work?',
        answer:
          'It induces apoptosis in adipose tissue blood vessels, reducing fat supply.',
      },
      {
        question: 'How should Adipotide be stored?',
        answer:
          'Store frozen before reconstitution and refrigerated after.',
      },
      {
        question: 'Has it been tested in humans?',
        answer: 'No, only preclinical animal studies exist.',
      },
      {
        question: 'Is it FDA approved?',
        answer: 'No, it is an experimental research compound.',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'Semax 30mg Vial', slug: 'semax-30mg', price: 49.99 },
      { name: 'CJC-1295 w/ DAC', slug: 'cjc-1295-dac-5mg', price: 59.99 },
      { name: 'Tesamorelin 10mg Vial', slug: 'tesamorelin-10mg', price: 110.0 },
      { name: 'NAD+ 500mg Vial', slug: 'nad-plus-500mg', price: 89.99 },
    ],
  }),

  buildProduct({
    id: 'ghk-cu-50',
    name: 'GHK-Cu 50mg Vial',
    slug: 'ghk-cu-50mg',
    category: 'Copper Peptide',
    brand: 'GhostLabz',
    dosage: '50mg',
    stock: true,
    pricing: { originalPrice: 59.0, salePrice: 45.0, currency: 'USD' },
    rating: { value: 4.8, reviews: 142 },
    images: [{ url: catalog(2), alt: 'GHK-Cu 50mg vial' }],
    shortDescription:
      'High-purity copper-bound tripeptide (Glycyl-L-Histidyl-L-Lysine) studied for dermal regeneration, wound healing, and extracellular matrix remodelling.',
    description: {
      overview:
        'GHK-Cu is a naturally occurring copper-binding tripeptide first isolated from human plasma. Its copper II complex is widely investigated for connective tissue repair and antioxidant activity.',
      mechanism:
        'Modulates expression of genes related to tissue remodelling, suppresses inflammatory cytokines, and stimulates fibroblast and keratinocyte activity.',
      researchFindings: [
        'Stimulates collagen and elastin synthesis in vitro',
        'Accelerates wound contraction in rodent models',
        'Demonstrates antioxidant activity against reactive oxygen species',
      ],
      disclaimer:
        'Research compound. Not intended for diagnosis, treatment, or prevention of disease.',
    },
    researchApplications: [
      {
        title: 'Dermal Regeneration',
        description:
          'Investigated for collagen synthesis and skin matrix repair.',
      },
      {
        title: 'Wound Healing',
        description: 'Used in models of accelerated tissue regeneration.',
      },
      {
        title: 'Hair Follicle Studies',
        description:
          'Examined for follicular size enlargement and growth phase induction.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'Gly-His-Lys (Cu²⁺ complex)',
        molecularFormula: 'C₁₄H₂₃CuN₆O₄',
        molecularWeight: '402.93 g/mol',
        appearance: 'Light blue lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, protected from light',
        postReconstitution: 'Refrigerate 2–8°C, use within 30 days',
        shelfLife: '24 months',
        sensitivity: 'Sensitive to heat and oxidation',
      },
      regulatory: {
        fdaStatus: 'Not approved',
        clinicalStatus: 'Preclinical / cosmetic research',
        wadaStatus: 'Not listed',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.20%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-2026-0421-GHK',
      labelledAmount: '50mg',
      actualAmount: '49.6mg',
      testDate: '2026-04-21',
    },
    faq: [
      {
        question: 'What is GHK-Cu used for in research?',
        answer:
          'Studies of dermal regeneration, wound healing, and antioxidant pathways.',
      },
      {
        question: 'How is it stored?',
        answer:
          'Below -20°C before reconstitution, refrigerated 2–8°C after.',
      },
      {
        question: 'Is it FDA approved?',
        answer: 'No. It is a research-use-only compound.',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'Glow Blend 70mg Vial', slug: 'glow-blend-70mg', price: 75.0 },
      { name: 'KLOW Blend 80mg Vial', slug: 'klow-blend-80mg', price: 85.0 },
      { name: 'BPC-157 5mg Vial', slug: 'bpc-157-5mg', price: 39.99 },
    ],
  }),

  buildProduct({
    id: 'klow-80',
    name: 'KLOW Blend 80mg Vial',
    slug: 'klow-blend-80mg',
    category: 'Research Blend',
    brand: 'GhostLabz',
    dosage: '80mg',
    stock: true,
    pricing: { originalPrice: 99.0, salePrice: 85.0, currency: 'USD' },
    rating: { value: 4.7, reviews: 64 },
    images: [{ url: catalog(3), alt: 'KLOW Blend 80mg vial' }],
    shortDescription:
      'Proprietary synergistic research blend (KPV / GHK-Cu / TB-4 frag / BPC-157) designed for cellular longevity and metabolic investigation.',
    description: {
      overview:
        'KLOW combines four well-characterised research peptides at calibrated ratios to support investigation of cellular repair, anti-inflammatory pathways, and longevity research.',
      mechanism:
        'Each constituent contributes a distinct pathway: KPV modulates inflammation, GHK-Cu drives matrix remodelling, TB-4 fragment supports angiogenesis, and BPC-157 promotes vascular repair.',
      researchFindings: [
        'Synergistic effects observed in tissue repair models',
        'Reduced inflammatory cytokine expression in vitro',
        'Enhanced angiogenic activity vs single-peptide controls',
      ],
      disclaimer:
        'For laboratory investigation only. Not for human or veterinary use.',
    },
    researchApplications: [
      {
        title: 'Cellular Longevity',
        description: 'Studies of senescence and tissue homeostasis.',
      },
      {
        title: 'Metabolic Investigation',
        description: 'Examined for anti-inflammatory metabolic pathways.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'KPV + GHK-Cu + TB-4 frag + BPC-157',
        molecularFormula: 'Multi-peptide blend',
        molecularWeight: 'Variable (blend)',
        appearance: 'White-to-blue lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, protected from light',
        postReconstitution: 'Refrigerate 2–8°C, avoid freeze-thaw cycles',
        shelfLife: '18 months',
        sensitivity: 'Sensitive to heat, light, and humidity',
      },
      regulatory: {
        fdaStatus: 'Not approved',
        clinicalStatus: 'Research use',
        wadaStatus: 'Not listed',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.50%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-2026-0315-KLW',
      labelledAmount: '80mg',
      actualAmount: '78.9mg',
      testDate: '2026-03-15',
    },
    faq: [
      {
        question: 'What does KLOW stand for?',
        answer:
          'A blend identifier referring to the constituent peptides used in the formulation.',
      },
      {
        question: 'Can I split the peptides?',
        answer:
          'No. The vial is a pre-mixed lyophilized blend supplied for research use only.',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'GHK-Cu 50mg Vial', slug: 'ghk-cu-50mg', price: 45.0 },
      { name: 'BPC-157 5mg Vial', slug: 'bpc-157-5mg', price: 39.99 },
      { name: 'TB-500 5mg Vial', slug: 'tb-500-5mg', price: 49.99 },
    ],
  }),

  buildProduct({
    id: 'glow-70',
    name: 'Glow Blend 70mg Vial',
    slug: 'glow-blend-70mg',
    category: 'Research Blend',
    brand: 'GhostLabz',
    dosage: '70mg',
    stock: true,
    pricing: { originalPrice: 89.0, salePrice: 75.0, currency: 'USD' },
    rating: { value: 4.6, reviews: 53 },
    images: [{ url: catalog(4), alt: 'Glow Blend 70mg vial' }],
    shortDescription:
      'Optimised peptide ratio for studying dermal regeneration, hair follicle behaviour, and extracellular matrix synthesis.',
    description: {
      overview:
        'Glow Blend pairs GHK-Cu with skin-targeted peptides to support investigation of fibroblast proliferation, melanogenesis, and connective tissue synthesis.',
      mechanism:
        'Combined peptides modulate gene expression for collagen, elastin, and glycosaminoglycan production while quenching reactive oxygen species.',
      researchFindings: [
        'Increased fibroblast viability in vitro',
        'Reduced UV-induced oxidative markers',
        'Stimulation of follicular dermal papilla cells',
      ],
      disclaimer:
        'Research only. Not for cosmetic or human use.',
    },
    researchApplications: [
      {
        title: 'Dermal Regeneration',
        description: 'Studies of fibroblast and keratinocyte proliferation.',
      },
      {
        title: 'Follicular Research',
        description: 'Hair growth signalling investigations.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'GHK-Cu + skin-targeted peptide complex',
        molecularFormula: 'Peptide blend',
        molecularWeight: 'Variable',
        appearance: 'Light blue lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, protected from light',
        postReconstitution: 'Refrigerate 2–8°C, use within 30 days',
        shelfLife: '18 months',
        sensitivity: 'Sensitive to oxidation and humidity',
      },
      regulatory: {
        fdaStatus: 'Not approved',
        clinicalStatus: 'Research use',
        wadaStatus: 'Not listed',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.80%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-2026-0210-GLW',
      labelledAmount: '70mg',
      actualAmount: '68.7mg',
      testDate: '2026-02-10',
    },
    faq: [
      {
        question: 'What does Glow Blend study?',
        answer: 'Skin matrix regeneration and follicular biology research.',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'GHK-Cu 50mg Vial', slug: 'ghk-cu-50mg', price: 45.0 },
      { name: 'KLOW Blend 80mg Vial', slug: 'klow-blend-80mg', price: 85.0 },
    ],
  }),

  buildProduct({
    id: 'tesa-10',
    name: 'Tesamorelin 10mg Vial',
    slug: 'tesamorelin-10mg',
    category: 'GH Secretagogue',
    brand: 'GhostLabz',
    dosage: '10mg',
    stock: true,
    pricing: { originalPrice: 129.0, salePrice: 110.0, currency: 'USD' },
    rating: { value: 4.8, reviews: 88 },
    images: [{ url: catalog(5), alt: 'Tesamorelin 10mg vial' }],
    shortDescription:
      'Synthetic 44-amino-acid GHRH analogue used to study growth hormone secretagogue protocols and metabolic regulation.',
    description: {
      overview:
        'Tesamorelin is a stabilised analogue of growth hormone-releasing hormone (GHRH) studied for its ability to stimulate endogenous GH and IGF-1 release.',
      mechanism:
        'Binds GHRH receptors on the anterior pituitary, triggering pulsatile growth hormone release without disrupting natural feedback loops.',
      researchFindings: [
        'Stimulates pulsatile GH and IGF-1 secretion',
        'Investigated for visceral adipose tissue reduction',
        'Studied in HIV-associated lipodystrophy models',
      ],
      disclaimer: 'Research compound. Not for human use.',
    },
    researchApplications: [
      {
        title: 'Endocrine Research',
        description: 'Investigation of GHRH-axis pulsatility.',
      },
      {
        title: 'Metabolic Studies',
        description: 'Visceral adipose tissue reduction modelling.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'Trans-3-hexenoyl-Tyr-Ala-Asp-Ala-Ile-Phe-Thr-… (44 AA)',
        molecularFormula: 'C₂₂₁H₃₆₆N₇₂O₆₇S',
        molecularWeight: '5135.85 g/mol',
        appearance: 'White lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, protected from light',
        postReconstitution: 'Refrigerate 2–8°C, use within 14 days',
        shelfLife: '24 months',
        sensitivity: 'Sensitive to heat and light',
      },
      regulatory: {
        fdaStatus: 'Approved (specific indication)',
        clinicalStatus: 'Clinical (HIV-LD)',
        wadaStatus: 'Prohibited (S2)',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.40%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-2026-0105-TSA',
      labelledAmount: '10mg',
      actualAmount: '9.85mg',
      testDate: '2026-01-05',
    },
    faq: [
      {
        question: 'How does Tesamorelin differ from GHRH?',
        answer:
          'A trans-3-hexenoyl group on the N-terminus stabilises the molecule and extends its half-life.',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'CJC-1295 w/ DAC', slug: 'cjc-1295-dac-5mg', price: 59.99 },
      { name: 'Ipamorelin 5mg Vial', slug: 'ipamorelin-5mg', price: 39.99 },
    ],
  }),

  buildProduct({
    id: 'bpc-157-5',
    name: 'BPC-157 5mg Vial',
    slug: 'bpc-157-5mg',
    category: 'Repair Peptide',
    brand: 'GhostLabz',
    dosage: '5mg',
    stock: true,
    pricing: { originalPrice: 49.99, salePrice: 39.99, currency: 'USD' },
    rating: { value: 4.9, reviews: 211 },
    images: [{ url: catalog(6), alt: 'BPC-157 5mg vial' }],
    shortDescription:
      'A 15-amino-acid stable gastric pentadecapeptide investigated for vascular, tendon, and gastrointestinal tissue repair.',
    description: {
      overview:
        'BPC-157 is derived from a protective protein found in human gastric juice. It is one of the most studied research peptides for its broad regenerative profile.',
      mechanism:
        'Modulates the nitric oxide pathway, promotes angiogenesis through VEGFR-2 expression, and influences growth-factor signalling at injury sites.',
      researchFindings: [
        'Accelerated tendon-to-bone healing in rodent models',
        'Improved gut barrier integrity in colitis studies',
        'Enhanced vascular network formation in vitro',
      ],
      disclaimer: 'For laboratory research only.',
    },
    researchApplications: [
      {
        title: 'Tendon Repair',
        description: 'Models of tendon-to-bone and ligament regeneration.',
      },
      {
        title: 'GI Mucosal Repair',
        description: 'Investigation of intestinal barrier protection.',
      },
      {
        title: 'Angiogenesis',
        description: 'Studies of vascular network development.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'GEPPPGKPADDAGLV',
        molecularFormula: 'C₆₂H₉₈N₁₆O₂₂',
        molecularWeight: '1419.55 g/mol',
        appearance: 'White lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, protected from light',
        postReconstitution: 'Refrigerate 2–8°C, use within 30 days',
        shelfLife: '24 months',
        sensitivity: 'Stable but light-sensitive',
      },
      regulatory: {
        fdaStatus: 'Not approved',
        clinicalStatus: 'Preclinical',
        wadaStatus: 'Not listed',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.65%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-BPC157-5MG-A',
      labelledAmount: '5mg',
      actualAmount: '4.92mg',
      testDate: '2026-03-01',
    },
    faq: [
      {
        question: 'What is BPC-157 derived from?',
        answer:
          'A partial sequence of body protection compound originally identified in gastric juice.',
      },
      {
        question: 'How is it reconstituted?',
        answer:
          'Typically with bacteriostatic water for laboratory in-vitro experiments.',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'TB-500 5mg Vial', slug: 'tb-500-5mg', price: 49.99 },
      { name: 'KLOW Blend 80mg Vial', slug: 'klow-blend-80mg', price: 85.0 },
    ],
  }),

  buildProduct({
    id: 'tb-500-5',
    name: 'TB-500 5mg Vial',
    slug: 'tb-500-5mg',
    category: 'Repair Peptide',
    brand: 'GhostLabz',
    dosage: '5mg',
    stock: true,
    pricing: { originalPrice: 64.99, salePrice: 49.99, currency: 'USD' },
    rating: { value: 4.7, reviews: 96 },
    images: [{ url: catalog(7), alt: 'TB-500 5mg vial' }],
    shortDescription:
      'A synthetic fragment of Thymosin Beta-4 studied for actin sequestration, cell migration, and wound repair.',
    description: {
      overview:
        'TB-500 is a 17-amino-acid fragment of Thymosin Beta-4, the principal G-actin sequestering molecule in mammalian cells.',
      mechanism:
        'Binds and sequesters G-actin, regulating cytoskeletal dynamics that drive cell migration, angiogenesis, and matrix remodelling.',
      researchFindings: [
        'Accelerated dermal wound closure in murine models',
        'Promoted cardiomyocyte migration in cardiac repair studies',
        'Modulated inflammatory cell trafficking',
      ],
      disclaimer: 'Research use only.',
    },
    researchApplications: [
      {
        title: 'Wound Repair',
        description: 'Models of dermal and corneal wound closure.',
      },
      {
        title: 'Cardiac Regeneration',
        description: 'Investigation of cardiomyocyte migration.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'LKKTETQ (active fragment of Tβ4)',
        molecularFormula: 'C₃₈H₆₈N₉O₁₄',
        molecularWeight: '889.01 g/mol',
        appearance: 'White lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, protected from light',
        postReconstitution: 'Refrigerate 2–8°C, avoid freeze-thaw cycles',
        shelfLife: '24 months',
        sensitivity: 'Light-sensitive',
      },
      regulatory: {
        fdaStatus: 'Not approved',
        clinicalStatus: 'Preclinical',
        wadaStatus: 'Prohibited (S2)',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.40%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-TB500-5MG-A',
      labelledAmount: '5mg',
      actualAmount: '4.88mg',
      testDate: '2026-03-10',
    },
    faq: [
      {
        question: 'What is TB-500 derived from?',
        answer: 'It is a synthetic fragment of Thymosin Beta-4 (Tβ4).',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'BPC-157 5mg Vial', slug: 'bpc-157-5mg', price: 39.99 },
      { name: 'GHK-Cu 50mg Vial', slug: 'ghk-cu-50mg', price: 45.0 },
    ],
  }),

  buildProduct({
    id: 'cjc-1295-dac-5',
    name: 'CJC-1295 w/ DAC 5mg Vial',
    slug: 'cjc-1295-dac-5mg',
    category: 'GH Secretagogue',
    brand: 'GhostLabz',
    dosage: '5mg',
    stock: true,
    pricing: { originalPrice: 74.99, salePrice: 59.99, currency: 'USD' },
    rating: { value: 4.8, reviews: 75 },
    images: [{ url: catalog(8), alt: 'CJC-1295 w/ DAC 5mg vial' }],
    shortDescription:
      'A long-acting GHRH analogue with Drug Affinity Complex (DAC) for extended half-life in growth hormone research.',
    description: {
      overview:
        'CJC-1295 is a tetra-substituted GHRH (1-29) analogue. The DAC moiety enables covalent binding to circulating albumin, dramatically extending half-life.',
      mechanism:
        'Stimulates pulsatile GH secretion through GHRH receptor activation while resisting enzymatic degradation thanks to its DAC linker.',
      researchFindings: [
        'Extended plasma half-life of ~6–8 days',
        'Sustained elevation of GH and IGF-1 levels in animal models',
        'Synergistic effects with ghrelin mimetics',
      ],
      disclaimer: 'Research only. Not for human use.',
    },
    researchApplications: [
      {
        title: 'GH Pulsatility Studies',
        description: 'Long-acting GHRH receptor activation modelling.',
      },
      {
        title: 'IGF-1 Axis Research',
        description: 'Sustained IGF-1 elevation profiles.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'CJC-1295 (1-29 modified) + DAC',
        molecularFormula: 'C₁₅₂H₂₅₂N₄₄O₄₂',
        molecularWeight: '3367.2 g/mol',
        appearance: 'White lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, protected from light',
        postReconstitution: 'Refrigerate 2–8°C, avoid freeze-thaw cycles',
        shelfLife: '24 months',
        sensitivity: 'Heat and light sensitive',
      },
      regulatory: {
        fdaStatus: 'Not approved',
        clinicalStatus: 'Preclinical',
        wadaStatus: 'Prohibited (S2)',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.20%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-CJC1295-5MG-A',
      labelledAmount: '5mg',
      actualAmount: '4.85mg',
      testDate: '2026-03-12',
    },
    faq: [
      {
        question: 'What does DAC stand for?',
        answer:
          'Drug Affinity Complex — a moiety that binds serum albumin to extend half-life.',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'Ipamorelin 5mg Vial', slug: 'ipamorelin-5mg', price: 39.99 },
      { name: 'Tesamorelin 10mg Vial', slug: 'tesamorelin-10mg', price: 110.0 },
    ],
  }),

  buildProduct({
    id: 'ipamorelin-5',
    name: 'Ipamorelin 5mg Vial',
    slug: 'ipamorelin-5mg',
    category: 'GH Secretagogue',
    brand: 'GhostLabz',
    dosage: '5mg',
    stock: true,
    pricing: { originalPrice: 49.99, salePrice: 39.99, currency: 'USD' },
    rating: { value: 4.7, reviews: 102 },
    images: [{ url: catalog(9), alt: 'Ipamorelin 5mg vial' }],
    shortDescription:
      'Selective ghrelin mimetic studied for clean GH release without significant cortisol or prolactin elevation.',
    description: {
      overview:
        'Ipamorelin is a pentapeptide ghrelin receptor agonist (GHSR-1a). Its selectivity makes it a popular research tool for GH-pulse experiments.',
      mechanism:
        'Activates GHSR-1a receptors on the anterior pituitary, stimulating GH release via a pathway distinct from GHRH.',
      researchFindings: [
        'Selective GH release without prolactin spikes in rodents',
        'Synergistic with GHRH analogues such as CJC-1295',
        'Short half-life supports pulse-release research',
      ],
      disclaimer: 'Research compound. Not for human use.',
    },
    researchApplications: [
      {
        title: 'GH Pulse Research',
        description: 'Investigation of selective GHSR-1a activation.',
      },
      {
        title: 'Combination Studies',
        description:
          'Co-administration with GHRH analogues for synergistic profiles.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'Aib-His-D-2-Nal-D-Phe-Lys-NH₂',
        molecularFormula: 'C₃₈H₄₉N₉O₅',
        molecularWeight: '711.85 g/mol',
        appearance: 'White lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, dry and dark',
        postReconstitution: 'Refrigerate 2–8°C, use within 14 days',
        shelfLife: '24 months',
        sensitivity: 'Sensitive to heat and light',
      },
      regulatory: {
        fdaStatus: 'Not approved',
        clinicalStatus: 'Preclinical',
        wadaStatus: 'Prohibited (S2)',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.55%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-IPAM-5MG-A',
      labelledAmount: '5mg',
      actualAmount: '4.94mg',
      testDate: '2026-03-18',
    },
    faq: [
      {
        question: 'Why is Ipamorelin called "selective"?',
        answer:
          'In rodent studies it elicits GH release with minimal effect on cortisol or prolactin.',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'CJC-1295 w/ DAC', slug: 'cjc-1295-dac-5mg', price: 59.99 },
      { name: 'Tesamorelin 10mg Vial', slug: 'tesamorelin-10mg', price: 110.0 },
    ],
  }),

  buildProduct({
    id: 'semax-30',
    name: 'Semax 30mg Vial',
    slug: 'semax-30mg',
    category: 'Nootropic Peptide',
    brand: 'GhostLabz',
    dosage: '30mg',
    stock: true,
    pricing: { originalPrice: 59.99, salePrice: 49.99, currency: 'USD' },
    rating: { value: 4.6, reviews: 41 },
    images: [{ url: catalog(10), alt: 'Semax 30mg vial' }],
    shortDescription:
      'A synthetic ACTH (4-10) analogue investigated for neuroprotection, BDNF expression, and cognitive research.',
    description: {
      overview:
        'Semax is a heptapeptide developed by Russian researchers as a stable analogue of adrenocorticotropic hormone fragment 4-10, free of hormonal activity.',
      mechanism:
        'Modulates BDNF and NGF expression, influences dopamine and serotonin turnover, and exhibits neuroprotective effects in ischemia models.',
      researchFindings: [
        'Increased BDNF expression in hippocampal models',
        'Improved learning and memory metrics in rodents',
        'Neuroprotective effects in cerebral ischemia studies',
      ],
      disclaimer: 'Research only.',
    },
    researchApplications: [
      {
        title: 'Cognitive Research',
        description: 'Memory consolidation and attention modelling.',
      },
      {
        title: 'Neuroprotection',
        description: 'Ischemia and oxidative stress investigations.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'Met-Glu-His-Phe-Pro-Gly-Pro',
        molecularFormula: 'C₃₉H₅₄N₁₀O₁₁S',
        molecularWeight: '894.02 g/mol',
        appearance: 'White lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, dry and dark',
        postReconstitution: 'Refrigerate 2–8°C, use within 30 days',
        shelfLife: '24 months',
        sensitivity: 'Light-sensitive',
      },
      regulatory: {
        fdaStatus: 'Not approved',
        clinicalStatus: 'Approved (Russia, specific indications)',
        wadaStatus: 'Not listed',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.10%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-SEMAX-30MG-A',
      labelledAmount: '30mg',
      actualAmount: '29.6mg',
      testDate: '2026-02-22',
    },
    faq: [
      {
        question: 'Is Semax hormonal?',
        answer:
          'No. The fragment lacks the corticotropic activity of full-length ACTH.',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'Selank 10mg Vial', slug: 'selank-10mg', price: 44.99 },
      { name: 'NAD+ 500mg Vial', slug: 'nad-plus-500mg', price: 89.99 },
    ],
  }),

  buildProduct({
    id: 'selank-10',
    name: 'Selank 10mg Vial',
    slug: 'selank-10mg',
    category: 'Nootropic Peptide',
    brand: 'GhostLabz',
    dosage: '10mg',
    stock: true,
    pricing: { originalPrice: 54.99, salePrice: 44.99, currency: 'USD' },
    rating: { value: 4.5, reviews: 38 },
    images: [{ url: catalog(11), alt: 'Selank 10mg vial' }],
    shortDescription:
      'A synthetic analogue of tuftsin investigated for anxiolytic-like effects and immunomodulation.',
    description: {
      overview:
        'Selank is a heptapeptide developed as a stable analogue of the immunomodulatory peptide tuftsin, studied for anxiolytic and pro-cognitive activity.',
      mechanism:
        'Modulates GABAergic transmission, inhibits enkephalin degradation, and affects expression of monoamine-related genes.',
      researchFindings: [
        'Reduced anxiety-like behaviour in rodent maze studies',
        'Influenced expression of GABA receptor subunits',
        'Modulated cytokine balance in inflammatory models',
      ],
      disclaimer: 'Research compound only.',
    },
    researchApplications: [
      {
        title: 'Anxiolytic Research',
        description: 'Models of generalised anxiety and stress response.',
      },
      {
        title: 'Immunomodulation',
        description: 'Cytokine balance investigations.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'Thr-Lys-Pro-Arg-Pro-Gly-Pro',
        molecularFormula: 'C₃₃H₅₇N₁₁O₉',
        molecularWeight: '751.88 g/mol',
        appearance: 'White lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, dry and dark',
        postReconstitution: 'Refrigerate 2–8°C, use within 30 days',
        shelfLife: '24 months',
        sensitivity: 'Light-sensitive',
      },
      regulatory: {
        fdaStatus: 'Not approved',
        clinicalStatus: 'Approved (Russia, specific indications)',
        wadaStatus: 'Not listed',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.05%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-SELANK-10MG-A',
      labelledAmount: '10mg',
      actualAmount: '9.81mg',
      testDate: '2026-02-25',
    },
    faq: [
      {
        question: 'How does Selank differ from benzodiazepines?',
        answer:
          'It is a peptide modulator rather than a direct GABA-A allosteric ligand.',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'Semax 30mg Vial', slug: 'semax-30mg', price: 49.99 },
      { name: 'NAD+ 500mg Vial', slug: 'nad-plus-500mg', price: 89.99 },
    ],
  }),

  buildProduct({
    id: 'nad-plus-500',
    name: 'NAD+ 500mg Vial',
    slug: 'nad-plus-500mg',
    category: 'Cellular Cofactor',
    brand: 'GhostLabz',
    dosage: '500mg',
    stock: true,
    pricing: { originalPrice: 109.99, salePrice: 89.99, currency: 'USD' },
    rating: { value: 4.8, reviews: 154 },
    images: [{ url: catalog(12), alt: 'NAD+ 500mg vial' }],
    shortDescription:
      'Nicotinamide adenine dinucleotide for research into mitochondrial bioenergetics, sirtuin activity, and longevity.',
    description: {
      overview:
        'NAD+ is a central coenzyme in cellular redox reactions and a substrate for sirtuins and PARP enzymes. Levels decline with age, making it a key target in longevity research.',
      mechanism:
        'Acts as an electron carrier in oxidative phosphorylation and as a co-substrate for SIRT1-7, modulating gene expression, DNA repair, and metabolism.',
      researchFindings: [
        'Boosts sirtuin activity in cell-based assays',
        'Improved mitochondrial function markers in aged tissue models',
        'Enhanced PARP-mediated DNA repair capacity',
      ],
      disclaimer: 'Research compound only.',
    },
    researchApplications: [
      {
        title: 'Longevity Research',
        description: 'Sirtuin activation and metabolic ageing models.',
      },
      {
        title: 'Mitochondrial Studies',
        description: 'Electron transport chain investigations.',
      },
    ],
    compoundProfile: {
      molecularProfile: {
        sequence: 'NAD⁺ (β-Nicotinamide Adenine Dinucleotide)',
        molecularFormula: 'C₂₁H₂₇N₇O₁₄P₂',
        molecularWeight: '663.43 g/mol',
        appearance: 'White lyophilized powder',
        form: 'Lyophilized',
      },
      storage: {
        preReconstitution: 'Store below -20°C, protected from light',
        postReconstitution: 'Refrigerate 2–8°C, use within 14 days',
        shelfLife: '18 months',
        sensitivity: 'Highly sensitive to heat, light, and humidity',
      },
      regulatory: {
        fdaStatus: 'Not approved',
        clinicalStatus: 'Research / supplement (in some forms)',
        wadaStatus: 'Not listed',
        researchUseOnly: true,
      },
    },
    coa: {
      purity: '99.75%',
      lab: 'Freedom Diagnostics',
      lotNumber: 'GLZ-NAD-500MG-A',
      labelledAmount: '500mg',
      actualAmount: '498.2mg',
      testDate: '2026-03-25',
    },
    faq: [
      {
        question: 'What is NAD+ used for in research?',
        answer:
          'Studies of sirtuin biology, mitochondrial function, DNA repair, and longevity.',
      },
      {
        question: 'Is NAD+ heat sensitive?',
        answer:
          'Yes — store frozen and protect from light to preserve the dinucleotide bond.',
      },
    ],
    shipping: standardShipping,
    features: standardFeatures,
    relatedProducts: [
      { name: 'Semax 30mg Vial', slug: 'semax-30mg', price: 49.99 },
      { name: 'GHK-Cu 50mg Vial', slug: 'ghk-cu-50mg', price: 45.0 },
    ],
  }),
];

export const findProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
