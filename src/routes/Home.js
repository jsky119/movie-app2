import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  background-image: linear-gradient(120deg, #03a9f4, #b3e5fb);
`;

const Title = styled.h1`
  font-size: 60px;
  font-weght: bold;
  margin-bottom: 30px;
`;

const Subtitle = styled.h3`
  font-size: 30px;
`;

const Loading = styled.div`
  margin-top: 50px;
  font-size: 30px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 75px;
  width: 80%;
  position: relative;
  top: -50px;
`;

export default () => {
  const { loading, data } = useQuery(GET_MOVIES);
  return (
    <Container>
      <Header>
        <Title>Movie-App2</Title>
        <Subtitle>Apollo GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <Movies>
        {data?.movies?.map((m) => (
          <Movie key={m.id} id={m.id} bg={m.medium_cover_image} />
        ))}
      </Movies>
    </Container>
  );
  // if (loading) {
  //   return "loading...";
  // }
  // if (data && data.movies) {
  //   return data.movies.map((m) => <h1>{m.id}</h1>);
  // }
};
