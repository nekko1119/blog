import React, { ReactNode } from "react";
import { Box, Flex, FlexProps } from "rebass/styled-components";

export type Props = {
  children?: ReactNode;
} & FlexProps;

export const Layout: React.VFC<Props> = ({ children, ...flexProps }) => {
  return (
    <Flex justifyContent="center" {...flexProps}>
      <Box maxWidth="640px">{children}</Box>
    </Flex>
  );
};
