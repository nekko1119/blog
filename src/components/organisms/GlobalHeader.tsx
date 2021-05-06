import { useContext, FC } from "react";
import Link from "next/link";
import { Box, Flex, Text } from "rebass/styled-components";
import { ThemeContext } from "../../themeContext";

export const GlobalHeader: FC<{}> = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <Box
      as="header"
      width="100%"
      height="64px"
      bg="background"
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        borderBottomWidth: "1px",
        borderBottomColor: "border",
        borderBottomStyle: "solid",
      }}
    >
      <Flex height="100%" alignItems="center" justifyContent="space-between" mx="40px">
        <Text as="h1">
          <Link href="/" passHref>
            <Box as="a" fontSize="1.5rem" color="text" sx={{ textDecoration: "none" }}>
              blog.nekko1119.org
            </Box>
          </Link>
        </Text>
        {/*  disable theme feature */}
        <Box display="none" as="button" onClick={toggleTheme}>
          Toggle Theme
        </Box>
      </Flex>
    </Box>
  );
};
