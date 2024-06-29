import './App.css'
import { Header } from './components/header'

function App() {

  return (
    <div className='App'>
      <Header />
      <main>
        <div className="main__inner">
          <form className="userform">
            <div className="form-control">
              <label htmlFor="username">ユーザ名</label>
              <input type="text" id="username" placeholder='ユーザ名入力' />
            </div>

            <div className="form-control">
              <label htmlFor="useremail">メールアドレス</label>
              <input type="email" id="useremail" placeholder='メールアドレスを入力' />
            </div>

            <div className="form-control">
              <label htmlFor="content">内容</label>
              <textarea id="content" placeholder='入力' />
            </div>

            <div className="form-control">
              <button type="submit">送信</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default App
