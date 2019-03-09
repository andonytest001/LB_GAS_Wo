var CHANNEL_ACCESS_TOKEN = 'Gdgzh6VxxTPKk6Kj3nJUzeKnGeVqGrfYySGj8sSEqajevLAn/txd/ETKU2eCbkArhi234jUcHfPI5cBXts73zbAZeqdN0d3XzeY+NOJNfoFcHl4fF+e704d3rY5wwWQYFPh2UXaQzDl1fjk5XQs7igdB04t89/1O/w1cDnyilFU=';
 
function doPost(e) {
  var msg= JSON.parse(e.postData.contents);
  console.log(msg);//TEST
  
   // 取出 replayToken 和發送的訊息文字
  var replyToken = msg.events[0].replyToken;
  var userMessage = msg.events[0].message.text;
  var userID = msg.events[0].source.userId;
  var userName = getName(userID);
  var userStatus = getStatus(userID);
  var userType = JSON.parse(e.postData.contents).events[0].type;//大多為Message
  
  if (typeof replyToken === 'undefined') {
    return;
  }

  var url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, {
        'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': replyToken,
        'messages': [
          {
    "type": "template",
    "altText": "this is a buttons template",
    "template": {
      "type": "buttons",
      "actions": [
        {
          "type": "message",
          "label": "pm 7:00",
          "text": "pm 7:00"
        },
        {
          "type": "message",
          "label": "pm 8:00",
          "text": "pm 8:00"
        }
      ],
      "title": "選擇時間",
      "text": userName+",你都幾點吃飯"
    }
  }
                    
        ],
      }),
     });
  
}

function getName(userId) {
	if (typeof userId === 'undefined')  return;
	var url = 'https://api.line.me/v2/bot/profile/' + userId;
	var opt = {
		'headers': {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
		},
		'method': 'get',
	};
	var res = JSON.parse(UrlFetchApp.fetch(url, opt)).displayName;
	return res;
}
function getStatus(userId) {
	if (typeof userId === 'undefined')  return;
	var url = 'https://api.line.me/v2/bot/profile/' + userId;
	var opt = {
		'headers': {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
		},
		'method': 'get',
	};
	var res = JSON.parse(UrlFetchApp.fetch(url, opt)).statusMessage;
	return res;
}