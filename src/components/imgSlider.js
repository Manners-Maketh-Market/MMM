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
import leftArrow from "./../images/left-arrow.png";

import { styled } from "styled-components";

const ImgSlider = ({ product, related }) => {
  // product : detailPage에서 사용할 상품의 data
  // Related : detailPage에서 사용할 관련상품의 data(Array)

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
  // Banner Img를 담아 배열로 만듦.

  const SliderSettings = {
    dots: true,
    infinite: true,
    speed: 1300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: (
      <NextTo>
        <img src={leftArrow} alt="leftArrow" />
      </NextTo>
    ),
    prevArrow: (
      <Pre>
        <img src={leftArrow} alt="rightArrow" />
      </Pre>
    ),
  };
  // Banner slider의 세팅 옵션.

  const ProductSetting = {
    dots: true,
    infinite: true,
    speed: 1300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };
  // 상품(product) slider의 셋팅 옵션.

  const RelatedProductSetting = {
    dots: true,
    infinite: true,
    speed: 1300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };
  // 관련 상품(Related) slider의 세팅 옵션.

  return (
    <>
      {/*product(상품) 값이 있을 시 product 슬라이더
      product값이 없고 related(관련 상품) 값이 있을 시 related 슬라이더
      둘 다 없을 시 banner 슬라이더 출력
    */}
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
      ) : related ? (
        <RelatedProductWrap>
          <StyledSlider {...RelatedProductSetting}>
            {related.map((img, idx) => (
              <div key={idx}>
                <RelatedProductImg src={img.Product_img[0]}></RelatedProductImg>
              </div>
            ))}
          </StyledSlider>
        </RelatedProductWrap>
      ) : (
        <StyledSlider {...SliderSettings}>
          {ImageArr.map((img) => (
            <div>
              <Img src={img}></Img>
            </div>
          ))}
        </StyledSlider>
      )}
    </>
  );
};

export default ImgSlider;

const Img = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductImg = styled.img`
  width: 580px;
  height: 580px;
  border-radius: 15px;
`;

const ProductWrap = styled.div`
  width: 580px;
  height: 580px;
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

//StyledSlider :Slider Arrow css
const StyledSlider = styled(Slider)`
  .slick-prev {
    z-index: 1;
    left: 30px;
  }

  .slick-next {
    right: 40px;
  }

  .slick-prev::before,
  .slick-next::before {
    content: none;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 30px;
    color: white;

    li button:before {
      color: white;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;

const Pre = styled.div`
  position: absolute;
  left: 3%;
  z-index: 3;

  & > img {
    width: 30px;
    height: 30px;
    transform: scaleX(0.4) scaleY(0.8);
  }
`;

const NextTo = styled.div`
  position: absolute;
  right: 3%;
  z-index: 3;

  & > img {
    width: 30px;
    height: 30px;
    transform: rotate(180deg) scaleX(0.4) scaleY(0.8);
  }
`;
