import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_full
      genres
      isLiked @client
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(120deg, #03a9f4, #b3e5fb);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;
const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 15px;
`;
const Subtitle = styled.h4`
  font-size: 25px;
  margin-bottom: 10px;
`;
const Description = styled.p`
  width: 550px;
  font-size: 20px;
`;

const Poster = styled.div`
  width: 30%;
  height: 50%;
  background-image: url(${(props) => props.bg});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "loading..."
            : `${data.movie.title} ${data.movie.isLiked ? "❤️" : "💔"}`}
        </Title>
        <Subtitle>
          {data?.movie?.rating} · {data?.movie?.genres} ·{" "}
          {data?.movie?.language}
        </Subtitle>
        <Description>{data?.movie?.description_full}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};
