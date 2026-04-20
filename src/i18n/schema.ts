export type Locale = "zh-CN" | "en-US";

export const LOCALES = ["zh-CN", "en-US"] as const satisfies readonly Locale[];

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends (...args: infer Args) => infer Result
        ? (...args: Args) => Widen<Result>
        : T extends readonly [unknown, ...unknown[]]
          ? { [K in keyof T]: Widen<T[K]> }
          : T extends readonly (infer Item)[]
            ? readonly Widen<Item>[]
            : T extends object
              ? { [K in keyof T]: Widen<T[K]> }
              : T;

export const baseMessages = {
  app: {
    title: "EML Playground",
    metaDescription:
      "A pure frontend EML playground that brings the paper's core theory, emlib lowering, and D2 SVG rendering into one interface.",
    languageLabel: "Language",
    localeNames: {
      "zh-CN": "Chinese",
      "en-US": "English",
    },
    localeShortLabels: {
      "zh-CN": "中",
      "en-US": "EN",
    },
  },
  hero: {
    pills: ["All elementary functions from a single operator", "Playground"],
    titleLead: "EML as a",
    titleAccent: "Generative Primitive",
    description:
      "This page compresses the paper's core ideas and emlib's capabilities into one frontend interface: it explains why eml(x, y) = exp(x) - ln(y) can be treated as a single primitive in continuous math, then lets you lower expressions into pure EML and render them as SVG structure diagrams.",
    paperNote: {
      label: "Original paper",
      title: "All elementary functions from a single binary operator",
      href: "https://arxiv.org/abs/2603.21852",
      linkLabel: "Read on arXiv",
    },
    stats: [
      {
        label: "Core Operator",
        value: "eml(x, y)",
        description: "exp(x) - ln(y)",
      },
      {
        label: "Unified Grammar",
        value: "S -> 1 | eml(S, S)",
        description:
          "A heterogeneous operator family collapses into a homogeneous tree.",
      },
      {
        label: "Why It Matters",
        value: "Search Space",
        description:
          "Better suited to symbolic regression, compilation, and visualization.",
      },
    ],
    pipeline: {
      eyebrow: "Lowering Pipeline",
      title: "Theory to Interface",
      badge: "docs + emlib",
      steps: [
        {
          title: "Standard Expression",
          text: "Start from an elementary expression such as ln(x), sin(x) + cos(y), or exp(x) - ln(y).",
        },
        {
          title: "Pure EML Tree",
          text: "Use emlib's reduceTypes / toPureEml to collapse the expression into a unified core grammar.",
        },
        {
          title: "D2 SVG Preview",
          text: "Export the AST into D2 and render it directly in the browser as an SVG structure diagram.",
        },
      ],
    },
  },
  highlights: [
    {
      title: "A Single Primitive for Continuous Math",
      text: "The paper treats eml(x, y) = exp(x) - ln(y) as the NAND of the continuous world: one binary operator can recover a large set of elementary functions.",
    },
    {
      title: "Unified Grammar = Unified Search Space",
      text: "Every expression can be lowered into S -> 1 | eml(S, S), turning a diverse function family into isomorphic full binary trees.",
    },
    {
      title: "Complex Intermediate States Are the Point",
      text: "Trigonometric functions, pi, i, and branch behavior rely on the principal branch over complex numbers; that is a source of expressiveness, not a side effect.",
    },
  ],
  summary: {
    paper: {
      title: "Paper Highlights",
      description:
        "The page keeps only the three most important threads from the paper: the existence of a single primitive, the representational value of a unified grammar, and the necessity of complex intermediate states for completeness.",
      formulaLabel: "Core Formula",
      formulaDescription:
        "The paper does not merely glue exp and ln together. It argues that both can live inside one repeatable node that can be copied across a full expression tree.",
      points: [
        {
          title: "1. A continuous-world NAND",
          text: "The real target is a Sheffer primitive for mathematics. The question is not whether one formula looks elegant, but whether repeatedly cloning one binary node can recover a familiar elementary-function basis.",
        },
        {
          title: "2. Unified structure matters more than shorter syntax",
          text: "Pure EML expressions are often not shorter, but they collapse a complex grammar into one tree form, which makes them a better substrate for compilation, search, symbolic regression, and hardware mapping.",
        },
        {
          title:
            "3. Complex numbers and principal branches are not implementation details",
          text: "Recovering trigonometric functions, pi, and i depends on complex logarithms and branch choices, so the playground also verifies numerical consistency with complex-valued semantics.",
        },
      ],
    },
    emlib: {
      title: "emlib in the UI",
      description:
        "This is not a static marketing mock. The page calls the real library features used here: parsing, lowering, numeric verification, and D2 structure export.",
      capabilities: [
        {
          title: "Parse / AST",
          text: "Parse a standard elementary expression into a structured AST that becomes the common entry point for lowering, analysis, and rendering.",
        },
        {
          title: "Reduce To Pure EML",
          text: "Converge the expression into a core form that contains only 1 and eml(...), matching the paper's most important unified grammar.",
        },
        {
          title: "Evaluate & Verify",
          text: "Evaluate the standard expression and the pure EML expression separately, then verify their numeric consistency online.",
        },
      ],
    },
  },
  playground: {
    eyebrow: "Interactive Reduction Studio",
    badge: "parse · lower · verify · render",
    title: "Interactive Playground",
    description:
      "Enter a standard expression and the page will parse it, lower it into pure EML, analyze its complexity, verify numeric consistency, and export the structure as D2 SVG in real time.",
    samples: [
      { label: "Core operator", expr: "exp(x) - ln(y)" },
      { label: "Log expansion", expr: "ln(x)" },
      { label: "Powers", expr: "x^(1/2) + y^2" },
      { label: "Trig", expr: "sin(x) + cos(y)" },
      { label: "Fraction", expr: "(x + 1) / (y - 1)" },
    ],
    expression: {
      label: "Expression",
      placeholder: "e.g. exp(x) - ln(y)",
      hint: "Supports + - * / ^, exp, ln, sqrt, trigonometric / hyperbolic functions, and e / pi / i.",
    },
    controls: {
      diagramModeLabel: "Diagram mode",
      diagramModeOptions: {
        standard: "Standard Tree",
        pure: "Pure EML Tree",
      },
      layoutLabel: "D2 layout",
    },
    variables: {
      title: "Variable values",
      description:
        "Used only for numeric verification and does not affect the structure diagram.",
      empty: "The current expression has no free variables.",
    },
    metrics: {
      standardTitle: "Standard",
      pureTitle: "Pure EML",
      tokenNodeLabel: "tokens / nodes",
      operatorTypeLabel: "operator types",
    },
    lowering: {
      title: "Lowering Result",
      standardExpressionLabel: "Standard Expression",
      pureExpressionLabel: "Pure EML Expression",
    },
    numericCheck: {
      title: "Numeric Consistency Check",
      standardValueLabel: "Standard Value",
      pureValueLabel: "Pure EML Value",
      deltaLabel: "|delta|",
    },
    parseError: ({ detail }: { detail: string }) =>
      `The expression could not be parsed: ${detail}`,
    diagram: {
      eyebrow: "SVG Preview",
      titles: {
        standard: "Standard Expression Tree",
        pure: "Pure EML Tree",
      },
      deferredHint:
        "The D2 runtime loads only when this area gets close to the viewport, keeping the initial JS bundle smaller.",
      loading: "Loading the D2 runtime and generating the SVG...",
      empty:
        "The SVG structure diagram will appear here after you enter an expression.",
      renderError: ({ detail }: { detail: string }) =>
        `The diagram could not be rendered: ${detail}`,
      layoutBadge: ({ layout }: { layout: string }) => `D2 / ${layout}`,
      pureRenderLimitReason: ({
        nodeCount,
        limit,
      }: {
        nodeCount: string;
        limit: string;
      }) =>
        `The current pure EML tree has ${nodeCount} nodes, which exceeds the frontend preview threshold of ${limit}. Switch back to Standard Tree to inspect the structure.`,
      invalidExpressionReason:
        "Fix the expression to restore the diagram preview.",
      previewAriaLabel: ({ mode }: { mode: string }) =>
        `${mode} diagram preview`,
    },
    d2Source: {
      title: "D2 Source",
      copyIdle: "Copy",
      copySuccess: "Copied",
      copyFailed: "Copy failed",
      description:
        "This D2 text is generated by exprToD2. Nodes are visualized as function / variable / constant.",
    },
  },
} as const;

export type MessageDictionary = Widen<typeof baseMessages>;
