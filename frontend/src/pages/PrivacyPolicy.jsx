import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{
            position: 'relative',
            zIndex: 99999, /* Boosted Z-Index just like the Debug version */
            backgroundColor: '#ffffff',
            padding: '60px',
            margin: '0 auto',
            maxWidth: '1000px',
            minHeight: '100vh', /* Force full height */
            color: '#000000', /* Stark black text */
            border: '2px solid #e2e8f0', /* Subtle border to see edges */
        }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
                개인정보처리방침
            </h1>

            <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '20px' }}>
                    <strong>주식회사 무아</strong>(이하 '회사')는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다.
                </p>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '40px', marginBottom: '15px', color: '#2d3748' }}>
                    1. 개인정보의 처리목적
                </h2>
                <p style={{ marginBottom: '10px' }}>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않습니다.</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '30px', marginBottom: '20px' }}>
                    <li>회원 가입 및 관리 (본인확인, 서비스 부정 이용 방지)</li>
                    <li>서비스 제공 (콘텐츠 제공, 맞춤형 서비스)</li>
                    <li>고충처리 및 분쟁 조정을 위한 기록 보존</li>
                </ul>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '40px', marginBottom: '15px', color: '#2d3748' }}>
                    2. 개인정보의 보유 및 이용기간
                </h2>
                <p style={{ marginBottom: '10px' }}>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 수집 시 동의받은 기간 내에서 개인정보를 처리·보유합니다.</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '30px', marginBottom: '20px' }}>
                    <li><strong>회원 탈퇴 시</strong>: 지체 없이 파기</li>
                    <li><strong>관계 법령 위반 시</strong>: 수사·조사 종료 시까지</li>
                </ul>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '40px', marginBottom: '15px', color: '#2d3748' }}>
                    3. 개인정보 보호책임자
                </h2>
                <div style={{ backgroundColor: '#f7fafc', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #3182ce' }}>
                    <p style={{ margin: '5px 0' }}><strong>성명</strong> : 이보안</p>
                    <p style={{ margin: '5px 0' }}><strong>직책</strong> : 보안팀장 (CISO)</p>
                    <p style={{ margin: '5px 0' }}><strong>연락처</strong> : 02-1234-5678, support@mooa-app.com</p>
                </div>

                <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', textAlign: 'center', color: '#718096' }}>
                    <p>공고일자: 2026년 1월 2일 / 시행일자: 2026년 1월 2일</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
