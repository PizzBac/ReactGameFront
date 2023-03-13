// 서버 실행 방법 : cd로 server.js가 있는 파일까지 내려와서 node Server.js 터미널에 입력

// 모듈 가져오기
const sockjs = require('sockjs');

// SockJS 서버 객체를 생성
const sockjs_server = sockjs.createServer();

// 클라이언트가 연결되면 실행되는 이벤트 핸들러
sockjs_server.on('connection', function (conn) {
    console.log('클라이언트와 서버 연결됨');

    // 클라이언트가 데이터를 전송할 때마다 실행되는 이벤트 핸들러
    conn.on('data', function (message) {
        console.log('received: ' + message);

        // 클라이언트로 응답을 보내는 이벤트 핸들러
        conn.write('you said: ' + message);
    });

    // 클라이언트와의 연결이 끊어질 때 실행되는 이벤트 핸들러
    conn.on('close', function () {
        console.log('서버 연결 끊김');
    });
});

// 서버 시작
const server = sockjs_server.installHandlers(require('http').createServer().listen(3001, '0.0.0.0'), { prefix: '/socket' });

console.log('서버 시작함');