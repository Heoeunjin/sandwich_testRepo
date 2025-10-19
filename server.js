const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 서빙
app.use(express.static('.'));

// 메인 페이지 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 환경변수 API 엔드포인트 (개발용)
app.get('/api/config', (req, res) => {
  res.json({
    siteTitle: process.env.SITE_TITLE || 'Creative Portfolio',
    siteDescription: process.env.SITE_DESCRIPTION || 'Creating immersive web solutions',
    contactEmail: process.env.CONTACT_EMAIL || 'contact@creativeportfolio.com',
    nodeEnv: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// 헬스체크 엔드포인트
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다`);
  console.log(`📱 환경: ${process.env.NODE_ENV}`);
  console.log(`🌐 접속: http://localhost:${PORT}`);
});
