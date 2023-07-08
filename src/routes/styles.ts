import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  gap: 0;
`;

export const PageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  max-height: 100vh;
`;

export const PageContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  max-height: calc(100vh - 20px);
  min-height: calc(100vh - 60px);
  height: 100%;

  width: 100%;
`;

export const Page = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 80px;

  flex: 1;

  width: 100%;
  height: 100%;
  padding: 1rem;
`;
