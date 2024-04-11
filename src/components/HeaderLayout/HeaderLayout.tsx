import { Box, Container, Flex, Grid, Separator } from "@radix-ui/themes";
import Logo from "../Logo";

type Props = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export default function HeaderLayout({ left, right }: Props) {
  return (
    <>
      <Container p="2" size="2">
        <Grid columns="3" width="100%">
          <Box height="100%">
            <Flex align="center" justify="start" height="100%">
              {left}
            </Flex>
          </Box>
          <Box height="100%">
            <Flex align="center" justify="center">
              <Logo size={40} />
            </Flex>
          </Box>
          <Box height="100%" mr="0">
            <Flex align="center" justify="end" height="100%">
              {right}
            </Flex>
          </Box>
        </Grid>
      </Container>
      <Separator size="4"></Separator>
    </>
  );
}
