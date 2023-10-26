import { MockProductsData } from "__mock__/faker-data";
import Banner from "components/banner";

const HomePage = () => {
  const mock = MockProductsData(10);
  console.log(mock);

  return (
    <div>
      <Banner />
    </div>
  );
};

export default HomePage;
