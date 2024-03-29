import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image0 from "./../images/image0.png";
import image1 from "./../images/image1.png";
import image3 from "./../images/image3.png";
import image5 from "./../images/image5.png";
import image6 from "./../images/image6.png";
import image7 from "./../images/image7.png";
import leftArrow from "./../images/left-arrow.png";
import DownArrow from "./../images/down-arrow.png";
import whiteArrow from "./../images/white-arrow2.png";
import { styled } from "styled-components";
import UseNavigation from "hooks/use-navigation";
import MaxLength from "utils/max-length-overflow";

const ImgSlider = ({ product, related }) => {
  // product : detailPage에서 사용할 상품의 data
  // Related : detailPage에서 사용할 관련상품의 data(Array)
  const { skipTitleView } = MaxLength();
  const { goToDetailPage } = UseNavigation();

  const ImageArr = [image0, image1, image3, image5, image6, image7];

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
    nextArrow: (
      <DetailNext>
        <img src={whiteArrow} alt="leftArrow" />
      </DetailNext>
    ),
    prevArrow: (
      <DetailPrev>
        <img src={whiteArrow} alt="rightArrow" />
      </DetailPrev>
    ),
  };
  // 상품(product) slider의 셋팅 옵션.

  const RelatedProductSetting = {
    dots: false,
    infinite: false,
    speed: 1300,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
    ],

    nextArrow: (
      <RelatedNext>
        <img src={DownArrow} alt="leftArrow" />
      </RelatedNext>
    ),
    prevArrow: (
      <RelatedPrev>
        <img src={DownArrow} alt="rightArrow" />
      </RelatedPrev>
    ),
  };
  // 관련 상품(Related) slider의 세팅 옵션.

  const onClickToDetailPage = (id) => {
    goToDetailPage(id);
    window.scrollTo({ top: 0 });
  };
  return (
    <>
      {/*product(상품) 값이 있을 시 product 슬라이더
      product값이 없고 related(관련 상품) 값이 있을 시 related 슬라이더
      둘 다 없을 시 banner 슬라이더 출력
    */}
      {product ? (
        <ProductWrap>
          <StyledDetailProduct {...ProductSetting}>
            {/*{product.ProductImages.map((img, idx) => ())}*/}
            <ProductImages>
              <ProductImg src={product.img_url}></ProductImg>
            </ProductImages>
            {product.ProductImages.map((image) => (
              <ProductImages>
                <ProductImg src={image.img_url} />
              </ProductImages>
            ))}
          </StyledDetailProduct>
        </ProductWrap>
      ) : related ? (
        <RelatedProductWrap>
          <StyledSlider {...RelatedProductSetting}>
            {related.map((item, idx) => (
              <RelatedOption key={idx}>
                <RelatedProductImg
                  src={item.img_url}
                  onClick={() => onClickToDetailPage(item.idx)}
                ></RelatedProductImg>
                <p>{skipTitleView(item.title)}</p>
              </RelatedOption>
            ))}
          </StyledSlider>
        </RelatedProductWrap>
      ) : (
        <StyledBanner {...SliderSettings}>
          {ImageArr.map((img) => (
            <BannerImgWrap>
              <Img src={img}></Img>
            </BannerImgWrap>
          ))}
        </StyledBanner>
      )}
    </>
  );
};

export default ImgSlider;

const RelatedOption = styled.div`
  text-align: center;

  & > p {
    padding-top: 14px;
    font-size: 20px;
    font-weight: bold;
    width: 180px;
  }
`;

const BannerImgWrap = styled.div`
  width: 100%;
  cursor: pointer;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    position: relative;
    overflow: hidden;
    display: inline-block;
    min-height: 200px;
    /* padding-right: 50px; */
  }
`;

const Img = styled.img`
  width: 100%;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    /* position: absolute; */
    /* top: 0;
    left: -50%;
    height: 250px; */
    /* width: 1000px; */
    width: 150%;
    position: absolute;
    top: 0;
    left: -25%;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`;
const ProductImages = styled.div`
  width: 580px;
  height: 580px;
`;
const ProductImg = styled.img`
  object-fit: cover;
  width: 580px;
  height: 580px;
  border-radius: 15px;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 100%;
    height: 100%;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 100%;
    height: 100%;
  }
`;

const ProductWrap = styled.div`
  width: 580px;
  //원래 580px
  height: 580px;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 100%;
    height: 100%;
  }

  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 100%;
    height: 100%;
  }
`;

const RelatedProductImg = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 15px;
`;

const RelatedProductWrap = styled.div`
  width: 976px;
  height: 180px;
  margin: 60px auto;
  cursor: pointer;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 100%;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 100%;
  }
`;

//StyledSlider :Slider Arrow css
const StyledSlider = styled(Slider)`
  .slick-prev {
    z-index: 1;
    left: -50px;
    top: 90px;
  }

  .slick-next {
    right: -40px;
    top: 90px;
  }

  .slick-prev::before,
  .slick-next::before {
    content: none;
  }

  .slick-slide {
    padding-right: 20px;
  }
`;

const StyledDetailProduct = styled(Slider)`
  .slick-prev {
    z-index: 1;
    left: 30px;
    width: 50px;
    height: 50px;
    background-color: rgba(30, 30, 30, 0.5);
    border-radius: 50%;
    padding: 9px;
  }

  .slick-next {
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: rgba(30, 30, 30, 0.5);
    border-radius: 50%;
    padding: 9px 7px 9px 11px;
  }

  .slick-prev::before,
  .slick-next::before {
    content: none;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: -30px;
    color: black;

    //bottom-dot
    li button:before {
      color: gray;
      font-size: 12px;
    }

    li.slick-active button:before {
      color: gray;
    }
  }
`;

const StyledBanner = styled(Slider)`
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

    //bottom-dot
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

const RelatedPrev = styled.div`
  & > img {
    width: 30px;
    height: 30px;
    transform: rotate(90deg) scaleX(1) scaleY(1.1);
  }
`;

const RelatedNext = styled.div`
  & > img {
    width: 30px;
    height: 30px;
    transform: rotate(270deg) scaleX(1) scaleY(1.1);
  }
`;

const DetailPrev = styled.div`
  & > img {
    width: 30px;
    height: 30px;
    transform: rotate(180deg);
  }
`;

const DetailNext = styled.div`
  & > img {
    width: 30px;
    height: 30px;
  }
`;
