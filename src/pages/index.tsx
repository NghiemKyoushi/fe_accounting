import Head from "next/head";
import { Inter } from "next/font/google";
import { Layout as DashboardLayout } from "../../src/layouts/dashboard/layout";

const inter = Inter({ subsets: ["latin"] });

// const Home = () => (
//   <>
//     <Head>
//       <title>Create Next App</title>
//       <meta name="description" content="Generated by create next app" />
//       <meta name="viewport" content="width=device-width, initial-scale=1" />
//       <link rel="icon" href="/favicon.ico" />
//     </Head>
//   </>
// );
// Home.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
// export default Home;
export default function Home() {
  return(
    <DashboardLayout/> 
  )
}