//パラメータを配列に変換する関数
function getParameter(str){
  var dec = decodeURIComponent;
  var par = new Array, itm;
  if(typeof(str) === 'undefined') return par;
  if(str.indexOf('?', 0) > -1) str = str.split('?')[1];
  str = str.split('&');
  for(var i = 0; str.length > i; i++){
    itm = str[i].split("=");
    if(itm[0] !== ''){
      par[itm[0]] = typeof(itm[1]) === 'undefined' ? true : dec(itm[1]);
    }
  }
  return par;
}

$(document).ready(function() {
  
  //URLパラメータを配列に変換
  var paramArray = getParameter(location.search);
//  console.log(paramArray);
  
  //表示用の文字列に修正
  if(paramArray.word)
    paramArray.word = paramArray.word.replace(/\+|\　/g, ' ');
  else
    paramArray.word = '';
  
  if(paramArray.tag)
    paramArray.tag = paramArray.tag.replace(/\+/g, ' ');
  else
    paramArray.tag = '';
  
  //パラメータの各ワードを配列に格納
  paramArray.words = paramArray.word.split(' ');
  paramArray.tags = paramArray.tag.split(' ');
  
  //ワード内に該当文字列がない場合は目的のファイルを非表示
  var $purpose = $('#purpose').hide();
  if(paramArray.word.match(/開発|Ruby|Ｒｕｂｙ|しまだ塾|アプリ/i))
    $purpose.show();
  if(paramArray.tag.match(/Ruby|しまだ塾/))
    $purpose.show();
  
  //pagingの各リンクにパラメータ設定
  var $paginglinks = $('.paging').find('a'),
  pagingLinkStr = $paginglinks.attr('href');
  $paginglinks.attr('href', pagingLinkStr + '?word=' + paramArray.word + '&tag=' + paramArray.tag);
  
  //タグの各リンクにパラメータ設定
  $('#tagcloud a').each(function(){
    var $this = $(this),
    thisLinkStr = $this.attr('href');
    $this.attr('href', thisLinkStr + (paramArray.tag? ' ' + paramArray.tag: '') + '&word=' + paramArray.word);
  });
  
  //ページ内各要素にword挿入
  if(paramArray.word !== ''){ 
    $('.search-words').text( paramArray.word + ' ' );
    $('.freeword [name="word"]').val(paramArray.word);
  }
  
  //ページ内各要素にtag挿入
    $('.search-tags').text( paramArray.tag? '#' + paramArray.tag.replace(/\ /g, ' #'): '');
    $('.freeword [name="tag"]').val(paramArray.tag);
    $('.tags-selected .tagcloud').add('.result-box .tagcloud').each(function() {
      var tagDoms = '';
      for(var i = 0, length = paramArray.tags.length; i < length; i++ ) {
        if(paramArray.tags[i] !== ''){ 
          var re = new RegExp( paramArray.tags[i] + '\ *' ),
          tags = paramArray.tag.replace(re, '').replace(/\ $/, '');
          
          tagDoms += '<li><a href="?tag=' + tags + '&word=' + paramArray.word + '">'
                +paramArray.tags[i] + '</a></li> ';
        }
      }
      $(this).append(tagDoms);
    });
  
  //該当文字列をハイライト
  $('.result-box .list > li').find('.title, .content')
          .each(function() {
            var $this = $(this),
            thisHtml = $this.text(),
            word = paramArray.word.replace(/\ /g, '|'),
            re = new RegExp(word, 'ig');
            
            thisHtml = thisHtml.replace(re, 
              function(str){
                return '<strong class="hit-word">' + str + '</strong>';
              });
            $this.html(thisHtml);
  });
  
});