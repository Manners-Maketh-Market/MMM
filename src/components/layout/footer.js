import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import Mlogo from "../../images/logo/BlackLogo.png";

const Footer = () => {
  const FooterNavbar = ["회사소개", "인재채용", "채용제안", "이용약관"];
  const CompanyInfo = ["co.KoreaIT", "ceo.zi존성용123", "주소: 서울시 강남구 역삼동 센터필드 3번출구", "사업자등록번호: 2023-00-00"];

  return (
    <S.Wrapper>
      <S.FooterIcon src={Mlogo} alt="Logo" />
      <S.Ul>
        {FooterNavbar.map((item) => (
          <li>{item} &nbsp;&nbsp; |</li>
        ))}

        <S.LastLi>개인정보처리방침</S.LastLi>
      </S.Ul>
      <S.CompanyInfo>
        {CompanyInfo.map((item) => (
          <li>{item}</li>
        ))}
      </S.CompanyInfo>

      <div>
        고객센터 <S.CompanyCallNum>00-000-0000</S.CompanyCallNum>
      </div>
      <div>copyright @ all rights reserved</div>
    </S.Wrapper>
  );
};
export default Footer;

const Wrapper = styled.div`
  border-top: 1px solid rgba(16, 13, 69, 0.2);
  ${flexCenter};
  flex-direction: column;
  width: 100%;
  height: 328px;
  font-size: ${({ theme }) => theme.FONT_SIZE.extraSmall};

  & > * {
    margin: 15px;
  }
`;

const FooterIcon = styled.img`
  width: 52px;
  ${flexCenter};
`;

const Ul = styled.ul`
  ${flexCenter}
  & > li {
    padding: 7px;
    &:hover {
      cursor: pointer;
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
`;

const CompanyCallNum = styled.span`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.COLORS.gray[500]};
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
`;

const S = {
  Wrapper,
  FooterIcon,
  Ul,
  LastLi,
  CompanyInfo,
  CompanyCallNum,
};
