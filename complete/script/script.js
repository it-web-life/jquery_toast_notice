$(function() {
  /** Toast本体 start */
  //　トーストの表示中インスタンス
  var toastInstance = [];

  // トーストの大枠を作成
  $toastFrame = $('<div>', { class:'toast__frame' });
  
  // トースト要素の作成
  var createToastDom = function(content) {
    // トースト通知の要素を作成
    $toast = $('<div>', { class:'toast' });

    // テキストを作成
    $text = $('<p>', { class: 'toast__text', text: content });

    // 閉じるボタンを作成
    $closeButton = $('<span>', { class:'close-button' });
    $close = $('<div>', { class:'toast__close' }).append($closeButton);

    // トースト要素にテキストと閉じるボタンを追加
    $toast.append($text, $close);

    return $toast;
  }

  /**
   * トーストを表示する
   * @param {String} text トーストで表示するテキスト
   * @param {Number | undefined} time 表示する時間
   */
  var toast = function(text, time) {
    // 表示時間 (指定がなければデフォルト5秒)
    var appearTime = time ? time : 5000;
    // トースト要素の作成
    var $toastDom = createToastDom(text);

    // トーストの要素を保存
    toastInstance.push($toastDom);
    // トースト要素を枠内に追加
    $toastFrame.append($toastDom);
    // トーストをbodyに追加
    $('body').append($toastFrame);

    // 一定時間表示後にトースト表示を消す
    setTimeout(function() {
      // トーストのインスタンスから消す
      var index = toastInstance.indexOf($toastDom);
      if (index !== -1) {
        toastInstance.splice(index, 1);
      }
      // トースト表示を消す
      $toastDom.remove();

      // 通知がすべて消えていたらトーストの大枠を消す
      if (!toastInstance.length) {
        $toastFrame.remove();
      }
    }, appearTime);

    // 閉じるボタンのクリックでトースト表示を消す
    $toastDom.find('.toast__close').on('click', function() {
      // 配列のindexを取得
      var index = toastInstance.indexOf($toastDom);
      if (index !== -1) {
        // 一致があればインスタンス配列から削除
        toastInstance.splice(index, 1);
      }
      // トースト表示を消す
      $toastDom.remove();

      // 通知がすべて消えていたらトーストの大枠を消す
      if (!toastInstance.length) {
        $toastFrame.remove();
      }
    });
  };
  /** Toast本体 end */


  /** トーストを表示する設定の例 */
  var testCount = 1;
  // テストボタンをクリックする度にトースト表示され、テキストがカウントアップします
  $('.test-button').on('click', function() {
    toast('トーストの表示です。 ' + testCount, 5000);
    testCount++;
  });
});
