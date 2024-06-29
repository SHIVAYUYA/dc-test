import './App.css';
import { useEffect, useState } from 'react';
import { Header } from './components/header';
import { TimelineItem } from './components/timeline-item';

function App() {
  
  const [username,setusername] = useState('');
  const [useremail,setuseremail] = useState('');
  const [usercontent,setusercontent] = useState('');
  const [posts,setposts] = useState([]);
  console.log(posts);

  async function handlesubmit(e){
    e.preventDefault()
    if (username === ''|| useremail === '' || usercontent === ''){
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            useremail,
            usercontent,
          }),
        }
      );

      if (response.ok) {
        setposts([...posts, { username, useremail, usercontent }]);
        setusername("");
        setuseremail("");
        setusercontent("");
        console.log("成功");
      } else {
        console.log("失敗");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/post`
      );
      if (response.ok) {
        const { posts } = await response.json();
        setposts(posts);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='App'>
      <Header />
      <main>
        <div className="main__inner">
          <form className="userform" onSubmit={handlesubmit}>
            <div className="form-control">
              <label htmlFor="username">ユーザ名</label>
              <input type="text" id="username" placeholder='ユーザ名入力' value={username} onChange={function(e){setusername(e.currentTarget.value)}} />
            </div>

            <div className="form-control">
              <label htmlFor="useremail">メールアドレス</label>
              <input type="email" id="useremail" placeholder='メールアドレスを入力' value={useremail} onChange={function(e){setuseremail(e.currentTarget.value)}} />
            </div>

            <div className="form-control">
              <label htmlFor="content">内容</label>
              <textarea id="content" placeholder='入力' value={usercontent} onChange={function(e){setusercontent(e.currentTarget.value)}}/>
            </div>

            <div className="form-control">
              <button type="submit">送信</button>
            </div>
          </form>
          <div className="timeline">
            <div className="timeline__inner">
              <h3>投稿一覧</h3>
              <div className="timeline__list">
                {posts.length > 0 ? posts.map(function(post,i){
                  return <TimelineItem username={post.username} usercontent={post.usercontent} key={i}/>
                  }) :<p>投稿がありません</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
