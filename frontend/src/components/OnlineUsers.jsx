import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { FaChevronRight, FaChevronLeft, FaUsers } from 'react-icons/fa6';

const OnlineUsers = ({ currentUser }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isFolded, setIsFolded] = useState(false); // Default to open, or true if you want it closed initially
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;

    const socket = new SockJS('/ws');
    const client = Stomp.over(socket);

    // 디버그 로그 비활성화
    client.debug = null;

    client.connect({}, () => {
      setIsConnected(true);

      // 온라인 사용자 목록 구독
      client.subscribe('/topic/presence', (message) => {
        const users = JSON.parse(message.body);
        setOnlineUsers(users);
      });

      // 자신의 접속을 알림
      client.send('/app/presence/join', {}, JSON.stringify({
        username: currentUser.username
      }));
    });

    // 컴포넌트 언마운트 또는 페이지 이탈 시 처리
    const handleBeforeUnload = () => {
      if (client && client.connected) {
        client.send('/app/presence/leave', {}, JSON.stringify({
          username: currentUser.username
        }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (client && client.connected) {
        client.send('/app/presence/leave', {}, JSON.stringify({
          username: currentUser.username
        }));
        client.disconnect();
      }
    };
  }, [currentUser]);

  // Click outside to fold
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsFolded(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!currentUser) return null;

  return (
    <div
      className={`online-users-sidebar ${isFolded ? 'folded' : ''}`}
      ref={sidebarRef}
    >
      {/* Toggle Button */}
      <button
        className="online-users-toggle-btn"
        onClick={() => setIsFolded(!isFolded)}
        title={isFolded ? "친구 목록 펼치기" : "친구 목록 접기"}
      >
        {isFolded ? <FaUsers /> : <FaChevronRight />}
      </button>

      <div className="online-users-header">
        <h3>접속 중인 친구</h3>
        <span className="online-count">{onlineUsers.length}명</span>
      </div>

      <div className="online-users-divider"></div>

      {onlineUsers.length === 0 ? (
        <p className="online-users-empty">
          {isConnected ? '접속 중인 친구가 없습니다' : '연결 중...'}
        </p>
      ) : (
        <div className="online-users-list">
          {onlineUsers.map((username) => (
            <div
              key={username}
              className={`online-user-item ${username === currentUser.username ? 'is-me' : ''}`}
            >
              <div className="user-avatar">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">
                  {username}
                  {username === currentUser.username && ' (나)'}
                </span>
                <span className="user-status">
                  <span className="status-dot"></span>
                  온라인
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnlineUsers;
