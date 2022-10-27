/*
import styled from "styled-components"



const StyledDiv = styled.div `
    color: white;
    background-color: black;    
    height : 50px;
    text-align: center;
    display : flex;
`;
*/

import CalendarButton from "./Buttons/CalendarButton";
import FollowPageButton from "./Buttons/FollowPageButton";
import MyPageButton from "./Buttons/MyPageButton";
import "./Header.css";

const Header = () => {
    return (
        <div className="header-box">
            <div className="description">Do something together with your mates</div>  
            <div className="title">TogetherDo</div> 
            <div className="emptybox">
            {/* 추후에 마이페이지, 팔로우 목록 등 아이콘 추가 */}  
                <CalendarButton />
                <FollowPageButton />
                <MyPageButton />
            </div>
        </div>
    )
}

export default Header;