# 가르침에듀 코딩학원 웹사이트

순수 정적 HTML + CSS + 최소 JS. 빌드 도구 없음. Vercel에 그대로 배포.

---

## 구조

```
.
├── index.html              홈
├── about.html              교육 철학
├── roadmap.html            로드맵
├── levels.html             레벨별 과정 (Step 기반 커리큘럼 상세)
├── instructor.html         대표 강사 소개
├── schedule.html           수업 안내
├── faq.html                FAQ
├── contact.html            상담 신청 · 지도
├── assets/
│   ├── style.css           전체 스타일 (통합)
│   ├── script.js           공통 헤더/푸터 주입 + 인터랙션
│   └── images/             이미지
├── vercel.json             Vercel 설정 (cleanUrls, 캐시 헤더)
└── README.md               이 파일
```

---

## 배포 (Vercel)

1. 이 폴더를 GitHub 저장소에 올리기
2. Vercel에서 `New Project` → 저장소 연결
3. Framework Preset: **Other** 선택, 빌드 명령·출력 디렉토리 둘 다 비워두기
4. Deploy 클릭

`cleanUrls` 옵션이 켜져 있어 URL은 `/about`, `/levels` 식으로 노출됩니다 (.html 생략).

---

## 수정 방법

### 헤더/푸터 수정
`assets/script.js` 한 파일만 수정하면 전 페이지에 반영.

### 네비게이션 항목 추가/삭제
`assets/script.js`의 `NAV_ITEMS` 배열 수정.

### 스타일 수정
`assets/style.css` 한 파일.

### 페이지 내용 수정
각 `.html` 파일의 `<main>` 내부만 수정.
`<div data-header></div>`, `<div data-footer></div>`는 건드리지 마세요.

---

## 🔧 상담 신청 폼을 실제로 작동시키기 (Formspree 연동)

지금 폼은 **데모 상태**입니다. 제출해도 어디에도 전송되지 않고 알림창만 뜹니다.
실제로 이메일·카톡·문자로 받으려면 **Formspree**를 연동하세요. 무료 월 50건까지 가능합니다.

### 설정 절차 (약 5분)

**1) Formspree 가입**
- https://formspree.io 접속 → [Sign up] → 이메일로 가입
- 가입 시 사용한 이메일로 신청 접수 알림이 갑니다

**2) 새 폼 생성**
- 대시보드에서 [+ New Form] 클릭
- Form Name: `가르침에듀 상담 신청`
- 알림 받을 이메일 주소 입력 (원장님 이메일 권장)
- 생성되면 **Form Endpoint** 가 표시됩니다. 예: `https://formspree.io/f/abcd1234`

**3) `contact.html` 수정**

파일에서 아래 부분을 찾아:
```html
<form onsubmit="handleSubmit(event)">
```
이렇게 교체:
```html
<form action="https://formspree.io/f/abcd1234" method="POST">
```
(`abcd1234` 자리를 본인 Form Endpoint ID 로 바꾸세요.)

그리고 페이지 맨 아래의 `<script>function handleSubmit...</script>` 블록은 **통째로 삭제**하세요.

**4) (선택) 제출 후 페이지 지정**
성공 페이지를 커스텀하려면 폼 안쪽에 hidden input 한 줄 추가:
```html
<input type="hidden" name="_next" value="https://yourdomain.com/thanks.html">
```

**5) 테스트**
배포 후 실제 폼을 한 번 제출해보세요. 원장님 이메일로 알림이 도착하면 성공입니다.

### Formspree 외 대안

- **Google Forms** — 홈페이지 폼을 통째로 제거하고 "상담 신청하기" 버튼만 두고, 클릭 시 구글 폼으로 이동. 100% 무료지만 디자인 일관성이 깨짐.
- **Netlify Forms** — Vercel이 아닌 Netlify에 배포할 경우 쓸 수 있는 유사 서비스.
- **카카오 알림톡 + 자체 서버** — 학원 규모가 커졌을 때 도입. 월 3~5만원, 사업자번호 필요.

---

## 🗺 네이버 플레이스 지도 교체

`contact.html` 의 "오시는 길" 섹션에 **네이버 플레이스 링크 카드**가 있습니다.
카드를 누르면 새 창/네이버 앱으로 해당 장소가 열립니다.

### 왜 iframe 임베드가 아닌가?

네이버는 보안 정책상 iframe 내 임베드를 차단합니다 (X-Frame-Options 헤더).
그래서 외부 사이트에서 네이버 지도를 직접 보여주려면:

1. **네이버 Maps JavaScript API** — API 키 발급 필요, 월 쿼터 관리
2. **네이버 지도 공유 링크로 새 창 이동** ← 현재 이 방식
3. **정적 스냅샷 이미지** — 인터랙션 없음

### 링크 변경 방법

학원 이전·추가 지점 등으로 링크가 바뀌면 `contact.html` 에서 다음 한 줄만 수정:

```html
<a href="https://naver.me/xXnPwKSy" target="_blank" ...>
```

### 네이버 지도 공유 링크 얻는 법

- 네이버 지도 앱/웹에서 해당 장소를 검색
- 장소 카드의 `[공유]` 버튼 클릭
- `[주소 링크 복사]` 로 `https://naver.me/...` 짧은 링크 획득

---

## 📝 페이지 내용 자주 수정하는 부분

### 문의 전화번호 (전 페이지)
- `assets/script.js` 의 footer 안쪽 `064-900-9982`
- `contact.html` 의 info-box 안쪽 전화번호 2곳

### 학원 주소
- `contact.html` 의 `[ 학원 주소 — 개원 확정 시 갱신 ]` 부분

### 수강료 · 시간표
- `schedule.html` 의 schedule-table — 정식 확정 시 업데이트

### 대표 강사 프로필 업데이트
- `instructor.html` 전체. 특히 "강의 · 교육 이력" 섹션의 카드들

---

## 특징

- **빌드 필요 없음** — 그대로 `git push`하면 Vercel이 서빙
- **파일 크기 최소** — 헤더/푸터 중복 제거로 전체 약 40% 감소
- **공통 요소 한 곳 관리** — 메뉴 하나 바꾸려고 8개 페이지를 건드릴 필요 없음
- **폰트 preconnect** — Google Fonts 로딩 지연 최소화
- **자산 영구 캐시** — `/assets/*` 경로는 Vercel CDN이 1년 캐싱

---

## 추후 발전 방향

이 정적 사이트는 **학생 수 30명 이하 · 초기 운영 단계**에 맞춰 설계되었습니다.
다음 조건이 충족되면 다음 단계로 전환을 검토하세요:

| 시점 | 이유 | 전환 대상 |
|---|---|---|
| 학생 30명 초과 | 진도·출결·리포트 관리 복잡 | LMS 도입 (Classting, goormEDU) |
| 학생 100명 초과 | 수강 신청·결제 온라인화 필요 | Next.js + Supabase 자체 개발 |
| 지점 확장 | 지점별 커리큘럼·강사 관리 | 멀티 테넌트 아키텍처 |

각 전환 단계에서 이 정적 사이트는 **"소개 페이지" 역할로 유지**하면 됩니다.
