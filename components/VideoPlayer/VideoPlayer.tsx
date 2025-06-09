import { useState } from "react";
import styled from "styled-components";

const videos = [
  {
    id: "video1",
    title: "Vídeo 1",
    url: "https://www.youtube.com/embed/4WnHmI9NgYE",
    thumbnail: "/assets/thumb.png",
  },
  {
    id: "video2",
    title: "Vídeo 2",
    url: "https://www.youtube.com/embed/_-LB9KEotTc",
    thumbnail: "/assets/thumb.png",
  },
];

const VideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <Container>
      <PlayerWrapper>
        <iframe
          width="100%"
          height="100%"
          src={selectedVideo.url}
          title={selectedVideo.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </PlayerWrapper>
      <Thumbnails>
        {videos.map((video) => (
          <Thumb
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            selected={video.id === selectedVideo.id}
          >
            <img src={video.thumbnail} alt={video.title} />
            <span>{video.title}</span>
          </Thumb>
        ))}
      </Thumbnails>
    </Container>
  );
};

export default VideoPlayer;

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  height: 100%;
`;

const PlayerWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 16px;
`;

const Thumb = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: ${({ selected }) => (selected ? "2px solid #0A3D62" : "2px solid transparent")};
  border-radius: 8px;
  padding: 4px;

  img {
    width: 160px;
    height: 90px;
    object-fit: cover;
    border-radius: 6px;
  }

  span {
    font-size: 14px;
    color: #333;
  }
`;
