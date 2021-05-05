import type { FC, ReactNode } from "react";
import { Box } from "rebass/styled-components";
import { GlobalHeader } from "../organisms/GlobalHeader";
import { Layout } from "../templates/Layout";

export type Props = {
  children?: ReactNode;
};

export const Main: FC<Props> = ({ children }) => {
  return (
    <Box minWidth="100%" minHeight="100%" bg="background" color="text">
      <GlobalHeader />
      <Layout mt="64px">
        <Box as="main">{children}</Box>
      </Layout>
    </Box>
  );
};
