// import { MockProductsData } from "__mock__/faker-data";
import ImgSlider from "components/imgSlider";
import ProductList from "./components/product-list";

const HomePage = () => {
  // useQuery
  // useMutation을 사용하는 이유가 데이터를 생성 / 업데이트 / 삭제할 때 주로 사용한다하는데.
  // 쿼리는? 백엔드 전역상태관리 아 백엔드의 데이터를 전역상태 관리할 때 사용
  // 빡대가린가봐 기억이 안나

  /**
  상위 컴포넌트에 
  const queryClient = new QueryClient();
  <QueryClientProvider client={queryClient}> 
  <components/>
  <QueryClientProvider/> 

  const {data, isLoading ...} = useQuery({
    queryKey : [""],
    queryFn : function(Api함수),
    }
  })

const key = atom({
    key,
    default    
})
아~ 왜 쓰는지 알겠다 이제 내가 원하는 부분만 랜더시켜줄려고
const [state, setState] = useRecoilState(key)
두 값이 모두 쓰일 때는 useRecoilState,
초기값만 쓰일 때는 useRecoilValue,
set값이 쓰일 때는 useSetRecoilState,
   */

  return (
    <>
      <ImgSlider />
      <ProductList />
    </>
  );
};

export default HomePage;

// 배너사이즈 미정(전체 크기 설정시 배너 화질이 깨져 보임)
// const Div = styled.div`
//   /* width: 80%; */
//   margin: 0 auto;
// `;
