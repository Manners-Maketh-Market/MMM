import { MockProductsData } from "__mock__/faker-data";
import ImgSlider from "components/imgSlider";
// import styled from "styled-components";

const HomePage = () => {
  const mock = MockProductsData(10);
  console.log(mock);

  return (
    <div>
      <ImgSlider />
    </div>
  );
};

export default HomePage;

// 배너사이즈 미정(전체 크기 설정시 배너 화질이 깨져 보임)
// const Div = styled.div`
//   width: 80%;
//   margin: 0 auto;
// `;
