import React, { ReactNode } from "react";
import { Box, Flex, FlexProps } from "rebass/styled-components";

export type Props = {
  children?: ReactNode;
} & FlexProps;

export const Layout: React.VFC<Props> = ({ children, ...flexProps }) => {
  return (
    <Flex justifyContent="center" {...flexProps}>
      <Box
        minWidth={[null, "calc(640px - (100vw - 100%))"]}
        maxWidth={["calc(100vw - (100vw - 100%))", "calc((100vw/ 3) + 40px)"]}
        px="40px"
      >
        {children}
      </Box>
    </Flex>
  );
};
