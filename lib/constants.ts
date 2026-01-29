export const SITE = {
  name: "The Grove Journal",
  tagline: "Movement as Medicine",
  taglineKr: "움직임이 곧 치료다",
  description:
    "필라테스 그로브의 디지털 매거진. 스포츠 재활 전문가가 전하는 의학적이고 심미적인 움직임 이야기.",
  url: "https://the-grove-journal.vercel.app",
} as const;

export const LINKS = {
  reserve:
    "https://pcmap.place.naver.com/place/1392181307/home?fromPanelNum=2&timestamp=202601300152&locale=ko&svcName=map_pcv5&searchText=%ED%95%84%EB%9D%BC%ED%85%8C%EC%8A%A4%20%EA%B4%91%EA%B5%90",
  blog: "https://blog.naver.com/pilatesgrove",
  instagram: "https://www.instagram.com/pilatesgrove_official/",
  naverPlace: "https://pcmap.place.naver.com/place/1392181307/home",
} as const;

export const CATEGORIES = [
  {
    slug: "medical-column",
    label: "의학 칼럼",
    labelEn: "Medical Column",
    description: "스포츠 재활 전문가의 깊이 있는 건강 아티클",
  },
  {
    slug: "power-pilates",
    label: "파워 필라테스",
    labelEn: "Power Pilates",
    description: "미국 파워 필라테스의 권위 있는 계보와 철학",
  },
  {
    slug: "grove-story",
    label: "그로브 소식",
    labelEn: "Grove Story",
    description: "센터 업데이트와 회원 성공 사례",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
