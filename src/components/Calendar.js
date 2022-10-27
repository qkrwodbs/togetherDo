import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from '@fullcalendar/moment';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import Modal from "./Modal";

import React, { useState, useEffect, useRef } from 'react';
import "./Calendar.css"

//달력에 선을 지우고 몇개는 굵게.. 커스텀으로 정하고싶음
//버튼 색상, 모양 같은 것도
//공휴일은 못 옮기게하기, 색상 설정해주기
const Calendar = () => {
  //event data
  const [eventArr, setEventArr] = useState([]);
  //modal open
  const [modalOpen, setModalOpen] = useState(false);
  //selected Date
  const [dateInfo, setDateInfo] = useState("");
  //event ID
  const [eventID, setEventID] = useState(0);
  //useRefs
  const startTimeRef = useRef("");
  const endTimeRef = useRef("");
  const eventRef = useRef("");

  // useEffect( () => {
  //   console.log(`useEffect : ${[eventArr]}`);
  // },[eventArr]);

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };


  //날짜 클릭 시
  const handleDateClick = (info) => {
    openModal();
    console.log(info.dateStr);
    setDateInfo(info.dateStr);
  }
  useEffect(() => { //dataInfo가 변경된 렌더링에만 실행
    if (!!dateInfo) { //dataInfo가 존재한다면 콘솔 출력
      console.log("dateInfo : ", dateInfo);
    }
    //dispatch()
  }, [dateInfo]);
  

  //모달 저장 버튼 클릭시 이벤트
  const onSaveEvent = (e) => {
    //console.log(calendar);
    const startTime = `${dateInfo}T${startTimeRef.current.value}`;
    const endTime = `${dateInfo}T${endTimeRef.current.value}`;
    const eventContent = eventRef.current.value;
    const eventObj = {
      id : eventID,
      title: eventContent,
      start: startTime,
      end: endTime,
      
    };
    setEventID(eventID+1);
    console.log(eventObj);
    //calendar.addEvent({eventObj});
    setEventArr([...eventArr, eventObj]);
    //console.log(eventArr);
    //return eventObj;
  };


  // 이벤트(일정) 클릭 시
  const handleEventClick = (info) => {
    //console.log("info 입니다.",info);
    //console.log(eventArr);

    //defId를 이용해서 삭제할 방법?

    /*
    if(info.event._def.url !== "") { //일단 임시로 url 존재하는 경우만 막아둠.. 
      //클릭시 구글캘린더 url로 가는것을 막는다.
      info.jsEvent.stopPropagation();
      info.jsEvent.preventDefault();
    }      
      alert('Event : ' + info.event.title);
      //이미 생성되어있는 event를 클릭 할 시 event 수정할 수 있도록 구현하기

      */
     
      const id = info.event._def.publicId; ////클릭한 일정 Id
      console.log("삭제할 ID :",id);
      console.log("삭제전 eventArr : " ,eventArr);
      eventArr.map((event)=>console.log(event.id));
      const newEventArr = eventArr.filter(event => event.id != id);
      console.log("newEventArr 입니다.",newEventArr);
      setEventArr(newEventArr);

      //evenArr.forEach(function(evt) {
      //      if (evt._def.defId == id) evt.remove();
      //});
  }

    return (
      <div className = "calendar-box">
        <FullCalendar
        plugins={[ momentPlugin, dayGridPlugin , interactionPlugin, 
          googleCalendarPlugin, timeGridPlugin]}
        defaultView="dayGridMonth"
        titleFormat = 'YYYY년 MM월' //달력 타이틀 형식

        customButtons={{myCustomButton : {
            text : 'custom!',
            click : () => alert('clicked the custom button!')
        }
        }}

        headerToolbar={{ //상단에 10월 2022년 뜨는 거
          left : '',        
          center: 'prev title next',
          right: 'today'
        }}

        //locale = "ko" //한국어
        /*
        dayHeaderContent = {(date)=>{ //요일을 한글로 표기
          let weekList = ["일", "월", "화", "수", "목", "금", "토"];
          return (weekList[date.dow]);
        }}
*/
        editable={true}
        selectable={true}
        //fixedWeekCount = {false} // 5주만 보일지 6주만 보일지 고정하는 기능!
        contentHeight = {600} //달력의 높이 설정
        events={eventArr}
        
        
/*
        googleCalendarApiKey={'AIzaSyDE-xlz3yWlxQUFjFWCmiQZbswcbIUzvNA'} //구글 캘린더 API Key
        eventSources = {[
          {googleCalendarId : 'qduatr3seur835pk4aolok2900@group.calendar.google.com' //대한민국 공휴일 캘린더
          , classNames : 'ko_event', color : 'white', textColor : 'red' },

        ]}
*/ 
        dateClick = {handleDateClick}
        eventClick = {handleEventClick}
        
        />

        <Modal open={modalOpen} close={closeModal} header={dateInfo}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            rowGap: "10px",
          }}
        >
          <div>
            <span>시간 설정</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <input type="time" ref={startTimeRef} />
            <input type="time" ref={endTimeRef} />
          </div>
          <div>
            <span>일정</span>
          </div>
          <div>
            <textarea
              ref={eventRef}
              style={{ resize: "none", width: "100%" }}
            ></textarea>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            style={{
              backgroundColor: "green",
              padding: "5px 10px",
              color: "white",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "16px",
            }}
            onClick={onSaveEvent}
          >
            저 장
          </button>
        </div>
      </Modal>

        </div>
    )

    
  }

  
export default Calendar;