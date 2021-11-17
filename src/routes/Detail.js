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
      summary
      genres
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

const Loading = styled.div`
  color: black;
  font-size: 30px;
`;

const Column = styled.div`
  margin-left: 10px;
`;
const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 15px;
`;
const Subtitle = styled.h4`
  font-size: 25px;
  margin-bottom: 10px;
`;
const Summary = styled.p`
  font-size: 10px;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  return (
    <Container>
      <Column>
        <Title>{loading ? "loading..." : data.movie.title}</Title>
        {!loading && data.movie && (
          <>
            <Subtitle>
              {data.movie.rating} · {data.movie.genres}
            </Subtitle>
            <Summary>{data.movie.summary}</Summary>
          </>
        )}
      </Column>
    </Container>
  );
};
