import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import smile from "../images/icon/smile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceFrownOpen,
  faFaceLaughSquint,
  faFaceAngry,
  faFaceLaughBeam,
} from "@fortawesome/free-regular-svg-icons";

const MannerTemperature = ({ temp }) => {
  const ratio = Math.floor((temp.ondo / 100) * 100);
  const ratioColor =
    ratio <= 10
      ? "gray"
      : ratio <= 30
      ? "navy"
      : ratio <= 60
      ? "green"
      : ratio <= 80
      ? "orange"
      : "red";
  return (
    <Manner>
      <Rate>
        <Celsius color={ratioColor}>
          <p>{temp.ondo}℃</p>
        </Celsius>
        <Indicator>
          <Ratio ratio={ratio} color={ratioColor}></Ratio>
        </Indicator>
      </Rate>
      <Face color={ratioColor}>
        {ratio <= 10 ? (
          <FontAwesomeIcon icon={faFaceAngry} />
        ) : ratio <= 30 ? (
          <FontAwesomeIcon icon={faFaceFrownOpen} />
        ) : ratio <= 60 ? (
          <FontAwesomeIcon icon={faFaceSmile} />
        ) : ratio <= 80 ? (
          <FontAwesomeIcon icon={faFaceLaughBeam} />
        ) : (
          <FontAwesomeIcon icon={faFaceLaughSquint} />
        )}
      </Face>
    </Manner>
  );
};

export default MannerTemperature;

const Manner = styled.div`
  ${flexCenter}
  flex-direction: row;
  color: ${({ theme }) => theme.COLORS.primary["navy"]};

  & > img {
    margin-left: 12px;
  }
`;

const Rate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Indicator = styled.div`
  width: 140px;
  height: 8px;
  border-radius: 4px;
  //   background-color: ${({ theme }) => theme.COLORS.gray[200]};
  background-color: #eaebee;
`;

const Ratio = styled.div`
  width: ${(props) => props.ratio + "%"};
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  padding: 0;
`;

const Celsius = styled.div`
  display: flex;
  margin-bottom: 8px;

  & > p {
    font-size: ${({ theme }) => theme.FONT_SIZE["medium"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
    // color: ${({ theme }) => theme.COLORS.primary["navy"]};
    color: ${(props) => props.color};
  }

  & > img {
    margin-left: 4px;
  }
`;

const Face = styled.div`
  padding-left: 10px;
  color: ${(props) => props.color};
  font-size: 32px;
`;
