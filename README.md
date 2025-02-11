## 概要
Kotlin x SpringBootで開発するじゃんけんゲーム

SpringInitializrでプロジェクトを作成:  [作成したプロジェクトの設定リンク](https://start.spring.io/#!type=gradle-project-kotlin&language=kotlin&platformVersion=3.4.1&packaging=jar&jvmVersion=17&groupId=com.example.janken&artifactId=janken-game&name=janken-game&description=janken-game%20project%20for%20Spring%20Boot&packageName=com.example.janken&dependencies=web,devtools,data-jpa,h2,lombok,validation)

### やってみたいこと
- SpringSecurityを使った認証機能の実装
- ログを吐かせる
- ドメインを購入してweb上にデプロイする
- owaspzapでセキュリティチェックを行う
- テストコードを書く
- CI/CDを導入する


### 作業日報
#### 2025/02/11
アプリケーションを起動してじゃんけんしたらエラーになった
ターミナルから叩いたら401。springSecurityっぽい。
```
$ curl -X POST localhost:8080/api/janken/play -H 'Content-Type: application/json' -d '{"userHand": "グー"}' -i
HTTP/1.1 401 
Set-Cookie: JSESSIONID=6147C030FBEB429538B1E943B0E24A16; Path=/; HttpOnly
X-Content-Type-Options: nosniff
X-XSS-Protection: 0
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
X-Frame-Options: DENY
WWW-Authenticate: Basic realm="Realm"
Content-Length: 0
Date: Tue, 11 Feb 2025 08:16:46 GMT
```

ログを確認するためにログを吐く設定も追加してみたが、SpringSecurityの方が前段にあるため、ログを確認できなかった。
そこでcopilot chatでセキュリティの設定をオフにする方法を教えてもらったがまだ実践前。

コミットは
application.propertyをymlファイルに変更しただけ。