import { Container, AppBar, Typography, Button, Toolbar, Box} from "@mui/material";
import { SignIn } from "@clerk/nextjs"
import Link from "next/link";

export default function SignupPage() {
  return (
    <Container maxWidth="100vh">
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard Saas
          </Typography>

          <Button color="inherit">
            <Link href="/"> Home </Link>
          </Button>

          <Button color="inherit">
            <Link href="/sign-in"> Login </Link>
          </Button>

          <Button color="inherit">
            <Link href="/sign-up"> Sign Up </Link>
          </Button>

        </Toolbar>
      </AppBar>

      <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      >

        <Typography variant="h4" align="center" sx={{ mt: 5 }}> Sign In </Typography>
        <SignIn/>



      </Box>


    </Container>
  );
}
