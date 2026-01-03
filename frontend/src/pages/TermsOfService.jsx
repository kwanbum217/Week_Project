import React, { useEffect } from 'react';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{
            position: 'relative',
            zIndex: 9999,
            backgroundColor: '#ffffff',
            padding: '40px',
            margin: '20px auto',
            maxWidth: '1000px',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            minHeight: '80vh',
            color: '#333333',
            fontFamily: 'sans-serif'
        }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
                서비스 이용약관
            </h1>

            <div style={{ lineHeight: '1.6' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px', color: '#2d3748' }}>
                    제1조 (목적)
                </h3>
                <p style={{ marginBottom: '10px' }}>
                    본 약관은 주식회사 무아(이하 "회사")가 제공하는 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 회원의 권리, 의무 및 책임사항 등 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px', color: '#2d3748' }}>
                    제2조 (용어의 정의)
                </h3>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                    <li>"회원"이라 함은 회사의 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
                    <li>"아이디(ID)"라 함은 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을 의미합니다.</li>
                    <li>"비밀번호"라 함은 회원이 부여 받은 아이디와 일치되는 회원임을 확인하고 비밀보호를 위해 회원 자신이 정한 문자 또는 숫자의 조합을 의미합니다.</li>
                </ul>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px', color: '#2d3748' }}>
                    제3조 (약관의 게시와 개정)
                </h3>
                <p style={{ marginBottom: '10px' }}>
                    1. 회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.<br />
                    2. 회사는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                </p>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px', color: '#2d3748' }}>
                    제4조 (회원가입)
                </h3>
                <p style={{ marginBottom: '10px' }}>
                    1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.<br />
                    2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
                </p>
                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginBottom: '20px' }}>
                    <li>가입신청자가 이 약관 이전에 회원자격을 상실한 적이 있는 경우</li>
                    <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                </ul>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px', color: '#2d3748' }}>
                    제5조 (서비스의 제공 및 변경)
                </h3>
                <p style={{ marginBottom: '10px' }}>
                    회사는 회원에게 다음과 같은 서비스를 제공합니다.
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                    <li>커뮤니티 서비스</li>
                    <li>정보 제공 서비스</li>
                    <li>기타 회사가 정하는 서비스</li>
                </ul>

                <div style={{ textAlign: 'right', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '0.9rem', color: '#718096' }}>
                    <p>공고일자: 2026년 1월 2일</p>
                    <p>시행일자: 2026년 1월 2일</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
