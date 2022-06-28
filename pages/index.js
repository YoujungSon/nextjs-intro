import Link from "next/link";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

export default function Home({ results }) {
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  // client 가 아닌 server에서만 작동한다.
  // API key를 여기에 쓴다면 절대로 client에게 보여지지 는다.
  //server side를 통해 props를 page로 보낼 수 있다.
  //소스코드를 확인하면 CSR에서는 loading이 있었는데 react component의 render result가 들어와있다.
  //API가 돌아오기 전까지 아무것도 보이지 않는다.
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
// 클라이언트 사이드 렌더링과 서버 사이드 only렌더링
// next.js의 function을 사용하면 오직 server side render만 할 지 선택할 수 있게 된다.
// reload할 때 nextJS는 page를 html형태로 export하거나 pre render 한다.
// app의 initial state(초기상태)는 html이기 때무에 html에서 loading화면 같은 것을 기대할 수 있다.
// nextJS는  omponent의 초기상태로 html을 export하거나 app을 pre-render한다.그리고 javacript를 비활성화해도 유저는 html과 loading를 볼 수 있다. 새로고침하면 loading 화면을 볼 수있다.
// 유저들이 로딩상태를 보는 것이 싫다면 create react app을 사용하면 javascript가 나오기 전에는 html이 나오지 않는다. fetch라던지 server에서 일어나는 data 관련된 작업을 모두 한 다음에 API가 모두 완료되었을 때 비로소 페이지를 render하려고 할 것이다.
//항상 server side rendering을 하고 싶은지(데이터가 유효할 때 화면이 보여지게 되는 것이 좋은지) 또는 loading화면을 보여준 다음에 데이터를 받는게 좋은지 선택해야 한다.
//nextjs가 백엔드에서 받아온 props를 return해서 소스소드에 가져다주면 reactJS가 저 props를 가져와서 result array를 뽑아준다.
//SSR은 loading이 없는 대신에 만약 API load가 느리다면 유저가 아무것도 보지 못한 채로 올 기다려야 한다는 단점이 있다.
