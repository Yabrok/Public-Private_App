import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { Modal } from "../../components/Modal/Modal"
export const Posts = () => {
  const [postModal, setPostModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [posts, setPosts] = useState([])
  const [editId, setEditId] = useState('')

  const titleRef = useRef()
  const bodyRef = useRef()
  
  const editedTitleRef = useRef()
  const editedBodyRef = useRef()


  const getPosts = async () => {
    const data = await axios.get('http://localhost:6060/posts')

    if (data) {
      setPosts(data.data)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])
  // ==========================================
  const handlePost = (evt) => {
    evt.preventDefault()

    axios
      .post('http://localhost:6060/posts', {
        postTitle: titleRef.current.value,
        postBody: bodyRef.current.value,
      })
      .then(data => {
        if (data.status == 201) {
          setPostModal(false)
          getPosts()
        }
      })
      .catch(err => console.log(err))

  }
  // =============================================
  const handleDelete = (postId) => {

    axios
      .delete(`http://localhost:6060/posts/${postId}`)
      .then(data => {
        if (data.status == 200) {
          getPosts()
        }
      })
  }
  // ================================================
  const handleEdit = (evt) => {
    evt.preventDefault()
    // console.log(editedTitleRef)
    // console.log(editedBodyRef)
    // console.log(editId)
    axios
      .put(`http://localhost:6060/posts/${editId}`,{
        postTitle: editedTitleRef.current.value,
        postBody: editedBodyRef.current.value
      })
      .then(data => {
        if(data.status == 200){
          setEditModal(false)
          getPosts()
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="d-flex justify-content-center py-4">
        <button onClick={() => setPostModal(true)} className="btn btn-success">Add post +</button>
      </div>
      <h2 className="h1 text-center mb-4">Posts</h2>

      {posts.length ? (
        <ul className="d-flex list-unstyled gap-3 flex-wrap justify-content-center">
          {
            posts.map((item) =>
              <li className="card" key={item.id} style={{ 'width': '300px' }}>
                <div className="card-header d-flex align-items-center justify-content-between">
                  Post
                  <div>
                    <button
                      onClick={() => {
                        setEditModal(true);
                        setEditId(item.id)
                      }}
                      className="btn btn-warning p-1" type="button">✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger ms-1" type="button">&times;
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.postTitle}</h5>
                  <p className="card-text">
                    {item.postBody}
                  </p>
                </div>
              </li>
            )
          }
        </ul>
      ) : ('')}
      {postModal ?
        <Modal modal={postModal} setModal={setPostModal} title='Add post'>
          <form onSubmit={(evt) => handlePost(evt)}>
            <input ref={titleRef} className="form-control mb-2" type="text" placeholder="Title" />
            <input ref={bodyRef} className="form-control mb-4" type="text" placeholder="Body" />
            <button className="btn btn-success" type="submit">Add</button>
          </form>
        </Modal>
        : ''}
      {editModal ?
        <Modal modal={editModal} setModal={setEditModal} title='Edit post'>
          <form onSubmit={(evt) => handleEdit(evt)}>
            <input ref={editedTitleRef} className="form-control mb-2" type="text" placeholder="Title" />
            <input ref={editedBodyRef} className="form-control mb-4" type="text" placeholder="Body" />
            <button className="btn btn-success" type="submit">Add</button>
          </form>
        </Modal>
        : ''}
    </>
  )
}