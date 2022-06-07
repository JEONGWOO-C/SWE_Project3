import styled from 'styled-components';


export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-items: left;
  justify-content: left;
  
`;
export const ProducBody = styled.div`
  padding-right: 64px;
  padding-left: 64px;
  padding-bottom: 64px;
  padding-top: 8px;
`;
export const Title = styled.div`
  padding-top: 48px;
  padding-bottom : 64px;
  padding-left: 64px;
  font-size: 40px;
  font-weight: bold;
`
export const Product = (logo, name, price) =>{
  // 화면을 채울 정도의 개수보다 작을경우 데이터가 없을 수 있음
 if(name == '없음'){ // 데이터가 없으면
 return(
   <div></div>
 )}
 return(
   <ProducBody>
         <div>
           <img src={logo} width={128} height={128} alt="logo" />
           </div>
         <div>{name}</div>
         <div>{price}</div>
   </ProducBody>
 )
}