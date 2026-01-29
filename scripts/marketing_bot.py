#!/usr/bin/env python3
"""
The Grove Journal - 콘텐츠 자동 생성 봇
Gemini API를 활용한 프리미엄 의학 칼럼 자동 생성

사용법:
  python3 scripts/marketing_bot.py              # 다음 순서 주제로 1편 생성
  python3 scripts/marketing_bot.py --topic 3    # 특정 주제 선택 (1-6)
  python3 scripts/marketing_bot.py --all        # 전체 주제 6편 일괄 생성
  python3 scripts/marketing_bot.py --list       # 주제 목록 확인
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

try:
    import google.generativeai as genai
except ImportError:
    print("google-generativeai 패키지가 필요합니다.")
    print("설치: pip3 install google-generativeai")
    sys.exit(1)

# ──────────────────────────────────────────────
# 설정
# ──────────────────────────────────────────────

CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"
STATE_FILE = Path(__file__).resolve().parent / ".bot_state.json"

PERSONA_PROMPT = """당신은 국민대 스포츠건강재활학과 석사이며, 미국 뉴욕 Power Pilates 공인 지도자입니다.
10년 이상의 임상 경험을 보유하고 있으며, 100% GRATZ 기구만 사용하는 클래식 필라테스 전문가입니다.
광교(수원시 영통구)에서 '필라테스 그로브(Pilates Grove)'를 운영하고 있습니다.

글쓰기 규칙:
- 톤: 학구적이고 진정성 있게. 시중의 빠른 해결책을 조심스럽게 비판
- 구조: 훅(공감되는 통증) → 통념 깨기(의학적 진실) → 해결책(재활적 접근)
- 금지: 영업 멘트, 할인, 이벤트, "전화주세요", "방문해주세요" 등 세일즈 표현 절대 금지
- 금지: "AI", "인공지능", "생성", "챗봇" 등 AI임을 드러내는 표현 절대 금지
- 지역: 광교, 상현동, 테크노밸리 등 생활권 자연스럽게 언급 (1-2회)
- 분량: 본문 1500~2000자 (마크다운 기준)
- 마크다운: ## 소제목, **강조**, > 인용구 활용
- 마지막에 짧은 핵심 정리 인용구(blockquote)로 마무리

당신은 블로그 글을 쓰는 실제 원장님입니다. 1인칭 시점으로 자연스럽게 작성하세요."""

CATEGORY_THUMBNAILS = {
    "medical-column": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    "power-pilates": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    "grove-story": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
}

TOPICS = [
    {
        "id": 1,
        "category": "medical-column",
        "slug": "neck-pain-scalene",
        "title_hint": "광교 직장인 목 통증 - 자세가 아니라 호흡이 원인",
        "prompt": "광교 테크노밸리 직장인들의 만성 목 통증에 대해 써주세요. 핵심: 사각근(Scalene) 과긴장이 원인이며, 자세 교정이 아닌 호흡 패턴 교정이 해답. 거북목 베개나 마사지가 근본 해결이 되지 않는 이유 설명.",
    },
    {
        "id": 2,
        "category": "medical-column",
        "slug": "round-shoulder-paradox",
        "title_hint": "라운드숄더 - 등 운동을 열심히 하면 어깨가 더 말리는 이유",
        "prompt": "라운드숄더(둥근어깨) 교정에 대해 써주세요. 핵심: 대부분 등 운동(로잉)으로 교정하려 하지만, 소흉근(Pectoralis Minor) 단축이 진짜 원인. 등 운동만으로는 오히려 상부승모근이 과활성되어 악화될 수 있음. 소흉근 이완 + 전거근 활성화가 해답.",
    },
    {
        "id": 3,
        "category": "medical-column",
        "slug": "postpartum-diastasis-recti",
        "title_hint": "상현동 30대 엄마들의 뱃살이 안 빠지는 진짜 이유",
        "prompt": "산후 뱃살 관리에 대해 써주세요. 핵심: 단순한 체지방이 아니라 복직근 이개(Diastasis Recti)가 원인일 수 있음. 윗몸일으키기나 플랭크가 오히려 악화시킬 수 있는 이유. 올바른 복부 회복은 횡격막 호흡과 복횡근 활성화에서 시작.",
    },
    {
        "id": 4,
        "category": "medical-column",
        "slug": "disc-stop-situps",
        "title_hint": "허리 디스크 초기? 윗몸일으키기 당장 멈추세요",
        "prompt": "허리 디스크 초기 대응에 대해 써주세요. 핵심: 장요근(Iliopsoas)의 과긴장이 디스크 압박을 악화시킴. 윗몸일으키기(크런치)가 장요근을 더 단축시키는 이유. 장요근 이완 + 다열근(Multifidus) 안정화가 재활의 핵심.",
    },
    {
        "id": 5,
        "category": "power-pilates",
        "slug": "gratz-philosophy",
        "title_hint": "필라테스계의 에르메스, GRATZ를 고집하는 이유",
        "prompt": "GRATZ 기구에 대해 써주세요. 핵심: 조셉 필라테스의 오리지널 설계를 유일하게 계승한 제조사. 스프링 텐션의 차이가 운동 품질을 결정하는 이유. 복제 기구와의 근본적 차이. Power Pilates 계보와의 연결.",
    },
    {
        "id": 6,
        "category": "medical-column",
        "slug": "knee-pain-gluteus-medius",
        "title_hint": "광교 호수공원 러닝 후 무릎 통증 - 중둔근을 의심하세요",
        "prompt": "러닝 후 무릎 통증에 대해 써주세요. 핵심: 무릎 자체의 문제가 아니라 중둔근(Gluteus Medius) 약화가 원인. 중둔근이 약하면 달릴 때 무릎이 안쪽으로 무너지며(Knee Valgus) 연골과 인대에 스트레스. 광교 호수공원 러닝 문화와 연결.",
    },
]


def load_state():
    """봇 상태(다음 순서) 로드"""
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"next_index": 0}


def save_state(state):
    """봇 상태 저장"""
    STATE_FILE.write_text(json.dumps(state, ensure_ascii=False, indent=2))


def generate_article(topic: dict, api_key: str) -> str:
    """Gemini API로 아티클 생성"""
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.0-flash")

    user_prompt = f"""다음 주제로 블로그 글을 작성해 주세요.

주제: {topic['title_hint']}
상세 지시: {topic['prompt']}

마크다운 형식으로 작성하되, frontmatter(---로 감싼 메타데이터)는 포함하지 마세요.
본문만 작성해 주세요. ## 소제목으로 구분하고, 1500~2000자 분량으로 작성하세요."""

    response = model.generate_content(
        [
            {"role": "user", "parts": [PERSONA_PROMPT]},
            {"role": "model", "parts": ["네, 이해했습니다. 해당 페르소나로 글을 작성하겠습니다."]},
            {"role": "user", "parts": [user_prompt]},
        ]
    )

    return response.text


def slugify(text: str) -> str:
    """한글 포함 텍스트를 URL 슬러그로 변환"""
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    return text.strip("-").lower()


def save_article(topic: dict, content: str):
    """마크다운 파일로 저장"""
    category_dir = CONTENT_DIR / topic["category"]
    category_dir.mkdir(parents=True, exist_ok=True)

    today = datetime.now().strftime("%Y-%m-%d")

    # AI가 생성한 본문에서 제목 추출 시도
    lines = content.strip().split("\n")
    title = topic["title_hint"]
    body = content

    # 첫 줄이 # 제목이면 추출
    if lines and lines[0].startswith("# "):
        title = lines[0].lstrip("# ").strip()
        body = "\n".join(lines[1:]).strip()

    # 발췌문 생성 (첫 번째 일반 텍스트 단락)
    excerpt = ""
    for line in body.split("\n"):
        line = line.strip()
        if line and not line.startswith("#") and not line.startswith(">") and not line.startswith("-"):
            excerpt = line[:120].replace('"', '\\"')
            if len(line) > 120:
                excerpt += "..."
            break

    slug = topic["slug"]
    filename = f"{slug}.md"

    thumbnail = CATEGORY_THUMBNAILS.get(topic["category"], "")

    frontmatter = f"""---
title: "{title}"
date: "{today}"
category: "{topic['category']}"
excerpt: "{excerpt}"
thumbnail: "{thumbnail}"
---"""

    full_content = f"{frontmatter}\n\n{body}\n"

    filepath = category_dir / filename
    filepath.write_text(full_content, encoding="utf-8")
    print(f"  저장 완료: {filepath}")
    return filepath


def main():
    parser = argparse.ArgumentParser(description="The Grove Journal 콘텐츠 자동 생성 봇")
    parser.add_argument("--topic", type=int, help="특정 주제 번호 (1-6)")
    parser.add_argument("--all", action="store_true", help="전체 주제 일괄 생성")
    parser.add_argument("--list", action="store_true", help="주제 목록 확인")
    parser.add_argument("--api-key", type=str, help="Gemini API 키 (또는 GEMINI_API_KEY 환경변수)")
    args = parser.parse_args()

    # 주제 목록 출력
    if args.list:
        print("\n📋 주제 목록:")
        print("-" * 60)
        for t in TOPICS:
            print(f"  [{t['id']}] [{t['category']}] {t['title_hint']}")
        print()
        return

    # API 키 확인
    api_key = args.api_key or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Gemini API 키가 필요합니다.")
        print("  --api-key 옵션 또는 GEMINI_API_KEY 환경변수를 설정하세요.")
        print("  예: export GEMINI_API_KEY='your-key-here'")
        sys.exit(1)

    # 생성할 주제 결정
    if args.all:
        targets = TOPICS
    elif args.topic:
        if args.topic < 1 or args.topic > len(TOPICS):
            print(f"주제 번호는 1-{len(TOPICS)} 사이여야 합니다.")
            sys.exit(1)
        targets = [TOPICS[args.topic - 1]]
    else:
        # 순환 선택
        state = load_state()
        idx = state["next_index"] % len(TOPICS)
        targets = [TOPICS[idx]]
        state["next_index"] = idx + 1
        save_state(state)

    print(f"\n🖊️  The Grove Journal 콘텐츠 생성기")
    print(f"{'=' * 50}")
    print(f"생성할 글: {len(targets)}편\n")

    for topic in targets:
        print(f"[{topic['id']}] {topic['title_hint']}")
        print(f"  카테고리: {topic['category']}")
        print(f"  생성 중...")

        try:
            content = generate_article(topic, api_key)
            save_article(topic, content)
            print(f"  ✅ 완료\n")
        except Exception as e:
            print(f"  ❌ 오류: {e}\n")
            continue

    print(f"{'=' * 50}")
    print("모든 작업이 완료되었습니다.")
    print(f"콘텐츠 디렉토리: {CONTENT_DIR}\n")


if __name__ == "__main__":
    main()
