import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 7px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

export default ({ id, bg, isLiked }) => {
  const [toggleMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: +id, isLiked },
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button onClick={toggleMovie}>{isLiked ? "Unlike💔" : "Like❤️"}</button>
    </Container>
  );
};
