import { CardContainer } from "./components/CardContainer/CardContainer";
import Carousel from "./components/Carousel/caroulsel";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Carousel />
      <CardContainer />
    </>
  )
}