import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  flex-direction : column;
  /* justify-content: space-around; */
  align-items: center;
  color: white;
`;

const SubContainer = styled.div`
  height: 50vh;
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 70%;
`;

const Title = styled.h1`
  font-size: 35px;
`;

const Subtitle = styled.h4`
  font-size: 25px;
`;

const Description = styled.p`
  font-size: 20px;
`;

const Poster = styled.div`
  width: 25%;
  height: 70%;
  background-color: transparent;
  background-size: cover;
  background-image: url(${(props) => props.bg});
`;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      rating
      description_intro
      language
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });

  return (
    <Container>
      <SubContainer>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie.title} ${data.movie.isLiked ? "Like" : "Unlike"}`}</Title>
        {!loading && (
          <>
            <Subtitle>
              {data.movie.language}, {data.movie.rating}
            </Subtitle>
            <Description>{data.movie.description_intro.slice(1,300)}...</Description>
          </>
        )}
      </Column>
      <Poster bg={data && data.movie && data.movie.medium_cover_image}></Poster>
      </SubContainer>
      <SubContainer>
      {data && data.suggestions && data.suggestions.map(s=>(<Poster key={s.id} id={s.id} bg={s.medium_cover_image}/>))}
      </SubContainer>
    </Container>
  );
};
