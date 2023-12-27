import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Api } from 'apis';
import MMMInput from 'components/input';
import useInputs from 'hooks/use-inputs';
import MMMButton from 'components/button';
import Maps from './maps';
import { styled } from 'styled-components';
import { flexAlignCenter, flexCenter } from 'styles/common.style';

const RegisterPage = () => {
    // hook function: use-input
    const [{ title, price, description, category, region, tag, images }, onChangeInputs] = useInputs({
        title: '',
        price: '',
        description: '',
        category: '',
        region: '',
        tag: '',
        images: '',
    });
    const navigate = useNavigate();
    const { mutateAsync } = useMutation((Data) => Api.postMyProduct(Data));

    const onSubmitRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', e.target.title.value);
        formData.append('price', e.target.price.value);
        formData.append('description', e.target.description.value);
        formData.append('category', e.target.category.value);
        formData.append('region', e.target.region.value);
        formData.append('tag', e.target.tag.value);
        for (let i = 0; i < showImages.length; i++) {
            formData.append('images', e.target.image.files[i]);
        }

        try {
            await mutateAsync(formData);
            alert('물품 등록이 완료되었습니다.');
            navigate('/MMM/my-page');
        } catch (error) {
            error && alert('물품이 등록되지 않았습니다.');
        }
    };

    // preview uploaded images
    const [showImages, setShowImages] = useState([]);

    const onUploadImage = (e) => {
        const imageLists = e.target.files;
        let imageUrlLists = [...showImages];

        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.unshift(currentImageUrl);
        }

        if (imageUrlLists.length > 5) {
            imageUrlLists = imageUrlLists.slice(0, 5);
            alert('한 번에 이미지를 5개 이상 추가하실 수 없습니다.');
        }
        setShowImages(imageUrlLists);
    };
    const onDeleteImage = (index) => {
        let deleteList = [...showImages];
        deleteList.splice(index, 1);
        setShowImages(deleteList);
    };

    return (
        <Form onSubmit={onSubmitRegister}>
            <ImageBox>
                <label>물품 이미지</label>
                <div>
                    <AddImage
                        label="물품 이미지"
                        name="image"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={onUploadImage}
                        placeholder="이미지를 선택해주세요."
                        size={'search'}
                    />
                    <TextBox>
                        <p>클릭 또는 이미지를 드래그하여 등록할 수 있습니다.</p>
                        <p>드래그하여 상품 이미지 순서를 변경할 수 있습니다.</p>
                    </TextBox>
                </div>
                <PreviewImages>
                    {showImages.map((image, index) => (
                        <>
                            <img key={index} src={image} />
                            <button type="button" onClick={() => onDeleteImage(index)}>
                                x
                            </button>
                        </>
                    ))}
                </PreviewImages>
            </ImageBox>
            <MMMInput
                label="제목"
                name="title"
                onChange={onChangeInputs}
                placeholder="제목을 입력해주세요"
                size={'registerProduct'}
            />
            <MMMInput
                label="가격"
                name="price"
                type="number"
                onChange={onChangeInputs}
                placeholder="0원"
                size={'registerProduct'}
            />
            <Box>
                <label>거래 방식</label>
                <select name="category">
                    <option value="거래방식을 선택해주세요">거래 방식을 선택해주세요</option>
                    <option value={Number('0')}>중고 판매</option>
                    <option value={Number('1')}>무료 나눔</option>
                </select>
            </Box>
            <Box>
                <label>태그</label>
                <select name="tag">
                    <option value="태그를 선택해주세요">태그를 선택해주세요</option>
                    <option value="전자기기">전자기기</option>
                    <option value="의류">의류</option>
                    <option value="식품">식품</option>
                    <option value="남성용품">남성용품</option>
                    <option value="여성용품">여성용품</option>
                    <option value="생활용품">생활용품</option>
                    <option value="애완용품">애완용품</option>
                    <option value="집">집</option>
                  
                    <option value="연예인">연예인</option>
                    <option value="기타">기타</option>
                </select>
            </Box>
            <Box>
                <label>내용</label>
                <textarea placeholder="상품 설명을 입력해주세요" name="description" />
            </Box>
            
            <Maps />
            
            <MMMButton shape={'shape'} size={'full'} variant={'secondary'} type="submit">
                물품 등록
            </MMMButton>
        </Form>
    );
};

export default RegisterPage;

const Form = styled.form`
    // 1280+
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    ${flexAlignCenter}
    justify-content: space-evenly;
    flex-direction: column;
    padding-top: 80px;
    overflow-x: hidden;

    & > div {
        & > input {
            min-width: 954px;
            min-height: 48px;
        }
    }
    & > button {
        min-width: 954px;
        min-height: 46px;
        margin: 80px 0;
    }

    @media ${({ theme }) => theme.DEVICE.smallMobile} {
        max-width: 240px;
        padding-top: 100px;

        & > div {
            & > input {
                min-width: 200px;
                min-height: 38px;
                border-radius: 4px;
                font-size: 10px;
            }
            & > label,
            & > p {
                font-size: 10px;
            }
        }
        & > button {
            min-width: 200px;
            min-height: 38px;
            border-radius: 4px;
            font-size: 10px;
            margin: 40px 0 60px;
        }
    }
    @media ${({ theme }) => theme.DEVICE.tablet2} {
        ${flexCenter}
        max-width: 400px;
        padding-top: 160px;

        & > div {
            & > input {
                min-width: 320px;
                min-height: 42px;
                border-radius: 6px;
                font-size: 12px;
            }
            & > label,
            & > p {
                font-size: 12px;
            }
        }
        & > button {
            min-width: 320px;
            min-height: 42px;
            border-radius: 6px;
            font-size: 12px;
        }
    }
    @media ${({ theme }) => theme.DEVICE.laptop} {
        ${flexCenter}
        max-width: 954px;

        & > div {
            & > input {
                min-width: 620px;
                min-height: 48px;
                font-size: ${({ theme }) => theme.FONT_SIZE['extraSmall']};
            }
            & > label,
            & > p {
                font-size: ${({ theme }) => theme.FONT_SIZE['extraSmall']};
            }
        }
        & > button {
            min-width: 620px;
            min-height: 46px;
            font-size: ${({ theme }) => theme.FONT_SIZE['extraSmall']};
        }
    }
`;

const Box = styled.div`
    max-width: 954px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    & > label {
        margin-left: 12px;
        margin-bottom: 4px;
    }

    & > textarea {
        min-width: 954px;
        min-height: 264px;
        border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
        border-radius: 7px;
        resize: none;
        padding: 20px 0 0 16px;
        margin-bottom: 20px;
    }

    & > select {
        width: 954px;
        height: 48px;
        border-radius: 6px;
        border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
        padding: 0 10px;
    }

    @media ${({ theme }) => theme.DEVICE.smallMobile} {
        max-width: 240px;

        & > textarea {
            min-width: 200px;
            min-height: 220px;
            padding: 20px;
            font-size: 10px;
        }
        & > select {
            width: 200px;
            height: 38px;
            border-radius: 4px;
            font-size: 10px;
        }
    }
    @media ${({ theme }) => theme.DEVICE.tablet2} {
        max-width: 400px;

        & > textarea {
            min-width: 320px;
            padding: 20px;
            font-size: 12px;
        }
        & > select {
            width: 320px;
            height: 42px;
            border-radius: 6px;
            font-size: 12px;
        }
    }
    @media ${({ theme }) => theme.DEVICE.laptop} {
        max-width: 954px;

        & > textarea {
            min-width: 620px;
            padding: 30px;
            font-size: ${({ theme }) => theme.FONT_SIZE['extraSmall']};
        }
        & > select {
            width: 620px;
            height: 48px;
            font-size: ${({ theme }) => theme.FONT_SIZE['extraSmall']};
        }
    }
`;

const ImageBox = styled.div`
    max-width: 954px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;

    & > label {
        min-width: 930px;
        margin-bottom: 20px;
    }

    & > div {
        text-align: center;
        justify-content: center;
    }

    @media ${({ theme }) => theme.DEVICE.smallMobile} {
        min-width: 400px;

        & > label {
            padding-left: 41%;
            margin-bottom: 10px;
        }
        & > div {
            margin-left: 0%;
        }
    }
    @media ${({ theme }) => theme.DEVICE.tablet2} {
        min-width: 400px;

        & > label {
            padding-left: 34%;
        }
        & > div {
            margin-left: 0%;
        }
    }
    @media ${({ theme }) => theme.DEVICE.laptop} {
        min-width: 954px;
        & > label {
            padding-left: 18%;
        }
        & > div {
            margin-left: 0%;
        }
    }
`;
const AddImage = styled.input`
    max-width: 200px;
    height: 200px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
    border-radius: 10px;

    &::file-selector-button {
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.COLORS['white']};
        border: none;
        background: no-repeat center;
    }

    @media ${({ theme }) => theme.DEVICE.smallMobile} {
        max-width: 140px;
        height: 140px;
        font-size: 10px;
    }
    @media ${({ theme }) => theme.DEVICE.tablet2} {
        max-width: 160px;
        height: 160px;
        font-size: 12px;
    }
`;
const TextBox = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.COLORS.gray[400]};
    margin-top: 20px;
    text-align: center;

    & > p {
        padding: 2px 0;
    }

    @media ${({ theme }) => theme.DEVICE.smallMobile} {
        font-size: 8px;
    }
    @media ${({ theme }) => theme.DEVICE.tablet2} {
        font-size: 10px;
    }
`;
const PreviewImages = styled.div`
    ${flexCenter}
    width: 100%;
    height: 100px;
    margin: 5% 0;

    & > img {
        width: 100px;
        height: 100px;
        border: none;
        background-color: #f1f1f1;
        border-radius: 6px;
        margin: 0 1%;
    }

    & > button {
        position: relative;
        right: 3.5%;
        top: -36%;
        border-radius: 50%;
        color: #eee;
        background-color: rgba(0, 0, 0, 0.3);
        transition: all 0.6s;

        &:hover {
            color: #111;
            background-color: #eee;
        }
    }
    @media ${({ theme }) => theme.DEVICE.smallMobile} {
        margin: 0;

        & > img {
            width: 30px;
            height: 30px;
            margin: 0 4px;
            border-radius: 4px;
        }
        & > button {
            width: 5px;
            height: 5px;
            right: 2%;
            top: -8%;
            font-size: 8px;
            text-align: center;
        }
    }
    @media ${({ theme }) => theme.DEVICE.tablet2} {
        margin: 3% 0 0;

        & > img {
            width: 60px;
            height: 60px;
        }
        & > button {
            right: 3.2%;
            top: -18%;
        }
    }
`;
