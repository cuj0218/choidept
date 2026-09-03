export const personas = [
  {
    id: 'creator', index: '01', title: 'AI Creator', label: 'AI CREATOR',
    image: '/assets/characters/dark.webp',
    alt: '검은 옷을 입고 태블릿을 든 최피티 픽셀 캐릭터',
    accent: 'creator',
    description: '복잡한 AI 워크플로를 누구나 바로 써볼 수 있는 한국어 콘텐츠로 바꿉니다.',
    chips: ['28K+ FOLLOWERS', '15M+ ORGANIC VIEWS', '32 BRAND COLLABS'],
  },
  {
    id: 'beauty', index: '02', title: 'Beauty & Growth', label: 'BEAUTY INFLUENCER',
    image: '/assets/characters/field.webp',
    alt: '뷰티 제품과 스마트폰을 든 최피티 픽셀 캐릭터',
    accent: 'beauty',
    description: '콘텐츠 제작과 크리에이터 협업, 성과 데이터를 다음 크리에이티브 결정으로 연결합니다.',
    chips: ['160K MONTHLY VIEWS', '+500% TIKTOK VIEWS', '113K+ REACH'],
  },
  {
    id: 'student', index: '03', title: 'Student & Researcher', label: 'UNIVERSITY STUDENT',
    image: '/assets/characters/hood.webp',
    alt: '후드와 청바지를 입은 최피티 픽셀 캐릭터',
    accent: 'student',
    description: '미디어커뮤니케이션과 데이터애널리틱스를 공부하며 실행 가능한 AI 평가 방법을 연구합니다.',
    chips: ['MEDIA + DATA', 'GPA 4.0 / 4.5', '2024–2028'],
  },
  {
    id: 'kkami', index: '04', title: "Kkami's Dad", label: "KKAMI'S DAD",
    image: '/assets/characters/neutral.webp',
    alt: '검은 강아지 까미와 함께 서 있는 최피티 픽셀 캐릭터',
    accent: 'kkami',
    description: '대시보드 밖의 생활에서도 관찰하고 기록하며, 새로운 도구를 평범한 하루에 직접 시험합니다.',
    chips: ['DAILY OBSERVER', 'TRAVEL NOTES', 'WITH KKAMI'],
  },
];

export const headlineMetrics = [
  { value: '28K+', label: 'FOLLOWERS', context: 'Choi.GPT', publication: 'public' },
  { value: '15M+', label: 'ORGANIC VIEWS', context: 'Choi.GPT', publication: 'public' },
  { value: '32', label: 'BRAND COLLABORATIONS', context: 'Choi.GPT', publication: 'public' },
];

export const cases = [
  {
    id: 'choigpt', number: '01', title: 'Choi.GPT Content Lab', eyebrow: 'AI CREATOR / B2C',
    context: '새로운 AI 제품을 한국 사용자가 이해하고 바로 시험할 수 있게 만드는 콘텐츠 랩.',
    responsibility: '리서치, 기획, 스크립트, 디자인, 편집, 성과 분석.',
    system: 'AUDIENCE PROBLEM → HOOK → PRACTICAL EXAMPLE → NEXT ACTION',
    result: '28K+ followers · 15M+ organic views · 32 brand collaborations',
    links: [
      { label: 'INSTAGRAM', href: 'https://www.instagram.com/choi.gpt.ai/' },
      { label: 'NEWTAKE PR', href: 'https://www.instagram.com/choi.gpt.ai/reel/Db2pyX9yrNp/' },
      { label: 'MORPHIC AD', href: 'https://www.instagram.com/choi.gpt.ai/reel/Da5XpUcyMxL/' },
    ],
  },
  {
    id: 'beauty-growth', number: '02', title: 'North America Beauty Growth', eyebrow: 'BEAUTY / B2B',
    context: 'LG생활건강의 북미향 뷰티 브랜드 콘텐츠와 성장 업무.',
    responsibility: '숏폼 콘텐츠, 크리에이터 협업, 이커머스 지원, 성과 분석.',
    system: 'CREATE → PUBLISH → READ SIGNALS → IMPROVE',
    result: '160K monthly views · +500% TikTok views · 113K+ reach · 9K+ interactions',
    links: [],
  },
  {
    id: 'creator-ops', number: '03', title: 'Korea/Japan Creator Operations', eyebrow: 'CREATOR OPS / B2B',
    context: 'Manus Creator Program의 한국·일본 크리에이터 운영.',
    responsibility: '소싱, 핏 검토, 아웃리치, 온보딩, 현지화, 콘텐츠 리뷰, 운영 조율.',
    system: 'SOURCE → QUALIFY → ONBOARD → REVIEW → MEASURE',
    result: '50-candidate verified workbook · 138-profile expansion review',
    links: [{ label: 'MANUS PARTNER CONTENT', href: 'https://www.instagram.com/choi.gpt.ai/p/Db-LfeXkuDH/' }],
  },
];

export const experience = [
  { period: '2026–PRESENT', role: 'Creator & Builder', organization: 'Choi.GPT', type: 'creator', status: 'active' },
  { period: '2026', role: 'Manus AI Viral Coach', organization: 'MuseOn.AI', type: 'freelance', status: 'completed' },
  { period: '2025–2026', role: 'Global Marketing — North America', organization: 'LG Household & Health Care', type: 'work', status: 'completed' },
  { period: '2024–2028', role: 'Media Communication & Data Analytics', organization: 'Incheon National University', type: 'education', status: 'active' },
  { period: 'RESEARCH', role: 'Harness Benchmark & Implementation Lead', organization: 'Team Computer', type: 'research', status: 'prototype / pilot calibration' },
];

export const links = {
  email: 'mailto:hello@choidept.com',
  linkedin: 'https://www.linkedin.com/in/woojin-choi-a0989b24a/',
  instagram: 'https://www.instagram.com/choi.gpt.ai/',
};
