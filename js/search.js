//パラメータを配列に変換する関数
function getParameter(str){
  var dec = decodeURIComponent;
  var par = new Array, itm;
  if(typeof(str) == 'undefined') return par;
  if(str.indexOf('?', 0) > -1) str = str.split('?')[1];
  str = str.split('&');
  for(var i = 0; str.length > i; i++){
    itm = str[i].split("=");
    if(itm[0] != ''){
      par[itm[0]] = typeof(itm[1]) == 'undefined' ? true : dec(itm[1]);
    }
  }
  return par;
}

$(document).ready(function() {
  
  //URLパラメータを配列に変換
  var paramArray = getParameter(location.search);
  console.log(paramArray);
  
  //表示用の文字列に修正
  if(paramArray.word)
    paramArray.word = paramArray.word.replace('+', ' ');
  else
    paramArray.word = '';
  
  if(paramArray.tag)
    true;//paramArray.tag = '#' + paramArray.tag.replace('+', ' #');
  else
    paramArray.tag = '';
  
  //ワード内に該当文字列がない場合は目的のファイルを非表示
  var $purpose = $('#purpose').hide();
  if(paramArray.word.match(/開発|Ruby|Ｒｕｂｙ|しまだ塾|アプリ/i))
    $purpose.show();
  if(paramArray.tag.match(/Ruby|しまだ塾/))
    $purpose.show();
  
  //pagingの各リンクにパラメータ設定
  var $paginglinks = $('.paging').find('a');
  var pagingLinkStr = $paginglinks.attr('href');
  $paginglinks.attr('href', pagingLinkStr + '?word=' + paramArray.word + '&tag=' + paramArray.tag)
  
  //各要素に文字列挿入
  $('.search-words').text(paramArray.word + paramArray.tag);
  $('.freeword [name="word"]').val(paramArray.word);
});