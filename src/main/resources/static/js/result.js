// ローカルストレージからデータを取得
const userHand = localStorage.getItem('userHand') || '✊';
const computerHand = localStorage.getItem('computerHand') || '✌';
const result = localStorage.getItem('result') || '引き分け';

// 画像のマッピング
const handImages = {
    'グー': './images/janken_gu.png',
    'チョキ': './images/janken_choki.png',
    'パー': './images/janken_pa.png',
};

// 画像を設定
document.getElementById('userHandImage').src = handImages[userHand] || '';
document.getElementById('userHandImage').alt = `あなたの手: ${userHand}`;
document.getElementById('computerHandImage').src = handImages[computerHand] || '';
document.getElementById('computerHandImage').alt = `コンピュータの手: ${computerHand}`;

// 結果を表示
document.getElementById('resultMessage').textContent = `結果: ${result}`;

// 「もう一度対戦する」ボタンのイベント
document.getElementById('retryButton').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html'; // ホーム画面に戻る
});
