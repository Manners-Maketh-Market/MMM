import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import MMMlogo from "../../images/logo/BlackLogo.png";
import mobileLogo from "../../images/logo/MMMlogo2.png";

const Footer = () => {
  const FooterNavbar = ["회사소개", "인재채용", "채용제안", "이용약관"];
  const CompanyInfo = [
    "co.KoreaIT",
    "대표: zi존성용123",
    "주소: 서울시 강남구 역삼동 센터필드 3번출구",
    "사업자등록번호: 2023-00-00",
  ];

  return (
    <S.Wrapper>
      <S.FooterIcon src={MMMlogo} alt="Logo" />
      <S.MobileIcon src={mobileLogo} alt="mobileLogo" />

      <S.Ul>
        {FooterNavbar.map((item) => (
          <li>{item}</li>
        ))}

        <S.LastLi>개인정보처리방침</S.LastLi>
      </S.Ul>
      <S.CompanyInfo>
        {CompanyInfo.map((item) => (
          <li>{item}</li>
        ))}
      </S.CompanyInfo>

      <S.CompanyCallNumContainer>
        고객센터 <S.CompanyCallNum>00-000-0000</S.CompanyCallNum>
      </S.CompanyCallNumContainer>
      <div>copyright @ all rights reserved</div>
    </S.Wrapper>
  );
};
export default Footer;

const Wrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  ${flexCenter};
  flex-direction: column;
  width: 100%;
  height: 328px;
  font-size: ${({ theme }) => theme.FONT_SIZE.extraSmall};
  margin-top: 50px;
  & > * {
    margin: 15px;
  }
  @media ${({ theme }) => theme.DEVICE.mobile} {
    height: 560px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const FooterIcon = styled.img`
  width: 52px;
  ${flexCenter};

  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: none;
  }
`;

const MobileIcon = styled.img`
  display: none;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: block;
    /* width: 150px; */
    margin-top: 30px;
    margin-left: 10px;
  }
`;

const Ul = styled.ul`
  ${flexCenter}

  @media ${({ theme }) => theme.DEVICE.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }

  & > li {
    &:hover {
      cursor: pointer;
    }
    &:after {
      content: " | ";
      padding: 10px;
    }

    &:last-child::after {
      content: "";
    }
    @media ${({ theme }) => theme.DEVICE.mobile} {
      padding-bottom: 10px;
      &:after {
        content: "";
      }
    }
  }
`;

const LastLi = styled.li`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

const CompanyInfo = styled.ul`
  ${flexCenter}
  width: 100%;
  & > li {
    margin-right: 15px;
  }

  @media ${({ theme }) => theme.DEVICE.mobile} {
    border-top: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
    /* width: 270px; */
    width: 95%;
    color: ${({ theme }) => theme.COLORS.gray[400]};
    padding-top: 28px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    & > li {
      padding-bottom: 10px;
    }
  }
`;

const CompanyCallNumContainer = styled.p`
  @media ${({ theme }) => theme.DEVICE.mobile} {
    border-top: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
    padding-top: 28px;
    width: 95%;
  }
`;

const CompanyCallNum = styled.span`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.COLORS.gray[500]};
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
`;

const S = {
  Wrapper,
  FooterIcon,
  MobileIcon,
  Ul,
  LastLi,
  CompanyInfo,
  CompanyCallNum,
  CompanyCallNumContainer,
};
