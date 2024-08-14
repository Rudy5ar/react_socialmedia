import axios from "axios";

export default const handleLikeDislike = async () => {
    const [likesCount, setLikesCount] = useState(totalLikes);
    const [hasLiked, setHasLiked] = useState(false);
    try {
      await axios.put('http://localhost:8080/api/posts/likeDislikePost', null, {
        params: { idPost: id },
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
      });

      const statusResponse = await axios.get('http://localhost:8080/api/posts/isLiked', {
        params: { idPost: id },
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
      });

      if (statusResponse.status === 200) {
        const isLiked = statusResponse.data;
        setHasLiked(isLiked);
        console.log(hasLiked);

        if (isLiked) {
          setLikesCount(prevCount => prevCount + 1);
        } else {
          setLikesCount(prevCount => prevCount - 1);
        }
      } else {
        console.error('Unexpected response status:', statusResponse.status);
      }
    } catch (error) {
      console.error('Error handling like/dislike', error);
    }
  };