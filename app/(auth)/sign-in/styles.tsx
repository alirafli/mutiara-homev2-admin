import styled from "@emotion/styled";
import { SigninWrapperProps } from "./types";

export const SigninWrapper = styled.div<SigninWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 3rem 0;

  & > button:first-of-type {
    margin: 0 4rem 0 auto;

    @media (max-width: 600px) {
      margin: 0 2rem 1rem auto;
    }
  }

  // card
  & > div:nth-of-type(2) {
    margin-top: 1.5rem;
    box-shadow: ${({ mode }) =>
      mode === "dark"
        ? "rgba(43, 43, 43, 0.2) 0px 8px 24px"
        : "rgba(149, 157, 165, 0.2) 0px 8px 24px"};
    padding: 2rem;
    width: 450px;

    @media (max-width: 600px) {
      width: 85%;
    }
  }
`;

export const ImageWrapper = styled.div`
  width: 200px;
  @media (max-width: 600px) {
    width: 120px;
  }
`;
