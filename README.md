# NextJS Introduction

클라이언트 사이드 렌더링과 서버 사이드 only 렌더링

Next.js는 페이지를 미리 html 로 export해주기 때문에 getServerSideProps 함수를 활성화 하기 전까지는 사전 생성된 html 페이지에 데이터가 포함되지는 않는다.

컴포넌트의 초기 state를 미리 export하기 때문에 누군가 홈페이지를 접속했을 때 React.js가 처리를 마치기 전까지는 실제 html 소스코드를 보면 유저가 접속한 바로 그 순간에 보게 될 화면이 '로딩중'인 것을 확인할 수 있다.

그리고 나서 React.js의 처리가 완료되면 React.js는 useEffect, useState, fatch를 하고 난 후에 영화정보를 state에 넣어서 유저가 화면에서 영화정보를 볼 수 있게 되는 것이다.

다시 말하면 React.js의 처리가 완료될 때까지 기다려야하고 유저는 잠깐 혹은 API에서 데이터를 받아올 때까지 '로딩중' 상태를 봐야한다는 의미이다.

API 반응이 느리다면 유저는 '로딩중' 단계를 아주 긴 시간 봐야할 것이다.

하지만 항상 html이 완전한 상태로 준비되었으면 한다면 즉, 유저가 접속했을 때 모든 데이터가 페이지에 들어있고 유저가 '로딩중' 상태를 보지 않았으면 한다면 이 때 바로 getServerSideProps를 사용하는 것이다.

getServerSideProps 함수에서는 fetch를 통해 데이터베이스를 불러올 수도 있고 이 부분은 프론트에서는 보이지 않고 백엔드에서만 작동하는 것이다. 여기에는 API key를 넣을 수도 있고, 데이터를 가져오는 등등을 할 수 있다.
