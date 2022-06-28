const API_KEY = process.env.API_KEY;
module.exports = {
  reactStricMode: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};
// redirection step1. source를 찾는다.
//만약 유저가 어디론가 이동한다면 유저를 form이라는 destnation으로 보낸다.
// redirection이 permanent(영구적)인지 아닌지에 따라서,
// 브라우저나 검색엔진이 이 정보를 기억하느냐 여부가 결정된다.
// redirects를 하나 더쓰고 싶다면 source와 permanent를 쓰면 된다.
// redirects는 source URL로 갈 때, 유저는 URL이 바뀌는 것을 확인할 수 있다.
// rewrites는 유저를 redirect 시키기는 하지만 URL은 변하지 않는다.
// next.js는 이 request를 masking한다.
// http://localhost:3000/api/movies 해당 url을 방문했을 때 얻게되는 response정보인데
// 서버 뒤에 mask되어(가려져) 있다.
// network를 보면 request가 있지만 이 request가 movie DB로 가지않고 http://localhost:3000/api/movies 이 주소로 가게 된다.
