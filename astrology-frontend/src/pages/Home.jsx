import { Hero } from '../Components/Home/hero';
import { Scutbtn } from "../Components/Home/scutbtn";
import About from '../Components/Home/about';
import NumerologySections from '../Components/Home/NumerologySections';

const Home = () =>{
    return (
        <>
            <Hero/>
            <Scutbtn />
            <About/>
            <NumerologySections/>
        </>
    )
}

export default Home;