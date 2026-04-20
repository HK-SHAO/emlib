import type { MessageDictionary } from "@/i18n/schema";

export const zhCN = {
  app: {
    title: "EML Playground",
    metaDescription:
      "一个纯前端的 EML playground，把论文核心理论、emlib lowering 和 D2 SVG 渲染整合到同一个界面里。",
    languageLabel: "语言",
    localeNames: {
      "zh-CN": "中文",
      "en-US": "English",
    },
    localeShortLabels: {
      "zh-CN": "中",
      "en-US": "EN",
    },
  },
  hero: {
    pills: ["所有初等函数的原子", "Playground"],
    titleLead: "EML as a",
    titleAccent: "Generative Primitive",
    description:
      "这个页面把论文最核心的理论和 emlib 的能力压缩到同一个前端界面里：先解释为什么 eml(x, y) = exp(x) - ln(y) 值得被看成连续数学里的单一原语，再让你直接把表达式 lowering 成纯 EML，并渲染成 SVG 结构图。",
    paperNote: {
      label: "原论文",
      title: "All elementary functions from a single binary operator",
      href: "https://arxiv.org/abs/2603.21852",
      linkLabel: "在 arXiv 阅读",
    },
    stats: [
      {
        label: "核心算子",
        value: "eml(x, y)",
        description: "exp(x) - ln(y)",
      },
      {
        label: "统一语法",
        value: "S -> 1 | eml(S, S)",
        description: "异构运算族被规整成同构树。",
      },
      {
        label: "意义所在",
        value: "Search Space",
        description: "适合符号回归、编译和可视化。",
      },
    ],
    pipeline: {
      eyebrow: "Lowering Pipeline",
      title: "Theory to Interface",
      badge: "docs + emlib",
      steps: [
        {
          title: "标准表达式",
          text: "从 ln(x)、sin(x) + cos(y) 或 exp(x) - ln(y) 这类初等表达式开始。",
        },
        {
          title: "纯 EML 树",
          text: "通过 emlib 的 reduceTypes / toPureEml，把表达式压到统一核心语法上。",
        },
        {
          title: "D2 SVG 预览",
          text: "把 AST 导出成 D2，再直接在浏览器里渲染为 SVG 结构图。",
        },
      ],
    },
  },
  highlights: [
    {
      title: "连续数学里的单一原语",
      text: "论文把 eml(x, y) = exp(x) - ln(y) 类比成连续世界的 NAND，用一个二元算子覆盖大量初等函数。",
    },
    {
      title: "统一语法 = 统一搜索空间",
      text: "所有表达式都可以压成 S -> 1 | eml(S, S)，于是复杂函数族被规整成同构的满二叉树。",
    },
    {
      title: "复数中间过程不是副作用",
      text: "三角函数、pi、i 与分支行为都依赖复数主支；这不是实现噪声，而是表达能力的来源。",
    },
  ],
  summary: {
    paper: {
      title: "论文核心内容",
      description:
        "页面只保留论文里最关键的三层叙事：单一原语的存在性、统一语法的表示论价值，以及复数中间过程对完备性的必要性。",
      formulaLabel: "核心公式",
      formulaDescription:
        "论文不是把 exp 和 ln 生硬拼接，而是主张它们可以被内嵌进一个可重复复制的统一节点里。",
      points: [
        {
          title: "1. 连续世界里的 “NAND”",
          text: "论文要找的是数学里的 Sheffer primitive。重点不在于某条公式漂亮，而在于“一个二元节点反复复制”是否足以恢复常见初等函数基底。",
        },
        {
          title: "2. 统一结构比更短的写法更重要",
          text: "纯 EML 表达式通常并不短，但它把复杂 grammar 压成单一树形，因此更适合编译、搜索、符号回归和硬件映射。",
        },
        {
          title: "3. 复数与主支不是实现细节",
          text: "三角函数、pi 和 i 的恢复依赖复数对数和 branch choice，所以 playground 也把数值校验建立在复数语义之上。",
        },
      ],
    },
    emlib: {
      title: "emlib 可视化能力",
      description:
        "这里展示的不是静态宣传，而是页面真实调用到的库能力：解析、lowering、数值校验与 D2 结构图导出。",
      capabilities: [
        {
          title: "Parse / AST",
          text: "把标准初等表达式解析成结构化 AST，作为 lowering、分析和渲染的统一入口。",
        },
        {
          title: "Reduce To Pure EML",
          text: "把表达式收敛到只包含 1 和 eml(...) 的核心表示，直接对应论文最关键的统一语法。",
        },
        {
          title: "Evaluate & Verify",
          text: "分别求标准表达式和纯 EML 表达式的值，并在线检查 lowering 前后的数值一致性。",
        },
      ],
    },
  },
  playground: {
    eyebrow: "交互式 Reduction Studio",
    badge: "解析 · lowering · 校验 · 渲染",
    title: "在线 Playground",
    description:
      "输入一个标准表达式，页面会实时完成 parsing、pure EML lowering、复杂度分析、数值一致性校验，并把结构导出为 D2 SVG。",
    samples: [
      { label: "核心算子", expr: "exp(x) - ln(y)" },
      { label: "对数展开", expr: "ln(x)" },
      { label: "乘幂", expr: "x^(1/2) + y^2" },
      { label: "三角函数", expr: "sin(x) + cos(y)" },
      { label: "分式结构", expr: "(x + 1) / (y - 1)" },
    ],
    expression: {
      label: "输入表达式",
      placeholder: "例如: exp(x) - ln(y)",
      hint: "支持 + - * / ^、exp、ln、sqrt、三角 / 双曲函数以及 e / pi / i。",
    },
    controls: {
      diagramModeLabel: "图模式",
      diagramModeOptions: {
        standard: "Standard Tree",
        pure: "Pure EML Tree",
      },
      layoutLabel: "D2 Layout",
    },
    variables: {
      title: "变量取值",
      description: "只用于数值校验，不影响结构图。",
      empty: "当前表达式没有自由变量。",
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
      title: "数值一致性校验",
      standardValueLabel: "Standard Value",
      pureValueLabel: "Pure EML Value",
      deltaLabel: "|delta|",
    },
    parseError: ({ detail }: { detail: string }) =>
      `表达式暂时无法解析：${detail}`,
    diagram: {
      eyebrow: "SVG Preview",
      titles: {
        standard: "Standard Expression Tree",
        pure: "Pure EML Tree",
      },
      deferredHint:
        "预览区接近视口后才会异步加载 D2 运行时，避免把首屏 JS 包得过大。",
      loading: "正在异步加载 D2 并生成 SVG...",
      empty: "输入表达式后会在这里显示 SVG 结构图。",
      renderError: ({ detail }: { detail: string }) =>
        `结构图渲染失败：${detail}`,
      layoutBadge: ({ layout }: { layout: string }) => `D2 / ${layout}`,
      pureRenderLimitReason: ({
        nodeCount,
        limit,
      }: {
        nodeCount: string;
        limit: string;
      }) =>
        `当前纯 EML 树有 ${nodeCount} 个节点，超过前端预览阈值 ${limit}。可切回 Standard Tree 查看结构。`,
      invalidExpressionReason: "修正表达式后即可恢复图渲染。",
      previewAriaLabel: ({ mode }: { mode: string }) => `${mode} 图预览`,
    },
    d2Source: {
      title: "D2 Source",
      copyIdle: "复制",
      copySuccess: "已复制",
      copyFailed: "复制失败",
      description:
        "这段 D2 文本由 exprToD2 生成，节点按 function / variable / constant 三类可视化。",
    },
  },
} satisfies MessageDictionary;
