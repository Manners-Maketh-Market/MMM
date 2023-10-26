import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image0 from "./../images/image0.png";
import image1 from "./../images/image1.png";
import image2 from "./../images/image2.png";
import image3 from "./../images/image3.png";
import image4 from "./../images/image4.png";
import image5 from "./../images/image5.png";
import image6 from "./../images/image6.png";
import image7 from "./../images/image7.png";

import { styled } from "styled-components";

const Banner = ({ product, Related }) => {
  const ImageArr = [
    image0,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
  ];

  const SliderSettings = {
    dots: false,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const ProductSetting = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const RelatedProductSetting = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <>
      {product ? (
        <ProductWrap>
          <StyledSlider {...ProductSetting}>
            {product.Product_img.map((img, idx) => (
              <div key={idx}>
                <ProductImg src={img}></ProductImg>
              </div>
            ))}
          </StyledSlider>
        </ProductWrap>
      ) : Related ? (
        <RelatedProductWrap>
          <StyledSlider {...RelatedProductSetting}>
            {Related.map((img, idx) => (
              <div key={idx}>
                <RelatedProductImg src={img.Product_img[0]}></RelatedProductImg>
              </div>
            ))}
          </StyledSlider>
        </RelatedProductWrap>
      ) : (
        <div>
          <Slider {...SliderSettings}>
            {ImageArr.map((img) => (
              <div>
                <Img src={img}></Img>
              </div>
            ))}
          </Slider>{" "}
        </div>
      )}
    </>
  );
};

export default Banner;

const Img = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const ProductWrap = styled.div`
  width: 428px;
  height: 428px;
`;

const RelatedProductImg = styled.img`
  width: 165px;
  height: 165px;
  border-radius: 15px;
`;

const RelatedProductWrap = styled.div`
  width: 80%;
  height: 220px;
`;

const StyledSlider = styled(Slider)`
  margin-left: 19%;
  width: 60%;
  text-align: center;

  .slick-list {
    overflow: hidden;
    height: 15.5vw;
    text-align: center;
  }

  .slick-arrow {
    display: flex;
    z-index: 10;
    width: 1vw;
    height: 1vw;
  }

  .slick-prev {
    left: -1.2vw;
    cursor: pointer;
    &::before {
      content: "";
    }
  }

  .slick-next {
    right: -1.1vw;
    cursor: pointer;
    &::before {
      content: "";
    }
  }
`;
