# RiMS Lab — GitHub Pages

기존 연구실 공개 홈페이지의 7개 메뉴를 유지한 정적 사이트 시안입니다.
서버, npm 설치, 프레임워크 없이 실행합니다. 현재 GitHub에 게시된 상태는 아닙니다.

## 미리보기

`index.html`을 브라우저로 열면 됩니다. 모든 페이지는 상대 경로를 사용하므로
GitHub Pages의 사용자 사이트와 저장소별 프로젝트 사이트에서 모두 사용할 수 있습니다.

## GitHub에 게시하기

1. GitHub에서 새 저장소를 만듭니다. 예: `rims-lab`. 공개 저장소 사용 여부는 사용자가 결정합니다.
2. 이 폴더 **안의 파일**을 저장소 최상위에 업로드합니다. `index.html`이 루트에 있어야 합니다.
3. 저장소 Settings → Pages → Build and deployment에서 Deploy from a branch를 선택합니다.
4. `main` 브랜치, `/(root)`를 선택하고 Save를 누릅니다.
5. GitHub가 표시하는 배포 URL로 접속합니다. 보통 `https://아이디.github.io/rims-lab/`입니다.

사이트의 내용과 연락처를 검토한 다음 공개하세요. GitHub Pages는 정적 파일을 공개 제공합니다.
다른 컴퓨터에서는 같은 저장소를 내려받거나 GitHub 웹에서 파일을 수정할 수 있습니다.

## 내용 수정

- `content.json`: 기존 사이트의 본문·이미지·참조 링크. 내용 수정 후 `node build.mjs`로 HTML 재생성.
- `build.mjs`: 페이지 레이아웃 및 홈의 소개 문구. 홈 요약 수정 시 이 파일도 편집.
- `style.css`: 색상·글꼴·여백·반응형 레이아웃.
- `refined.css`: RiMS 초록색 브랜드와 밝은 디자인.
- `home-scroll.css`: 스크롤형 홈의 연구 분야·소식·시연 영상·구성원 안내 레이아웃.
- `assets/ai-*.jpg`: 홈 카드에 사용한 AI 생성 일러스트. 실제 연구 현장 사진이 아니며 뉴스 카드에 Illustration으로 표시합니다.
- `app.js`: 모바일 메뉴 및 이미지 로딩 실패 시 원본 링크 표시.
- 이미 생성된 HTML을 직접 수정할 수도 있지만, 다음 빌드에서 덮어씁니다.

## 이미지 이전 상태

교수님 사진 1장은 assets에 저장했습니다. 나머지 사진은 원래 Google Sites 이미지 URL을 참조합니다.
원본의 접근 권한이나 URL이 바뀌면 이미지가 사라질 수 있습니다.
인터넷 연결이 가능한 Node.js 18 이상 환경에서 `node download-images.mjs`를 실행하면
나머지 이미지도 assets로 저장하고 HTML을 재생성합니다. 실패 항목은 원본 URL을 유지합니다.
이 도구는 저장된 공개 이미지 주소만 요청합니다. 사진 설명은 원본에 없는 경우 일반적인 대체 텍스트를 사용합니다.

## 원본과 범위

자료 출처: https://sites.google.com/view/drshin
수집: 2026-10-22. 공개된 Home, D. Shin, Lab Members, Gallery, Research, Vehicle Platform, News.
원본에서 숨겨진 수업·아카이브·Publications 페이지는 이전하지 않았습니다.
외부 논문·영상·연구 세부 링크는 원래 목적지를 유지합니다. 방문자 추적 위젯은 옮기지 않았습니다.
내용의 연도·직함·구성원 현황은 원문 기준이며 최신 상태로 임의 변경하지 않았습니다.
외부 글꼴 로드가 불가능하면 시스템 글꼴로 표시됩니다.
