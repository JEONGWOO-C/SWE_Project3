import { BiUser, BiCog } from "react-icons/bi";
export const ChatSelect = ({ item, onClick }) => {
    return(
        <div onClick={(e) => onClick(e)} /* 클릭하면 오른쪽에 chat_detail 띄워주기 */
            style={{
            borderBottom: 'solid 1px #ababab',
            cursor: 'pointer'
            }}
        >
            <div style={{ width: '30%', height: '60px', float: 'left' }}>
                <BiUser style={{ width: '100%', height: '100%' }} />
            </div>
            <div>
                <div>
                    {/* 사용자 닉네임 */}
                    <div style={{ width: '50%', float: 'left', fontSize: '19px', fontWeight: 'bold' }}>
                    {item.username}
                    </div>
                    {/* 마지막 채팅 시간 */}
                    <div style={{ color: '#ababab', fontWeight: 'lighter' }}>
                    4분전
                    </div>
                </div>
                {/* 마지막 채팅 내용 */}
                <div style={{ paddingTop: '15px', marginBottom: '12px' }}>
                    아아아아아아아아
                </div>
            </div>
        </div>
    )
};