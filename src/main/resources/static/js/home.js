  const buttons = document.querySelectorAll('.button');
  const playButton = document.getElementById('playButton');
  let selectedHand = null;

  buttons.forEach(button => {
      button.addEventListener('click', () => {
          // 選択状態をリセット
          buttons.forEach(btn => btn.classList.remove('selected'));

          // 選択されたボタンに状態を適用
          button.classList.add('selected');
          selectedHand = button.getAttribute('data-hand');

          // 対戦開始ボタンを有効化
          playButton.classList.add('active');
          playButton.disabled = false;
      });
  });

  async function playApi(selectedHand) {
      try {
          const response = await fetch('http://localhost:8080/api/janken/play', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ userHand: selectedHand })
          });

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log(`あなたの手: ${data.userHand}\nコンピュータの手: ${data.computerHand}\n結果: ${data.result}`);
          return data;
      } catch (error) {
          console.error('APIリクエストエラー:', error);
          alert('エラーが発生しました。再試行してください。');
      }
  }

  playButton.addEventListener('click', async () => {
      if (selectedHand) {
          const result = await playApi(selectedHand); // APIリクエスト
          localStorage.setItem('userHand', result.userHand);
          localStorage.setItem('computerHand', result.computerHand);
          localStorage.setItem('result', result.result);
          window.location.href = 'result.html'; // 結果画面に遷移
      }
  });