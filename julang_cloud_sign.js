const scriptName = "JulangCloud";
const $ = new Env("JulangCloud签到");
const notify = $.isNode() ? require('./sendNotify') : '';
let JULANG_COOKIE = process.env.JULANG_COOKIE;
if (!JULANG_COOKIE) {
    console.log('请先添加环境变量JULANG_COOKIE')
    return
}
//签到
function SignIn(cookie) {
  return new Promise((resolve) => {
    let options = {
      url: 'https://julang.site/user/checkin',
      headers: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "julang.site",
        "Referer": "https://julang.site/user",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36 Edg/103.0.1264.51",
      },
    };
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log('签到请求失败！！\n');
          console.log(err);
        } else {
          console.log(data);
          data = JSON.parse(data);
          notify.sendNotify(scriptName, `JuLang签到成功：${data.msg}`);
          console.log(`签到成功！！\n`);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

!(async () => {
   await SignIn(JULANG_COOKIE)
    
})()
.catch((e) => {
  $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
})
.finally(() => {
  $.done();
})
