
import "./styles.css";


function Content({ posts, count, currentUser, setCurrentUser}) {
 
  const handlePost = (post) => {
    setCurrentUser(post);
  };

  if (count === " ") return <h1>введите логин от GitHab..</h1>;
  
  return (
    <div className="conteiner">
      <ul>
        {posts.map((post) => (
          <li key={post.id} onClick={() => handlePost(post)}>
            {post.login}
          </li>
        ))}
      </ul>

      {currentUser.login && (
        <div className="box_user">
          <div className="user_login">{currentUser.login}</div>
          <img
            className="img_user"
            src={currentUser.avatar_url}
            alt="new"
          ></img>
          <a href={currentUser.html_url} className="user_gitHab">
           Сылкка на GitHab
          </a>
        </div>
      )}
    </div>
  );
}

export default Content;
