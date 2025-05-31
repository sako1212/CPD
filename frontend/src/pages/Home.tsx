import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  InputAdornment,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ThumbUp,
  Comment,
  Send,
  Home as HomeIcon,
  Group,
  School,
  Event,
  BookmarkBorder,
  ExitToApp,
  MoreVert,
  Image,
  EmojiEmotions,
  PersonAdd,
} from '@mui/icons-material';
import { Post } from '../interfaces/Post';
import { AuthContext } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/posts',
        { content: newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewPost('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/posts/like/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/posts/comment/${postId}`,
        { content: commentText[postId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText({ ...commentText, [postId]: '' });
      fetchPosts();
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ backgroundColor: '#7E2D36' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://historycouncilnsw.org.au/wp-content/uploads/2016/07/MQ_MAS_VER_RGB_POS.png"
              alt="Macquarie Logo"
              style={{ height: '40px', marginRight: '16px' }}
            />
            <Typography variant="h6" noWrap>
              CampusHQ
            </Typography>
          </Box>
          <Box>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ 
        flexGrow: 1, 
        pt: '64px',
        backgroundColor: '#f0f2f5',
        minHeight: '100vh'
      }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={3}>
            {/* Left Sidebar */}
            <Grid item xs={12} md={3}>
              <Paper sx={{ position: 'sticky', top: '80px' }}>
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <Group />
                    </ListItemIcon>
                    <ListItemText primary="Study Groups" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText primary="Courses" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <Event />
                    </ListItemIcon>
                    <ListItemText primary="Events" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <BookmarkBorder />
                    </ListItemIcon>
                    <ListItemText primary="Saved" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Main Feed */}
            <Grid item xs={12} md={6}>
              {/* Create Post */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#7E2D36' }}>
                      {localStorage.getItem('userName')?.[0] || 'U'}
                    </Avatar>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      variant="outlined"
                      placeholder="What's on your mind?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',
                          backgroundColor: '#f0f2f5',
                        }
                      }}
                    />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button startIcon={<Image />} color="primary">
                      Photo
                    </Button>
                    <Button startIcon={<EmojiEmotions />} color="primary">
                      Feeling
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handlePostSubmit}
                      disabled={!newPost.trim()}
                      sx={{ 
                        borderRadius: '20px',
                        backgroundColor: '#7E2D36',
                        '&:hover': {
                          backgroundColor: '#6a2630'
                        }
                      }}
                    >
                      Post
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              {/* Posts */}
              {posts.map((post: Post) => (
                <Card key={post._id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ mr: 2, bgcolor: '#7E2D36' }}>
                        {post.user.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {post.user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(post.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {post.content}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {post.likes.length} likes • {post.comments.length} comments
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Button
                        startIcon={<ThumbUp color={post.likes.includes(localStorage.getItem('userId')!) ? 'primary' : 'inherit'} />}
                        onClick={() => handleLike(post._id)}
                        fullWidth
                      >
                        Like
                      </Button>
                      <Button
                        startIcon={<Comment />}
                        fullWidth
                      >
                        Comment
                      </Button>
                    </Box>

                    {/* Comments */}
                    <Box sx={{ mt: 2 }}>
                      {post.comments.map((comment: any) => (
                        <Box key={comment._id} sx={{ display: 'flex', mb: 2 }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: '#7E2D36' }}>
                            {comment.user.name[0]}
                          </Avatar>
                          <Paper
                            sx={{
                              p: 1,
                              backgroundColor: '#f0f2f5',
                              borderRadius: '12px',
                              flex: 1
                            }}
                          >
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              {comment.user.name}
                            </Typography>
                            <Typography variant="body2">
                              {comment.content}
                            </Typography>
                          </Paper>
                        </Box>
                      ))}

                      {/* Add Comment */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: '#7E2D36' }}>
                          {localStorage.getItem('userName')?.[0] || 'U'}
                        </Avatar>
                        <TextField
                          size="small"
                          fullWidth
                          placeholder="Write a comment..."
                          value={commentText[post._id] || ''}
                          onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => handleComment(post._id)}
                                  disabled={!commentText[post._id]?.trim()}
                                  size="small"
                                >
                                  <Send />
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: '20px',
                              backgroundColor: '#f0f2f5',
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            {/* Right Sidebar */}
            <Grid item xs={12} md={3}>
              <Paper sx={{ position: 'sticky', top: '80px', p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Suggested Study Groups
                </Typography>
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <PersonAdd />
                    </ListItemIcon>
                    <ListItemText 
                      primary="COMP2000 Study Group"
                      secondary="125 members"
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <PersonAdd />
                    </ListItemIcon>
                    <ListItemText 
                      primary="MQ Computer Science"
                      secondary="1.2k members"
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <PersonAdd />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Campus Events"
                      secondary="3.4k members"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 