## 概要
Kotlin x SpringBootで開発するじゃんけんゲーム

SpringInitializrでプロジェクトを作成:  [作成したプロジェクトの設定リンク](https://start.spring.io/#!type=gradle-project-kotlin&language=kotlin&platformVersion=3.4.1&packaging=jar&jvmVersion=17&groupId=com.example.janken&artifactId=janken-game&name=janken-game&description=janken-game%20project%20for%20Spring%20Boot&packageName=com.example.janken&dependencies=web,devtools,data-jpa,h2,lombok,validation)

### やってみたいこと
- [ ] SpringSecurityを使った認証機能の実装: 2025/02/16一時断念
- [x] ログを吐かせる: 2025/02/16
- [ ] ドメインを購入してweb上にデプロイする
- [ ] owaspzapでセキュリティチェックを行う
- [ ] テストコードを書く
  - Junit or Kotest導入
- [ ]CI/CDを導入する


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

#### 2025/02/16
- loggingの設定をapplication.ymlに追加
- 

##### SpringSecurityは断念
どうしてもSpringSecurityの401が解消できなかったため、一旦断念し、build.gradleから削除。
```
// build.gradle.ktsから以下の記述を削除
	implementation("org.springframework.boot:spring-boot-starter-security")
```
いつかまたトライする。

試みたがうまくいかなかったこと  
- PermitAllを設定する
  - フロント画面側は認証を通さずにアクセスできるようになったが、API側がだめだった。
- 環境変数から@ConditinalOnPropertyで有効無効を制御できるようにする
  - このアノテーションをつかっても制御がかかる
```
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
@ConditionalOnProperty(name = ["spring.security.enabled"], havingValue = "true", matchIfMissing = false)
class SecurityConfig {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http {
            authorizeHttpRequests {
                authorize(anyRequest, permitAll)
            }
            formLogin { }
            httpBasic { }
        }

        return http.build()
    }

    @Bean
    fun userDetailsService(): UserDetailsService {
        val user = User.withDefaultPasswordEncoder()
            .username("user")
            .password("password")
            .roles("USER")
            .build()

        return InMemoryUserDetailsManager(user)
    }

}
```

以下のように明記すると無効化できた。
``` JankenGameApplication.kt
// JankenGameApplication.kt に追記して無効化
@SpringBootApplication(exclude = [SecurityAutoConfiguration::class])
```

参考にしたもの
https://spring.pleiades.io/spring-security/reference/servlet/getting-started.html
