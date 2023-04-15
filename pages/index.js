import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline/styles";

function HomePage() {
 
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  // const valorDoFiltro = "Jogo";
  // console.log(config.playlists);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Prop Drilling */}
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <TimeLine searchValue={valorDoFiltro} playlists={config.playlists}>
          Conteúdo
        </TimeLine>
      </div>
    </>
  );
}

export default HomePage;

// function Menu() {
//   return <div>Menu</div>;
// }

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    /* padding: 16px 32px; */
    /* gap: 16px; */
  }
  .user-info {
    /* margin-top: 50px;
    display: flex; */
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  background: blue;
  /* background-image: url(${config.bg}); */
  background-image: url(${({ bg }) => bg});
  height: 230px;
`;
function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />

      <section class="user-info">
        <img src={`https://github.com/${config.github}.png`} />

        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function TimeLine({ searchValue, ...propriedades }) {
  // console.log("Dentro do component", propriedades);
  const playlistNames = Object.keys(propriedades.playlists);
  //Statement
  //Retorno por expressão
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = propriedades.playlists[playlistName];
        // console.log(playlistName);
        // console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalizes = video.title.toLowerCase();
                  const searchValueNormalizes = searchValue.toLowerCase();
                  return titleNormalizes.includes(searchValueNormalizes);
                })
                .map((video) => {
                  return (
                    <a hey={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
