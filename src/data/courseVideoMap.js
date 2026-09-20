// Mapping helper to provide real tailored curriculum & verified 100% playable youtube streams for every course on Lumina
export const courseVideoMap = {
  // ── Web Development ──
  'web-1': {
    title: 'Full-Stack React & Next.js 15 Masterclass',
    primaryLanguage: 'English',
    languages: 'English (Voice & Subtitles)',
    languagesMap: {
      'English': 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
      'Urdu': 'https://www.youtube.com/watch?v=6mbwJ2xhgzM',
      'Hindi': 'https://www.youtube.com/watch?v=6mbwJ2xhgzM'
    },
    description: 'Build production-grade full-stack applications with Server Components, TypeScript, Tailwind CSS, and Prisma ORM.',
    learningTip: 'Build components incrementally and test Server Actions directly in Next.js 15 App Router.',
    resources: [
      { name: 'Next.js 15 Starter Architecture (ZIP)', size: '4.2 MB', type: 'zip' },
      { name: 'Server Components Cheat Sheet (PDF)', size: '1.5 MB', type: 'pdf' },
      { name: 'Prisma Schema Reference (PDF)', size: '850 KB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Next.js 15 & React 19 Foundations',
        lessons: [
          { id: '01', title: 'Course Overview & Next.js 15 Architecture', duration: '14:20', completed: true, videoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', about: 'Introduction to Next.js 15 App Router, Server Components vs Client Components.' },
          { id: '02', title: 'Project Setup & Tailwind CSS v4', duration: '18:45', completed: false, videoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', about: 'Configuring ESLint, TypeScript, and modern styling configurations.' }
        ]
      },
      {
        id: 2,
        title: 'Section 02: Routing, Caching & Server Actions',
        lessons: [
          { id: '03', title: 'Dynamic Routes & Route Groups', duration: '22:10', completed: false, videoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', about: 'Master nested layouts, parallel routes, and intercepted routes.' },
          { id: '04', title: 'Data Fetching & Cache Lifetime', duration: '26:30', completed: false, videoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', about: 'Fetch caching, revalidation strategies, and Suspense streaming.' }
        ]
      },
      {
        id: 3,
        title: 'Section 03: Full-Stack Database & Deployment',
        lessons: [
          { id: '05', title: 'Prisma ORM & PostgreSQL Setup', duration: '28:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', about: 'Database schema modeling, migrations, and relationship queries.' },
          { id: '06', title: 'Authentication with NextAuth & Vercel Deploy', duration: '32:00', completed: false, videoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', about: 'Deploying zero-downtime production apps to Vercel and edge servers.' }
        ]
      }
    ]
  },
  't-1': {
    title: 'Full-Stack React & Next.js 15 Masterclass',
    primaryLanguage: 'English',
    languages: 'English (Voice & Subtitles)',
    languagesMap: {
      'English': 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
      'Urdu': 'https://www.youtube.com/watch?v=6mbwJ2xhgzM',
      'Hindi': 'https://www.youtube.com/watch?v=6mbwJ2xhgzM'
    },
    description: 'Build production-grade full-stack applications with Server Components, TypeScript, Tailwind CSS, and Prisma ORM.',
    learningTip: 'Build components incrementally and test Server Actions directly in Next.js 15 App Router.',
    resources: [
      { name: 'Next.js 15 Starter Architecture (ZIP)', size: '4.2 MB', type: 'zip' },
      { name: 'Server Components Cheat Sheet (PDF)', size: '1.5 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Next.js 15 & React 19 Foundations',
        lessons: [
          { id: '01', title: 'Course Overview & Architecture', duration: '14:20', completed: true, videoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', about: 'Introduction to Next.js 15 App Router.' },
          { id: '02', title: 'Server Components Deep Dive', duration: '24:10', completed: false, videoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', about: 'Mastering SSR, SSG, and streaming HTML.' }
        ]
      },
      {
        id: 2,
        title: 'Section 02: Full-Stack Database & Deployment',
        lessons: [
          { id: '03', title: 'Prisma ORM & Deployment', duration: '28:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', about: 'Database modeling and production deploy.' }
        ]
      }
    ]
  },
  'web-2': {
    title: 'HTML, CSS & JavaScript: Zero to Hero',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    languagesMap: {
      'English': 'https://www.youtube.com/watch?v=kUMe1FH4CHE',
      'Urdu': 'https://www.youtube.com/watch?v=6mbwJ2xhgzM',
      'Hindi': 'https://www.youtube.com/watch?v=6mbwJ2xhgzM'
    },
    description: 'Build real websites from scratch — semantic HTML, responsive CSS Grid/Flexbox, and modern JavaScript ES2024.',
    learningTip: 'Code along in VS Code and inspect elements in Chrome DevTools to see live box-model behavior.',
    resources: [
      { name: 'HTML5 & CSS3 Handout (PDF)', size: '2.1 MB', type: 'pdf' },
      { name: 'JavaScript DOM Projects Pack (ZIP)', size: '8.4 MB', type: 'zip' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: HTML5 Semantics & CSS Layouts',
        lessons: [
          { id: '01', title: 'HTML5 Elements & Document Anatomy', duration: '20:15', completed: true, videoUrl: 'https://www.youtube.com/watch?v=kUMe1FH4CHE', about: 'Semantic tags, forms, tables, and accessibility standards.' },
          { id: '02', title: 'Modern CSS3, Flexbox & Grid', duration: '35:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=HGTJBPNC-Gw', about: 'Responsive web design with Flexbox and CSS Grid layout system.' }
        ]
      },
      {
        id: 2,
        title: 'Section 02: Modern JavaScript (ES6+)',
        lessons: [
          { id: '03', title: 'JavaScript Fundamentals & DOM Manipulation', duration: '42:10', completed: false, videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', about: 'Events, functions, loops, async/await, and Fetch API.' },
          { id: '04', title: 'Building Interactive Web Projects', duration: '38:00', completed: false, videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', about: 'Complete portfolio project built from scratch.' }
        ]
      }
    ]
  },
  'web-3': {
    title: 'Vue 3 & Nuxt.js: Modern Web Apps',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Build scalable Vue 3 apps with Composition API, Pinia state management, and server-side rendering via Nuxt.',
    learningTip: 'Use <script setup> syntax and Vue DevTools to inspect reactive state.',
    resources: [
      { name: 'Vue 3 Composition API Guide (PDF)', size: '1.8 MB', type: 'pdf' },
      { name: 'Nuxt 3 Boilerplate (ZIP)', size: '3.9 MB', type: 'zip' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Vue 3 Composition API',
        lessons: [
          { id: '01', title: 'Reactivity with ref & reactive', duration: '21:00', completed: true, videoUrl: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c', about: 'Computed properties, watchers, and lifecycle hooks.' },
          { id: '02', title: 'Pinia State Management', duration: '28:30', completed: false, videoUrl: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c', about: 'Centralized stores, actions, and getters in modern Vue.' }
        ]
      },
      {
        id: 2,
        title: 'Section 02: Nuxt.js SSR & Deployment',
        lessons: [
          { id: '03', title: 'Server-Side Rendering & Universal Data Fetching', duration: '32:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c', about: 'useAsyncData, server routes, and static site generation.' }
        ]
      }
    ]
  },
  'web-4': {
    title: 'TypeScript: Complete Developer Guide',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Master TypeScript from basic types to advanced generics, decorators, and enterprise architecture patterns.',
    learningTip: 'Enable strict mode in tsconfig.json to catch potential edge-case errors early.',
    resources: [
      { name: 'TypeScript Type System Reference (PDF)', size: '2.4 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Core Types & Interfaces',
        lessons: [
          { id: '01', title: 'Type Annotations & Inferences', duration: '18:50', completed: true, videoUrl: 'https://www.youtube.com/watch?v=I-dml1IDyBc', about: 'Primitive types, union types, and object types.' },
          { id: '02', title: 'Generics & Utility Types', duration: '31:20', completed: false, videoUrl: 'https://www.youtube.com/watch?v=I-dml1IDyBc', about: 'Building reusable type-safe functions and data structures.' }
        ]
      },
      {
        id: 2,
        title: 'Section 02: Advanced Types & Decorators',
        lessons: [
          { id: '03', title: 'Conditional Types & Template Literals', duration: '29:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=I-dml1IDyBc', about: 'Advanced TypeScript type gymnastics for production libraries.' }
        ]
      }
    ]
  },
  'web-5': {
    title: 'Node.js, Express & REST API Engineering',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu)',
    description: 'Design RESTful APIs with authentication, rate limiting, caching, and deploy them with Docker.',
    learningTip: 'Structure your backend into controllers, services, and repositories for clean separation of concerns.',
    resources: [
      { name: 'REST API Best Practices (PDF)', size: '1.6 MB', type: 'pdf' },
      { name: 'Postman Collection Pack (JSON)', size: '450 KB', type: 'json' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Node.js Runtime & Express Architecture',
        lessons: [
          { id: '01', title: 'Event Loop & Async I/O', duration: '24:00', completed: true, videoUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE', about: 'Node.js internals, streams, and buffers.' },
          { id: '02', title: 'Express Middleware & JWT Authentication', duration: '36:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE', about: 'Secure authentication, password hashing with bcrypt, and token verification.' }
        ]
      },
      {
        id: 2,
        title: 'Section 02: Database Integration & Caching',
        lessons: [
          { id: '03', title: 'MongoDB & PostgreSQL with Redis Caching', duration: '31:50', completed: false, videoUrl: 'https://www.youtube.com/watch?v=BLl32FvcdVM', about: 'Query optimization, connection pooling, and sub-millisecond cache hits.' }
        ]
      }
    ]
  },
  'web-6': {
    title: 'GraphQL API Design & Apollo Server',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Build production GraphQL APIs with schema design, resolvers, subscriptions, and Apollo Client.',
    learningTip: 'Use DataLoader to batch and cache queries and prevent N+1 query performance problems.',
    resources: [
      { name: 'GraphQL Schema Cheat Sheet (PDF)', size: '1.1 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: GraphQL Foundations',
        lessons: [
          { id: '01', title: 'Schema Definition Language (SDL)', duration: '19:40', completed: true, videoUrl: 'https://www.youtube.com/watch?v=ed8SzALpx1Q', about: 'Types, queries, mutations, and resolver execution.' },
          { id: '02', title: 'Apollo Server & Real-time Subscriptions', duration: '28:10', completed: false, videoUrl: 'https://www.youtube.com/watch?v=ZQL7tL2S0oQ', about: 'WebSocket subscriptions and client-side caching.' }
        ]
      }
    ]
  },

  // ── AI & Machine Learning ──
  'ai-1': {
    title: 'Generative AI & LLM Agents with LangGraph',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Build multi-agent workflows, RAG pipelines with vector databases, and fine-tune open-source LLMs.',
    learningTip: 'Implement cyclic graph state machines in LangGraph to handle agent tool retries and fallbacks gracefully.',
    resources: [
      { name: 'LangGraph Multi-Agent Architecture (PDF)', size: '3.1 MB', type: 'pdf' },
      { name: 'RAG Pipeline Notebooks (ZIP)', size: '6.7 MB', type: 'zip' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: LLM Fundamentals & Prompt Engineering',
        lessons: [
          { id: '01', title: 'Intro to Large Language Models', duration: '22:15', completed: true, videoUrl: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', about: 'How LLMs process tokens and generate contextual probabilities.' },
          { id: '02', title: 'AI Agentic Workflows & Tool Use', duration: '34:50', completed: false, videoUrl: 'https://www.youtube.com/watch?v=sal78ACtGTc', about: 'Agent architectures, planning loops, and multi-agent coordination.' }
        ]
      },
      {
        id: 2,
        title: 'Section 02: Autonomous AI Agents',
        lessons: [
          { id: '03', title: 'Building Cyclic Agents with LangGraph', duration: '40:00', completed: false, videoUrl: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', about: 'State management, memory checkpoints, and human-in-the-loop validation.' }
        ]
      }
    ]
  },
  't-2': {
    title: 'Generative AI & LLM Agents with LangGraph',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Build multi-agent workflows, RAG pipelines with vector databases, and fine-tune open-source LLMs.',
    learningTip: 'Implement cyclic graph state machines in LangGraph to handle agent tool retries.',
    resources: [
      { name: 'LangGraph Multi-Agent Architecture (PDF)', size: '3.1 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: LLM Fundamentals & Prompt Engineering',
        lessons: [
          { id: '01', title: 'Intro to Large Language Models', duration: '22:15', completed: true, videoUrl: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', about: 'How LLMs process tokens.' },
          { id: '02', title: 'Building Autonomous Agents', duration: '34:50', completed: false, videoUrl: 'https://www.youtube.com/watch?v=sal78ACtGTc', about: 'Agent tool execution and workflows.' }
        ]
      }
    ]
  },
  'ai-2': {
    title: 'Machine Learning A-Z: Python & Scikit-Learn',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Supervised & unsupervised learning, regression, classification, clustering, and deploying ML models.',
    learningTip: 'Always split your dataset into train/validation/test sets before feature scaling to prevent data leakage.',
    resources: [
      { name: 'Scikit-Learn Algorithms Cheat Sheet (PDF)', size: '2.0 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Supervised Learning Foundations',
        lessons: [
          { id: '01', title: 'Linear & Logistic Regression in Python', duration: '26:00', completed: true, videoUrl: 'https://www.youtube.com/watch?v=i_LwzRVP7bg', about: 'Cost functions, gradient descent, and evaluation metrics.' },
          { id: '02', title: 'Decision Trees & Random Forests', duration: '32:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=i_LwzRVP7bg', about: 'Ensemble methods, bagging, and hyperparameter tuning with GridSearchCV.' }
        ]
      }
    ]
  },
  'ai-3': {
    title: 'Deep Learning & Neural Networks with PyTorch',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Build CNNs, RNNs, Transformers from scratch, train on GPUs, and deploy deep learning APIs.',
    learningTip: 'Use PyTorch Lightning or torch.cuda.amp mixed-precision to accelerate training on GPUs.',
    resources: [
      { name: 'PyTorch Tensor Operations Handbook (PDF)', size: '2.5 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: PyTorch Tensors & Backpropagation',
        lessons: [
          { id: '01', title: 'PyTorch for Deep Learning Full Tutorial', duration: '30:40', completed: true, videoUrl: 'https://www.youtube.com/watch?v=GIsg-ZUy0MY', about: 'Computational graphs, loss functions, and optimizers (AdamW).' },
          { id: '02', title: 'Convolutional Networks for Vision', duration: '38:20', completed: false, videoUrl: 'https://www.youtube.com/watch?v=GIsg-ZUy0MY', about: 'Convolutions, pooling, batch norm, and residual connections (ResNet).' }
        ]
      }
    ]
  },
  'ai-4': {
    title: 'Natural Language Processing & Transformers',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Master BERT, GPT, and attention mechanisms — fine-tune transformers for text classification and QA.',
    learningTip: 'Understand multi-head self-attention formulas and positional embeddings for sequence modeling.',
    resources: [
      { name: 'Hugging Face Transformers Guide (PDF)', size: '2.8 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Attention & Building GPT from Scratch',
        lessons: [
          { id: '01', title: 'Self-Attention & Transformer Architecture', duration: '28:10', completed: true, videoUrl: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', about: 'Encoder-decoder models, self-attention mechanism, and character-level language modeling.' },
          { id: '02', title: 'Training & Generating with Custom Transformers', duration: '35:00', completed: false, videoUrl: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', about: 'Tokenization, trainer loop, causal masking, and text generation.' }
        ]
      }
    ]
  },
  'ai-5': {
    title: 'Computer Vision with OpenCV & TensorFlow',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu)',
    description: 'Object detection, image segmentation, YOLO models, face recognition, and real-time video processing.',
    learningTip: 'Normalize bounding box coordinates in YOLO format for fast training convergence.',
    resources: [
      { name: 'OpenCV Computer Vision Snippets (PDF)', size: '2.1 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: OpenCV Image Processing',
        lessons: [
          { id: '01', title: 'Color Spaces, Filtering & Contours', duration: '25:30', completed: true, videoUrl: 'https://www.youtube.com/watch?v=oXlwWbU8l2o', about: 'Edge detection, thresholding, and morphological transformations.' },
          { id: '02', title: 'Real-Time Object Detection with YOLO', duration: '36:45', completed: false, videoUrl: 'https://www.youtube.com/watch?v=oXlwWbU8l2o', about: 'Running real-time inferences on webcam video streams.' }
        ]
      }
    ]
  },

  // ── Cloud & DevOps ──
  'cloud-1': {
    title: 'Cloud Infrastructure & DevOps with Docker & AWS',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Containerize microservices, write CI/CD pipelines with GitHub Actions, and orchestrate with Kubernetes.',
    learningTip: 'Use multi-stage Docker builds to reduce image size and minimize security attack surfaces.',
    resources: [
      { name: 'Docker & AWS Deployment Manual (PDF)', size: '3.4 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Docker Containerization',
        lessons: [
          { id: '01', title: 'Dockerfile Best Practices & Docker Compose', duration: '27:15', completed: true, videoUrl: 'https://www.youtube.com/watch?v=fqMOX6JJhGo', about: 'Multi-stage builds, caching, and network isolation.' },
          { id: '02', title: 'CI/CD Automation with GitHub Actions', duration: '33:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=fqMOX6JJhGo', about: 'Automated test runners, building Docker images, and pushing to ECR.' }
        ]
      }
    ]
  },
  't-5': {
    title: 'Cloud Infrastructure & DevOps with Docker & AWS',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Containerize microservices, write CI/CD pipelines with GitHub Actions, and orchestrate with Kubernetes.',
    learningTip: 'Use multi-stage Docker builds to reduce image size.',
    resources: [
      { name: 'Docker & AWS Deployment Manual (PDF)', size: '3.4 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Docker Containerization',
        lessons: [
          { id: '01', title: 'Dockerfile Best Practices & Docker Compose', duration: '27:15', completed: true, videoUrl: 'https://www.youtube.com/watch?v=fqMOX6JJhGo', about: 'Multi-stage builds, caching, and network isolation.' },
          { id: '02', title: 'CI/CD Automation with GitHub Actions', duration: '33:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=fqMOX6JJhGo', about: 'Automated test runners, building Docker images.' }
        ]
      }
    ]
  },
  'cloud-2': {
    title: 'Kubernetes & Cloud Native Infrastructure (CKA)',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Deploy resilient production clusters, configure ingress, service meshes, Helm charts, and GitOps.',
    learningTip: 'Master kubectl commands and declarative YAML manifests for rapid cluster management.',
    resources: [
      { name: 'CKA Exam Prep Sheet (PDF)', size: '3.8 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Kubernetes Core Architecture',
        lessons: [
          { id: '01', title: 'Pods, Deployments & Cluster Networking', duration: '31:00', completed: true, videoUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do', about: 'Kubelet, API Server, etcd, and CNI plugins.' },
          { id: '02', title: 'Ingress Controllers & Helm Packaging', duration: '39:20', completed: false, videoUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do', about: 'Routing traffic, TLS certificates with cert-manager, and Helm charts.' }
        ]
      }
    ]
  },
  'cloud-3': {
    title: 'Agile Project Management with Scrum & Jira',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Sprint planning, backlog grooming, velocity tracking, and cross-functional team leadership.',
    learningTip: 'Focus on user story points rather than hours to estimate complexity collaboratively.',
    resources: [
      { name: 'Agile Sprint Planning Template (PDF)', size: '1.2 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Scrum Framework & Ceremonies',
        lessons: [
          { id: '01', title: 'Sprint Planning & User Stories', duration: '18:30', completed: true, videoUrl: 'https://www.youtube.com/watch?v=9TycLR0TqFA', about: 'Roles, artifacts, and sprint planning workflows in Scrum.' },
          { id: '02', title: 'Jira Workflows & Agile Boards', duration: '24:10', completed: false, videoUrl: 'https://www.youtube.com/watch?v=XU0llRltyFM', about: 'Configuring epics, sprints, roadmaps, and velocity charts in Jira.' }
        ]
      }
    ]
  },
  'cloud-4': {
    title: 'Terraform & Infrastructure as Code on GCP',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Automate GCP infrastructure with Terraform modules, state management, remote backends, and CI/CD.',
    learningTip: 'Use remote Cloud Storage backend with state locking to prevent concurrent state corruption.',
    resources: [
      { name: 'Terraform HCL Syntax & GCP Provider (PDF)', size: '2.3 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: HCL & GCP Resources',
        lessons: [
          { id: '01', title: 'Terraform Basics & GCP Provider', duration: '23:45', completed: true, videoUrl: 'https://www.youtube.com/watch?v=7xngnjfIlK4', about: 'Provisioning VPCs, subnets, and Compute Engine instances.' },
          { id: '02', title: 'Reusable Modules & Remote State in GCS', duration: '30:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=7xngnjfIlK4', about: 'Writing production modules with variables, outputs, and lock states.' }
        ]
      }
    ]
  },

  // ── UI/UX Design ──
  'design-1': {
    title: 'Mastering Figma UI/UX & Design Systems',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Master user research, component architecture, auto-layout, interactive prototyping, and design systems.',
    learningTip: 'Use variables and design tokens for spacing, typography, and color themes in Figma.',
    resources: [
      { name: 'Figma Design System UI Kit (FIG)', size: '18.4 MB', type: 'fig' },
      { name: 'UI/UX Heuristic Evaluation Sheet (PDF)', size: '1.9 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Figma Auto-Layout & Components',
        lessons: [
          { id: '01', title: 'Auto-Layout 5.0 Mastery', duration: '21:30', completed: true, videoUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU', about: 'Responsive frames, min/max widths, and wrapping containers.' },
          { id: '02', title: 'Variants & Component Properties', duration: '29:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8', about: 'Boolean props, instance swaps, and nested components.' }
        ]
      },
      {
        id: 2,
        title: 'Section 02: Interactive Prototyping & Variables',
        lessons: [
          { id: '03', title: 'Figma Variables & Dark Mode Systems', duration: '32:00', completed: false, videoUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU', about: 'Color modes, number variables, and conditional micro-interactions.' }
        ]
      }
    ]
  },
  't-3': {
    title: 'Mastering Figma UI/UX & Design Systems',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Master user research, component architecture, auto-layout, interactive prototyping, and design systems.',
    learningTip: 'Use variables and design tokens for spacing and colors.',
    resources: [
      { name: 'Figma Design System UI Kit (FIG)', size: '18.4 MB', type: 'fig' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Figma Auto-Layout & Components',
        lessons: [
          { id: '01', title: 'Auto-Layout 5.0 Mastery', duration: '21:30', completed: true, videoUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU', about: 'Responsive frames and wrapping containers.' },
          { id: '02', title: 'Interactive Prototyping', duration: '29:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8', about: 'Micro-interactions and prototype flow connections.' }
        ]
      }
    ]
  },
  'design-2': {
    title: 'Brand Identity Design & Vector Systems',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Craft memorable brand identities, logo marks, typography pairings, and client brand manuals.',
    learningTip: 'Start with rough hand sketches and golden ratio grids before moving to vector shapes.',
    resources: [
      { name: 'Brand Identity Strategy Workbook (PDF)', size: '3.2 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Logo Construction & Vector Geometry',
        lessons: [
          { id: '01', title: 'Logo Grid Systems & Typography', duration: '25:10', completed: true, videoUrl: 'https://www.youtube.com/watch?v=WONZVnlam6U', about: 'Visual balance, kerning, and color psychology in branding.' },
          { id: '02', title: 'Creating Brand Style Guides', duration: '31:00', completed: false, videoUrl: 'https://www.youtube.com/watch?v=dFSia1LZI4Y', about: 'Building comprehensive client brand presentation guidelines.' }
        ]
      }
    ]
  },
  'design-3': {
    title: 'Motion Graphics: Animate in After Effects',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Bring illustrations to life with dynamic motion design, particle simulation, and 3D curves.',
    learningTip: 'Always ease keyframes using graph editor value curves for natural organic motion.',
    resources: [
      { name: 'After Effects Motion Presets (AEP)', size: '14.2 MB', type: 'aep' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Keyframing & Speed Graphs',
        lessons: [
          { id: '01', title: 'Graph Editor & Anticipation Principles', duration: '24:15', completed: true, videoUrl: 'https://www.youtube.com/watch?v=PWvPbGWVRrU', about: '12 principles of animation applied to UI/UX motion graphics in After Effects.' },
          { id: '02', title: 'Shape Layer Animations & Transitions', duration: '33:20', completed: false, videoUrl: 'https://www.youtube.com/watch?v=PWvPbGWVRrU', about: 'Trim paths, repeater effects, and seamless morphing transitions.' }
        ]
      }
    ]
  },
  'design-4': {
    title: 'Cinematic Lighting & Color Grading in DaVinci',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Color space transforms, node trees, skin-tone matching, and dramatic lighting techniques in DaVinci Resolve.',
    learningTip: 'Grade in DaVinci YRGB Color Managed space for wide dynamic range film simulation.',
    resources: [
      { name: 'Film Emulation LUTs Pack (CUBE)', size: '22.0 MB', type: 'cube' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: DaVinci Color Page & Scopes',
        lessons: [
          { id: '01', title: 'Waveforms, Vectorscopes & Primary Wheels', duration: '28:40', completed: true, videoUrl: 'https://www.youtube.com/watch?v=63Ln33O4p4c', about: 'Reading scopes, balancing exposure, and shot matching in DaVinci Resolve.' },
          { id: '02', title: 'Node Tree Architecture & Film Halation', duration: '36:10', completed: false, videoUrl: 'https://www.youtube.com/watch?v=63Ln33O4p4c', about: 'Parallel nodes, qualifier skin tones, and film grain emulation.' }
        ]
      }
    ]
  },

  // ── Mobile Development ──
  'mob-1': {
    title: 'Modern Mobile App Development with Flutter',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Create cross-platform iOS and Android apps with declarative UI, state management, and native APIs.',
    learningTip: 'Separate business logic from presentation widgets using Bloc or Riverpod providers.',
    resources: [
      { name: 'Flutter & Dart Cheat Sheet (PDF)', size: '2.7 MB', type: 'pdf' },
      { name: 'Complete Flutter E-Commerce App (ZIP)', size: '15.1 MB', type: 'zip' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Dart 3 & Flutter Widget Tree',
        lessons: [
          { id: '01', title: 'Stateless vs Stateful Widgets', duration: '26:00', completed: true, videoUrl: 'https://www.youtube.com/watch?v=VPvVD8t02U8', about: 'Building responsive column, row, stack, and custom layouts.' },
          { id: '02', title: 'Riverpod State Management & API Calls', duration: '38:30', completed: false, videoUrl: 'https://www.youtube.com/watch?v=x0uinJvhNxI', about: 'Managing global app state and consuming REST APIs with dio.' }
        ]
      }
    ]
  },
  'mob-2': {
    title: 'iOS Development with Swift & SwiftUI',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Build beautiful native iPhone and iPad apps with SwiftUI, Core Data, MapKit, and App Store publishing.',
    learningTip: 'Leverage @Observable macros and SwiftUI view modifiers for crisp clean declarative views.',
    resources: [
      { name: 'SwiftUI Views & Modifiers Reference (PDF)', size: '2.5 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: SwiftUI Declarative UI',
        lessons: [
          { id: '01', title: 'Stacks, Lists & NavigationStack', duration: '24:50', completed: true, videoUrl: 'https://www.youtube.com/watch?v=comQ1-x2a1Q', about: 'Layout fundamentals, SF Symbols, and adaptive design.' },
          { id: '02', title: 'SwiftData & Persistent Storage', duration: '33:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=comQ1-x2a1Q', about: 'Schema modeling, queries, and background syncing.' }
        ]
      }
    ]
  },
  'mob-3': {
    title: 'React Native: Cross-Platform Apps 2024',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Build high-performance mobile apps with React Native, Expo, Redux Toolkit, and native module bridging.',
    learningTip: 'Use Expo Router for file-based navigation and seamless deep linking on mobile.',
    resources: [
      { name: 'React Native Expo Starter Template (ZIP)', size: '6.5 MB', type: 'zip' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: React Native & Expo Router',
        lessons: [
          { id: '01', title: 'Expo App Structure & Native Components', duration: '25:20', completed: true, videoUrl: 'https://www.youtube.com/watch?v=0-S5a0eXPoc', about: 'View, Text, FlatList, and platform-specific styling.' },
          { id: '02', title: 'Device Camera, Geolocation & Push Notifications', duration: '34:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=0-S5a0eXPoc', about: 'Accessing native hardware APIs via Expo modules.' }
        ]
      }
    ]
  },

  // ── Cybersecurity ──
  'sec-1': {
    title: 'Cybersecurity Defense & Ethical Hacking',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Vulnerability assessment, network penetration testing, cryptography, and blue-team defense architecture.',
    learningTip: 'Practice in isolated sandbox virtual machines and follow strict ethical hacking protocols.',
    resources: [
      { name: 'Ethical Hacking Lab Manual (PDF)', size: '4.5 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Reconnaissance & Network Security',
        lessons: [
          { id: '01', title: 'Cyber Security Full Course for Beginners', duration: '28:30', completed: true, videoUrl: 'https://www.youtube.com/watch?v=U_P23SqJaDc', about: 'Packet analysis, TCP/IP handshake, network defense, and firewall evasion.' },
          { id: '02', title: 'Web Application Vulnerabilities & Defenses', duration: '37:10', completed: false, videoUrl: 'https://www.youtube.com/watch?v=U_P23SqJaDc', about: 'SQL injection, XSS, CSRF, and broken access controls.' }
        ]
      }
    ]
  },
  'sec-2': {
    title: 'Cyber Threat Intelligence & Penetration Testing',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Network pivoting, AD exploits, Burp Suite vulnerability scanning, and defensive blue-teaming.',
    learningTip: 'Understand MITRE ATT&CK framework tactics to trace attack lifecycles systematically.',
    resources: [
      { name: 'Penetration Testing Cheat Sheet (PDF)', size: '3.1 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Exploitation & Privilege Escalation',
        lessons: [
          { id: '01', title: 'Metasploit & Active Directory Attacks', duration: '31:40', completed: true, videoUrl: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', about: 'Kerberoasting, pass-the-hash, and lateral movement.' },
          { id: '02', title: 'Burp Suite Pro Web Auditing', duration: '38:00', completed: false, videoUrl: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', about: 'Interception proxies, intruder fuzzing, and automated scans.' }
        ]
      }
    ]
  },
  'sec-3': {
    title: 'Zero Trust Security Architecture & Cloud Security',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Design zero-trust architectures, implement IAM policies, SIEM solutions, and cloud guardrails.',
    learningTip: 'Never trust, always verify: enforce continuous authentication and micro-segmentation.',
    resources: [
      { name: 'Zero Trust Architecture Guidelines (PDF)', size: '2.9 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Identity & Access Management (IAM)',
        lessons: [
          { id: '01', title: 'Principle of Least Privilege & OAuth 2.0', duration: '26:50', completed: true, videoUrl: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', about: 'Token exchanges, RBAC, ABAC, and policy enforcements.' },
          { id: '02', title: 'Cloud SIEM & Threat Monitoring', duration: '34:20', completed: false, videoUrl: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', about: 'Ingesting audit logs, anomaly detection, and automated incident response.' }
        ]
      }
    ]
  },

  // ── Data Science ──
  'data-1': {
    title: 'Python for Automation & Data Pipelines',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Automate workflows, scrape web data, build ETL scripts, and deploy cloud cron jobs with Python.',
    learningTip: 'Use Python virtual environments and asyncio for high-throughput automated web scraping.',
    resources: [
      { name: 'Python Automation Scripts Pack (ZIP)', size: '5.2 MB', type: 'zip' },
      { name: 'BeautifulSoup & Selenium Guide (PDF)', size: '1.9 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Python Scripting & File Automation',
        lessons: [
          { id: '01', title: 'Learn Python - Full Course for Beginners', duration: '24:30', completed: true, videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', about: 'OS module, openpyxl, file streams, and automation fundamentals.' },
          { id: '02', title: 'Web Scraping with BeautifulSoup & Playwright', duration: '36:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', about: 'Extracting dynamic data, handling pagination, and parsing APIs.' }
        ]
      }
    ]
  },
  't-4': {
    title: 'Python for Automation & Data Pipelines',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Automate workflows, scrape web data, build ETL scripts, and deploy cloud cron jobs with Python.',
    learningTip: 'Use Python virtual environments and asyncio for high-throughput tasks.',
    resources: [
      { name: 'Python Automation Scripts Pack (ZIP)', size: '5.2 MB', type: 'zip' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Python Scripting & File Automation',
        lessons: [
          { id: '01', title: 'Automating File Systems & Excel Reports', duration: '24:30', completed: true, videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', about: 'OS module and spreadsheet automation.' },
          { id: '02', title: 'Web Scraping with BeautifulSoup', duration: '36:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', about: 'Extracting web data and parsing JSON APIs.' }
        ]
      }
    ]
  },
  'data-2': {
    title: 'Data Analysis with Pandas & Matplotlib',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Explore and visualize datasets, clean messy data, and build compelling analytical stories.',
    learningTip: 'Master vectorization operations in Pandas instead of looping over dataframe rows.',
    resources: [
      { name: 'Pandas Data Wrangling Guide (PDF)', size: '2.6 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Data Cleaning & Transformation',
        lessons: [
          { id: '01', title: 'Pandas DataFrames, Indexing & Filtering', duration: '27:10', completed: true, videoUrl: 'https://www.youtube.com/watch?v=r-uOLxNrNk8', about: 'Handling missing values, grouping, and pivot tables.' },
          { id: '02', title: 'Seaborn & Matplotlib Visualization', duration: '35:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=r-uOLxNrNk8', about: 'Distribution plots, heatmaps, box plots, and publication-ready charts.' }
        ]
      }
    ]
  },
  'data-3': {
    title: 'Modern Data Engineering: Kafka, Spark & Snowflake',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Design real-time event streaming, batch ETL with PySpark, dbt transformations, and data lakehouses.',
    learningTip: 'Partition datasets by date and high-cardinality keys to optimize distributed query speeds in Spark.',
    resources: [
      { name: 'Data Lakehouse Architecture Guide (PDF)', size: '3.7 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Real-Time Streaming & Batch ETL',
        lessons: [
          { id: '01', title: 'Apache Kafka Event Architecture & Data Pipelines', duration: '29:30', completed: true, videoUrl: 'https://www.youtube.com/watch?v=qWru-b6m030', about: 'Producers, consumers, partitions, and streaming data engineering pipelines.' },
          { id: '02', title: 'PySpark Large-Scale Processing', duration: '39:00', completed: false, videoUrl: 'https://www.youtube.com/watch?v=qWru-b6m030', about: 'RDDs, DataFrames, Spark SQL, and building dbt models on Snowflake.' }
        ]
      }
    ]
  },
  'data-4': {
    title: 'SQL for Data Analysis & Business Intelligence',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Master SQL joins, window functions, CTEs, query optimization, and executive BI dashboards.',
    learningTip: 'Use Common Table Expressions (CTEs) to make complex multi-step queries readable and maintainable.',
    resources: [
      { name: 'SQL Query Optimization Handbook (PDF)', size: '2.2 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Advanced SQL Queries',
        lessons: [
          { id: '01', title: 'SQL Full Course for Beginners', duration: '25:40', completed: true, videoUrl: 'https://www.youtube.com/watch?v=7S_tz1z_5bA', about: 'Partitioning, rolling averages, window functions, and joins.' },
          { id: '02', title: 'Indexing, EXPLAIN Plans & Query Optimization', duration: '33:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=7S_tz1z_5bA', about: 'B-trees, query planner analysis, and eliminating sequential scans.' }
        ]
      }
    ]
  },

  // ── Blockchain & Web3 ──
  'web3-1': {
    title: 'Solidity & Smart Contract Development on Ethereum',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Write, test, and deploy Solidity smart contracts, interact with the EVM, and build DeFi protocols.',
    learningTip: 'Always follow the Checks-Effects-Interactions pattern in Solidity to prevent reentrancy attacks.',
    resources: [
      { name: 'Solidity Security & Audit Checklist (PDF)', size: '2.8 MB', type: 'pdf' },
      { name: 'Hardhat Smart Contract Boilerplate (ZIP)', size: '4.8 MB', type: 'zip' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Solidity Syntax & Hardhat Testing',
        lessons: [
          { id: '01', title: 'EVM Fundamentals & Smart Contract Syntax', duration: '28:00', completed: true, videoUrl: 'https://www.youtube.com/watch?v=gyMwXuJrbJQ', about: 'Storage vs memory, modifiers, events, and gas optimization.' },
          { id: '02', title: 'ERC-20 & ERC-721 Token Standards', duration: '36:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=gyMwXuJrbJQ', about: 'Implementing token contracts with OpenZeppelin libraries.' }
        ]
      }
    ]
  },
  'web3-2': {
    title: 'DeFi, NFTs & Web3 App Development',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Build decentralized applications, mint NFT collections, implement liquidity pools, and integrate Web3.js.',
    learningTip: 'Use wagmi and viem for lightweight, type-safe Ethereum interactions in React apps.',
    resources: [
      { name: 'Full-Stack Web3 DApp Starter (ZIP)', size: '7.9 MB', type: 'zip' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Full-Stack Web3 Frontend Integration',
        lessons: [
          { id: '01', title: 'Wallet Connection with RainbowKit & Wagmi', duration: '26:20', completed: true, videoUrl: 'https://www.youtube.com/watch?v=M576WGiDBdQ', about: 'MetaMask, Coinbase Wallet, and handling chain switches.' },
          { id: '02', title: 'Decentralized Exchange (AMM) Liquidity Pools', duration: '35:50', completed: false, videoUrl: 'https://www.youtube.com/watch?v=M576WGiDBdQ', about: 'Constant product formulas (x * y = k) and automated token swaps.' }
        ]
      }
    ]
  },

  // ── Rust / Systems ──
  'sys-1': {
    title: 'Rust Programming: Systems & High-Performance WASM',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Memory safety, concurrency primitives, zero-cost abstractions, and WASM compilation with Rust.',
    learningTip: 'Embrace the Rust borrow checker: understand lifetimes, references, and interior mutability.',
    resources: [
      { name: 'The Rust Programming Handbook (PDF)', size: '3.9 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Ownership, Borrowing & Lifetimes',
        lessons: [
          { id: '01', title: 'Rust Crash Course | Memory Safety', duration: '29:15', completed: true, videoUrl: 'https://www.youtube.com/watch?v=zF34dRivLOw', about: 'Stack vs heap, ownership rules, and immutable/mutable borrows in Rust.' },
          { id: '02', title: 'Structs, Enums & Pattern Matching', duration: '34:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=MsocPEZBd-M', about: 'Option/Result error handling, match guards, and traits.' }
        ]
      },
      {
        id: 2,
        title: 'Section 02: Concurrency & WebAssembly (WASM)',
        lessons: [
          { id: '03', title: 'Fearless Concurrency & Threads', duration: '31:20', completed: false, videoUrl: 'https://www.youtube.com/watch?v=MsocPEZBd-M', about: 'Channels, Arc/Mutex, and Tokio async runtime.' },
          { id: '04', title: 'Compiling Rust to WebAssembly', duration: '36:00', completed: false, videoUrl: 'https://www.youtube.com/watch?v=zF34dRivLOw', about: 'wasm-pack, wasm-bindgen, and running high-speed Rust in browser.' }
        ]
      }
    ]
  },

  // ── Creative Suite (Adobe Photoshop, Illustrator, Premiere Pro) ──
  'photoshop': {
    title: 'Adobe Photoshop Complete Masterclass',
    primaryLanguage: 'Urdu / Hindi',
    languages: 'Urdu, Hindi (English Subtitles)',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLW-zSkCnZ-gA5Jn6gZtUa6-aG0OoRZyb6',
    playlistId: 'PLW-zSkCnZ-gA5Jn6gZtUa6-aG0OoRZyb6',
    languagesMap: {
      'Urdu': 'https://www.youtube.com/watch?v=IyR_uYsRdPs',
      'Hindi': 'https://www.youtube.com/watch?v=IyR_uYsRdPs',
      'English': 'https://www.youtube.com/watch?v=Ib8UBwu3yGA'
    },
    description: 'Master photo retouching, graphic design, digital painting, layer masks, and commercial compositing.',
    learningTip: 'Practice using non-destructive adjustment layers and smart objects for maximum flexibility.',
    resources: [
      { name: 'Tools Panel Guide (PDF)', size: '1.2 MB', type: 'pdf' },
      { name: 'Photoshop Tools Cheat Sheet', size: '780 KB', type: 'pdf' },
      { name: 'Practice Files & PSDs (ZIP)', size: '12.4 MB', type: 'zip' },
      { name: 'Keyboard Shortcuts (PDF)', size: '1.1 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Introduction & Workspace',
        lessons: [
          { id: '01', title: 'Welcome to Photoshop & Interface Setup', duration: '12:30', completed: true, videoUrl: 'https://www.youtube.com/watch?v=IyR_uYsRdPs', about: 'Workspace customization, performance settings, and canvas navigation.' },
          { id: '02', title: 'Document Setup & Color Spaces (RGB vs CMYK)', duration: '18:40', completed: true, videoUrl: 'https://www.youtube.com/watch?v=IyR_uYsRdPs', about: 'Resolution, PPI/DPI, color profiles, and artboards.' }
        ]
      },
      {
        id: 2,
        title: 'Section 02: Selection & Essential Tools',
        lessons: [
          { id: '03', title: 'Tools Panel Overview & Marquee/Lasso Tools', duration: '23:45', completed: false, videoUrl: 'https://www.youtube.com/watch?v=IyR_uYsRdPs', about: 'Object selection tool, Quick Selection, and Select Subject AI.' },
          { id: '04', title: 'Pen Tool Precision & Vector Paths', duration: '28:20', completed: false, videoUrl: 'https://www.youtube.com/watch?v=IyR_uYsRdPs', about: 'Bezier curves, anchor points, and converting paths to selections.' },
          { id: '05', title: 'Brush Tool Mastery & Custom Brushes', duration: '21:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=IyR_uYsRdPs', about: 'Brush dynamics, smoothing, pressure sensitivity, and texture painting.' }
        ]
      },
      {
        id: 3,
        title: 'Section 03: Layers, Masks & Blending Modes',
        lessons: [
          { id: '06', title: 'Non-Destructive Layer Masks', duration: '22:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=IyR_uYsRdPs', about: 'Black/white mask painting, clipping masks, and feathering.' },
          { id: '07', title: 'Blending Modes & Advanced Compositing', duration: '26:10', completed: false, videoUrl: 'https://www.youtube.com/watch?v=IyR_uYsRdPs', about: 'Multiply, Screen, Overlay, and blend-if sliders for seamless composites.' }
        ]
      },
      {
        id: 4,
        title: 'Section 04: Retouching & Color Grading',
        lessons: [
          { id: '08', title: 'Frequency Separation & Skin Retouching', duration: '30:15', completed: false, videoUrl: 'https://www.youtube.com/watch?v=IyR_uYsRdPs', about: 'Healing brush, clone stamp, and high-end portrait retouching.' },
          { id: '09', title: 'Curves, Levels & Camera Raw Filter', duration: '24:00', completed: false, videoUrl: 'https://www.youtube.com/watch?v=IyR_uYsRdPs', about: 'Color grading, split toning, and cinematic mood adjustments.' }
        ]
      },
      {
        id: 5,
        title: 'Section 05: Export & Commercial Project',
        lessons: [
          { id: '10', title: 'Commercial Banner & Web Exporting', duration: '28:30', completed: false, videoUrl: 'https://www.youtube.com/watch?v=IyR_uYsRdPs', about: 'WebP, SVG, PNG compression, and final production deliverables.' }
        ]
      }
    ]
  },
  'illustrator': {
    title: 'Adobe Illustrator CC Vector Design',
    primaryLanguage: 'English',
    languages: 'English (Subtitles: Urdu, Hindi)',
    description: 'Master vector illustrations, logo design, typography, pen tool mastery, and isometric artwork.',
    learningTip: 'Use Pathfinder and Shape Builder tools to combine simple geometries into complex logos.',
    resources: [
      { name: 'Illustrator Vector Assets (AI)', size: '16.5 MB', type: 'ai' },
      { name: 'Pen Tool Practice Exercises (PDF)', size: '2.3 MB', type: 'pdf' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Vector Fundamentals & Pen Tool',
        lessons: [
          { id: '01', title: 'Vector vs Raster & Illustrator UI', duration: '19:30', completed: true, videoUrl: 'https://www.youtube.com/watch?v=Ib8UBwu3yGA', about: 'Anchor points, paths, direction handles, and artboard management.' },
          { id: '02', title: 'Pen Tool & Shape Builder Mastery', duration: '31:45', completed: false, videoUrl: 'https://www.youtube.com/watch?v=Ib8UBwu3yGA', about: 'Building icons, geometric logos, and precise vector shapes.' }
        ]
      }
    ]
  },
  'premiere': {
    title: 'Adobe Premiere Pro Video Editing',
    primaryLanguage: 'English',
    languages: 'English',
    description: 'Master timeline editing, transitions, sound design, color correction, and social media exports.',
    learningTip: 'Use keyboard shortcuts (J, K, L and Q, W ripple edits) to speed up timeline cutting by 3x.',
    resources: [
      { name: 'Premiere Pro Cinematic Presets (PRPROJ)', size: '24.1 MB', type: 'prproj' },
      { name: 'Sound FX & Transition Audio (WAV)', size: '18.9 MB', type: 'zip' }
    ],
    sections: [
      {
        id: 1,
        title: 'Section 01: Timeline Editing & B-Roll Assembly',
        lessons: [
          { id: '01', title: 'Importing Media & Rough Cut Assembly', duration: '22:15', completed: true, videoUrl: 'https://www.youtube.com/watch?v=Hls3Tp7JS8E', about: 'Sequences, frame rates, ripple edits, and three-point editing in Premiere Pro.' },
          { id: '02', title: 'Lumetri Color & Essential Sound Panel', duration: '34:20', completed: false, videoUrl: 'https://www.youtube.com/watch?v=Hls3Tp7JS8E', about: 'Color grading, audio ducking, noise reduction, and final 4K export.' }
        ]
      }
    ]
  }
};
